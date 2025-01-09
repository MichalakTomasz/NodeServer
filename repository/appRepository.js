const { Product } = require("../models/data-models");

const getProducts = async () => {
    return await Product.findAll();
};

const insertProduct = async (inputProduct) => {
    return await Product.create(inputProduct);
};

const updateProduct = async (inputProduct) => {
  return await Product.update(
    inputProduct, {
      where: {Id: inputProduct.Id}
    }    
  )
}

const deleteProduct = async (id) => {
  Product.destroy({
    where: {
      Id: id 
    }
  }) 
}

module.exports = {
  getProducts,
  insertProduct,
  updateProduct,
  deleteProduct
};
