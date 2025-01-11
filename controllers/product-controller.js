const { checkAuth } = require("../services/authHeaderService");
const {
  getProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../repository/appRepository");
const express = require("express");
const router = express.Router();
const guestRole = ["guest"];

router.get("/product", async (req, res) => {
  const authResult = checkAuth(req, guestRole);
  if (authResult.success) {
    const result = await getProducts();
    res.send(result);
  } else {
    res.status(authResult.status).json({ message: authResult.message });
  }
});

router.get("/product/:id", async (req, res) => {
  const authResult = checkAuth(req, guestRole);
  if (authResult.success) {
    const id = req.params.id
    const result = await getProductById(id);
    res.send(result);
  } else {
    res.status(authResult.status).json({ message: authResult.message });
  }
});

router.post("/product", async (req, res) => {
  const authResult = checkAuth(req, guestRole);
  if (authResult.success) {
    const product = req.body;
    const result = await insertProduct(product);
    res.send(result);
  } else {
    res.status(authResult.status).json({ message: authResult.message });
  }
});

router.put("/product", async (req, res) => {
  const authResult = checkAuth(req, guestRole);
  if (authResult.success) {
    const product = req.body;
    const result = await updateProduct(product);
    res.send(result);
  } else {
    res.status(authResult.status).json({ message: authResult.message });
  }
});

router.delete("/product/:id", async (req, res) => {
  const authResult = checkAuth(req, guestRole);
  if (authResult.success) {
    const id = req.params.id;
    const result = await deleteProduct(id);
    res.send(result);
  } else {
    res.status(authResult.status).json({ message: authResult.message });
  }
});

module.exports = router;
