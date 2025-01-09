const jwt = require('jsonwebtoken')
const config = require('../services/configurationService')

const secretKey = config.secretKey
const generateToken = (data) => {
    const payload= {
        userId: data.userId,
        username: data.email,
        roles: data.roles
    }
    const options = {
        expiresIn: '0.5h'
    }

    return jwt.sign(payload, secretKey, options)
}

const verifyToken = (token) => {
    try{  
        const user = jwt.verify(token.replace('Bearer ', ''), secretKey)
        const hasRole =  user.roles.some(r => r = 'guest')
        return {
            isValid : hasRole 
        }
    } catch (e) {
        return {
            isValid: false, 
            message : e.message 
        };
    }
    
}

module.exports = { generateToken, verifyToken }