const { Product, User, Role } = require("../models/data-models");

const getUsers = async () => {
  return await User.findAll();
}

const getUserById = async (id) => {
  return await User.findOne({
    where: {
      Id: id
    }
  })
}

const findAccount = async (credentials) => {
  const findResult = await User.findOne({
    where: {
      Email: credentials.Email,
      Password: credentials.Password,
    },
    include: {
      model: Role,
      attributes: ['Name']
    }
  })
  return findResult;
}

const insertUser = async (inputUser) => {
  return await User.create(inputUser);
}

const updateUser = async (inputUser) => {
  return await User.update(inputUser, {
    where: { Id: inputUser.Id },
  })
}

const deleteUser = async (id) => {
  User.destroy({
    where: {
      Id: id,
    },
  })
}

const getProducts = async () => {
  return await Product.findAll();
}

const getProductById = async (id) => {
  return await Product.findOne({
    where: {
      Id: id,
    },
  })
}

const insertProduct = async (inputProduct) => {
  return await Product.create(inputProduct);
}

const updateProduct = async (inputProduct) => {
  return await Product.update(inputProduct, {
    where: { Id: inputProduct.Id },
  })
}

const deleteProduct = async (id) => {
  Product.destroy({
    where: {
      Id: id,
    },
  })
}

const registerUser = async (credentials, roles) => {
  if (!credentials || !roles){
    return false;
  }

  User.create({
    Email: credentials.Email,
    Password: credentials.Password,
    Roles: roles
  },
  {
    include: [Role]
  })

  return true
}

module.exports = {
  findAccount,
  getUserById,
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
  registerUser,
  getProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
};
