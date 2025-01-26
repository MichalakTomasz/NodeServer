const { verifyToken } = require('../services/jwtTokenService')

const getHeaderToken = (req) => 
     (req.headers['Authorization'] || req.headers['authorization'])?.replace('Bearer ', '')
const checkAuth = (token, roles) => {
    if (!token || !roles) {
        return {
            success: false,
            status: 401,
            message: 'Access denied. No token provided.'
        }
    }

    const verifyTokenResult = verifyToken(token, roles)
    if (!verifyTokenResult.isValid) {
        return {
            success: false,
            status: 400,
            message: 'Invalid token.'
        }
    }

    return { success: true }
}

module.exports = { 
    checkAuth, 
    getHeaderToken
}