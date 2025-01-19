const { DataTypes, Model } = require("sequelize");
const { openConnection } = require("../data/db-context");
const moment =require('moment')

class User extends Model {}
class Product extends Model {}
class Role extends Model {}
class UserRole extends Model {}

const initModels = (sequelize) => {
  User.init(
    {
      Id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      Email: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      RegisterDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          const rawValue = this.getDataValue('RegisterDate')
          return moment(rawValue).format('DD.MM.YYYY')
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User'
    }
  )

  Role.init(
    {
      Id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      Name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Role'
    }
  )

  Product.init(
    {
      Id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      UrlPicture: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      Price: {
        type: DataTypes.NUMBER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Product'
    }
  )

  Role.belongsToMany(User, { through: 'UserRole'})
  User.belongsToMany(Role, { through: 'UserRole'})
}

const seedDatabase = async () => {
  const roles = await Role.findAll()
  if (roles.length === 0) {
    Role.create({
      Name: 'guest'
    })
    Role.create({
      Name: 'user'
    })
    Role.create({
      Name: 'admin'
    })
  }
}

const updateDatabase = async () => {
  const sequelize = await openConnection()
  initModels(sequelize);
  await sequelize.sync();
  await seedDatabase();
}

module.exports = {
  User,
  Product,
  Role,
  updateDatabase,
}
