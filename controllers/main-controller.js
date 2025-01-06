const { getProducts, insertProduct } = require("../repository/appRepository");
const { Product } = require("../models/data-models");

const addController = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/about", (req, res) => {
    res.send({
      title: "test nodejs",
      description: "It's a test nodeJs server",
    });
  });

  app.get("/connection", (req, res) => {
    res.send(
      (async () => {
        return await testConnection();
      })
        ? "connection ok"
        : "connection error"
    );
  });

  app.get("/product", async (req, res) => {
    const result = await getProducts()
    res.send(result)
  });

  app.post("/product", async (req, res) => {
        const product = req.body
        const result = await insertProduct(product);
        res.send(result)  
  });
};

module.exports = addController;
