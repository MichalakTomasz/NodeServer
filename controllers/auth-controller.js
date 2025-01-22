const { generateToken } = require("../services/jwtTokenService")
const { findAccount, registerUser } = require("../repository/appRepository")
const { checkAuth, getHeaderToken } = require('../services/authHeaderService')
const express = require('express')
const router = express.Router()
const guestRole = ['guest']

router.get("/auth", (req, res) => {
  /*
  #swagger.description = 'Authorization is necessary to use app
  #swagger.responces[200] = {
      description: 'Returns authorization guest token'
    }      
  }
  */
  const payload = {
    userId: "",
    userName: "",
    roles: ["guest"],
  }
  const token = generateToken(payload)
  res.send(token)
})

router.post("/login", async (req, res) => {
  /*
  #swagger.description = 'LogIn to application
  #swagger.parameters['body] = {
    in: 'body',
    description: 'credentials: email and password',
    schema: {
      Email: 'exampleUser@mail.net',
      Password: 'qwerty1234'
    }    
  }
*/
  let token = getHeaderToken(req)
  const authResult = checkAuth(token, guestRole)
  if (!authResult.success) {
    res.status(authResult.status).json({
      message: authResult.message
    })
    return
  }

  const credentials = req.body
  if (!credentials) {
    /*
    #swagger.responces[400] = {
      description: 'Bad request.'
    } 
    */
    res.status(400)
    return
  }
  const findResult = await findAccount(credentials)
  if (!findResult?.Email) {
    /*
    #swagger.responses[401] = {
      description: 'Wrong credentials.'
    }
    */
    res.status(401).json('Wrong credentials')
    return
  }

  const payload = {
    userId: findResult.Id,
    userName: findResult.Email,
    roles: findResult.Roles.map(r => r.Name)
  }
  token = generateToken(payload)

  /*
   #swagger.responces[200] = {
    description: 'Returns json: token: String, isAuthorized: Boolean'
  }
  */
  res.status(200).json({
    token: token,
    isAuthorized: true
  })
})

router.post("/register", async (req, res) => {
  const token = getHeaderToken(req)
  const authResult = checkAuth(token, guestRole)
  if (!authResult.success) {
    res.status(authResult.status).json({
      message: authResult.message
    })
    return
  }

  const inputUser = req.body
  if (!inputUser){
    res.status(400).json({message: 'Bad request.'})
  }

  const findResult = await findAccount(inputUser)
  if (findResult?.Email) {
    res.status(401).json({ message: 'This email exists.' })
    return
  }
        
  const roles = [
    { Name: 'guest'},
    { Name: 'user'},
    { Name: 'admin'}
  ]
  inputResult = await registerUser(inputUser, roles)
  if (inputResult) {
    res.status(200).json({ message: 'User registred successfull.' })
  } else {
    res.status(400).json({ message: 'Registration error.' })
  }
})

module.exports = router
