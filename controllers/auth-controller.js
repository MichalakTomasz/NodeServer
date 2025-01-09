const { generateToken } = require("../services/jwtTokenService");
const express = require('express'); 
const router = express.Router();

router.get("/auth", (req, res) => {
  const payload = {
    userId: "1233",
    userName: "test",
    roles: ["guest"],
  };
  const token = generateToken(payload);
  res.send(token);
});

module.exports = router
