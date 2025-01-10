const { Product, User } = require("../models/data-models");

const getUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findAll({
    where: {
      id: id
    }
  })
}

const findAccount = async (credentials) => {
  const findResult = await User.findAll({
    where: {
      Email: credentials.Email,
      Password: credentials.Password
    }
  })
  return findResult.find(u => 
    u.Email === credentials.Email && 
    u.Password === credentials.Password)
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
  insertProduct,
  updateProduct,
  deleteProduct
};
