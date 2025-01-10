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

const verifyToken = (token, roles) => {
    try{  
        const user = jwt.verify(token.replace('Bearer ', ''), secretKey)
        const hasRole =  user.roles.some(r => roles.some(ro => ro == r ))
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

const getPayload = (token) => {
    if (!token){
        return undefined
    }

    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) { 
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')); 
        return JSON.parse(jsonPayload);
}

module.exports = { generateToken, verifyToken, getPayload }