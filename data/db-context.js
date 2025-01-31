const config  = require('../services/configurationService')
const { Sequelize } = require('sequelize')

const openConnection = () => {
    return new Sequelize({
        dialect: 'sqlite',
        storage: config.connectionString
    })
}

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
        return true
     } catch (error) {
        console.error('Unable to connect to the database: ', error)
        return false
     }
}

module.exports = {
    openConnection,
    testConnection
}