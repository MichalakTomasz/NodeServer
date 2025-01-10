const { getUsers, insertUser, updateUser, deleteUser } = require("../repository/appRepository");
const { checkAuth } = require('../services/authHeaderService')
const express = require('express');
const router = express.Router();


const userRole = ['user']

router.get("/", (req, res) => {
  res.send("Cloud Academy - backend developer");
});

router.get("/about", (req, res) => {
  res.send({
    title: "Test nodeJs back-end server",
    description: "Example json object which tests API sending.",
  });
});

router.get("/dbconnectiontest", (req, res) => {
  const result = async () => {
    return await testConnection();
  }
  res.send(
      result ? "connection ok"
      : "connection error"
  );
})

router.get("/user", async (req, res) => {
  const authResult = checkAuth(req, userRole)
  if (authResult.success) {
    const result = await getUsers()
    res.send(result)
  } else {
    res.status(authResult.status).json({message: authResult.message})
  }
})

router.post("/user", async (req, res) => {
  const authResult = checkAuth(req, userRole)
  if (authResult.success) {
  const user = req.body
  const result = await insertUser(user)
  res.send(result)
  } else {
    res.status(authResult.status).json({message: authResult.message})
  }
})

router.put("/user", async (req, res) => {
  const authResult = checkAuth(req, userRole)
  if (authResult.success) {
  const user = req.body
  const result = await updateUser(user)
  res.send(result)
  } else {
    res.status(authResult.status).json({message: authResult.message})
  }
})

router.delete('/user/:id', async (req, res) => {
  const authResult = checkAuth(req, userRole)
  if (authResult.success) {
  const id = req.params.id
  const result = await deleteUser(id)
  res.send(result)
  } else {
    res.status(authResult.status).json({message: authResult.message})
  }
})

module.exports = router
