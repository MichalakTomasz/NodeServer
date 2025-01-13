const { generateToken } = require("../services/jwtTokenService")
const { findAccount, registerUser } = require("../repository/appRepository")
const { checkAuth } = require('../services/authHeaderService')
const express = require('express');
const router = express.Router();
const guestRole = ['guest']

router.get("/auth", (req, res) => {
  const payload = {
    userId: "",
    userName: "",
    roles: ["guest"],
  };
  const token = generateToken(payload);
  res.send(token);
});

router.post("/login", async (req, res) => {
  const authResult = checkAuth(req, guestRole)
  if (!authResult.success) {
    res.status(authResult.status).json({
      message: authResult.message
    })
    return
  }

  const credentials = req.body
  if (!credentials) {
    res.status(400)
    return
  }
  const findResult = await findAccount(credentials)
  if (!findResult?.Email) {
    res.status(401).json('Wrong credentials')
    return
  }

  const payload = {
    userId: findResult.Id,
    userName: findResult.Email,
    roles: findResult.Roles.map(r => r.role)
  }
  const token = generateToken(payload)

  res.status(200).json({
    token: token,
    isAuthorized: true
  })
})

router.post("/register", async (req, res) => {
  const authResult = checkAuth(req, guestRole)
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
  const roles = [
    { Name: 'guest'},
    { Name: 'Admin'}
  ]
  inputResult = await registerUser(inputUser, roles)
  if (inputResult) {
    res.status(200).json({ message: 'User registred successfull.' })
  } else {
    res.status(400).json({ message: 'Registration error.' })
  }
})

module.exports = router
