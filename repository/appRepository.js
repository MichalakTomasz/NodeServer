const { Product } = require("../models/data-models");

const getProducts = async () => {
    return await Product.findAll();
};

const insertProduct = async (inputProduct) => {
    return await Product.create(inputProduct);
};

module.exports = {
  getProducts,
  insertProduct,
};
