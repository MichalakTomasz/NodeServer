const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Cloud Academy - backend developer")
});

router.get("/about", (req, res) => {
  res.send({
    title: "Test nodeJs back-end server",
    description: "Example json object which tests example Rest API.",
  });
});

router.get("/dbconnectiontest", (req, res) => {
  const result = async () => {
    return await testConnection()
  }
  res.send(
      result ? "connection ok"
      : "connection error"
  );
})

module.exports = router
