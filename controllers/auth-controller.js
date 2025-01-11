const { generateToken } = require("../services/jwtTokenService")
const { findAccount, insertUser } = require("../repository/appRepository")
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
  if (!findResult) {
    res.status(401).json('Wrong credentials')
    return
  }

  const payload = {
    userId: findResult.Id,
    userName: findResult.Email,
    roles: ['guest', 'user']
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
  inputResult = await insertUser(inputUser)
  if (inputResult) {
    res.status(200).json({ message: 'User registred successfull.' })
  } else {
    res.status(400).json({ message: 'Registration error.' })
  }
})

module.exports = router
