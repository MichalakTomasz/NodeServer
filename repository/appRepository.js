const { Product, User } = require("../models/data-models");

const getUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findOne({
    where: {
      id: id
    }
  })
}

const findAccount = async (credentials) => {
  const findResult = await User.findOne({
    where: {
      Email: credentials.Email,
      Password: credentials.Password
    }
  })
  return findResult && true
}

const insertUser = async (inputUser) => {
    return await User.create(inputUser);
};

const updateUser = async (inputUser) => {
  return await User.update(
    inputUser, {
      where: {Id: inputUser.Id}
    }    
  )
}

const deleteUser = async (id) => {
  User.destroy({
    where: {
      Id: id 
    }
  }) 
}

const getProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (id) => {
  return await Product.findOne({
    where: {
      Id: id
    }
  });
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
  findAccount,
  getUserById,
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  getProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
};
