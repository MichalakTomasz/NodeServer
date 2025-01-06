const { DataTypes, Model } = require("sequelize");
const { openConnection } = require('../data/db-context')

class User extends Model {}
class Product extends Model {}

const initModels = (sequelize) => {
    User.init(
        {
          id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
          },
          email: {
            type: DataTypes.STRING(70),
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.STRING(30),
            allowNull: false,
          },
          RegisterDate: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: DataTypes.NOW
          },
        },
        {
          sequelize,
          modelName: "User",
        }
      );
      
      Product.init(
          {   
              id: {
                  primaryKey: true,
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  allowNull: false, 
                  unique: true
              },
              Name: {
                  type: DataTypes.STRING(100),
                  allowNull: false 
              },
              Code: {
                  type: DataTypes.STRING(10),
                  allowNull: false
              },
              Description: {
                  type: DataTypes.STRING(200),
                  allowNull: true
              },
              UrlPiture:{
                  type: DataTypes.STRING(200),
                  allowNull: true
              },
              Price: {
                  type: DataTypes.NUMBER,
                  allowNull: false
              }
          },
          {
              sequelize,
              modelName: 'Product'
          }
      )
}

const updateDatabase = async () => {
    const sequelize = await openConnection()
    initModels(sequelize)
    await sequelize.sync()
}

module.exports = {
    User,
    Product,
    updateDatabase
}
