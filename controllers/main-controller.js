const { getProducts, insertProduct } = require("../repository/appRepository");
const { checkAuthHeader } = require('../services/authHeaderService')
const express = require('express'); 
const router = express.Router();

  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.get("/about", (req, res) => {
    res.send({
      title: "test nodejs",
      description: "It's a test nodeJs server",
    });
  });

  router.get("/connection", (req, res) => {
    res.send(
      (async () => {
        return await testConnection()
      })
        ? "connection ok"
        : "connection error"
    );
  });

  router.get("/product", async (req, res) => {
    if (checkAuthHeader(req, res)){
      const result = await getProducts()
      res.send(result)
    }    
  })

  router.post("/product", async (req, res) => {
        const product = req.body
        const result = await insertProduct(product)
        res.send(result)  
  })

  module.exports = router
