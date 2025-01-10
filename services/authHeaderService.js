const { verifyToken } = require('../services/jwtTokenService')

const checkAuth = (req, roles) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {
        return {
            success: false,
            status: 401,
            message: 'Access denied. No token provided.'
        }
    }

    const verifyTokenResult = verifyToken(authHeader, roles)
    if (!verifyTokenResult.isValid) {
        return {
            success: false,
            status: 400,
            message: 'Invalid token.'
        }
    }

    return { success: true };
};

module.exports = { checkAuth }