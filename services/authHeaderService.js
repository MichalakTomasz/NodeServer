const { verifyToken } = require('../services/jwtTokenService')

const checkAuthHeader = (req, res) => { 
    const authHeader = req.headers['authorization']
    if (!authHeader) { 
        res.status(401).send('Access denied. No token provided.')
        return false
    } 
    const verifyTokenResult = verifyToken(authHeader)
    if (!verifyTokenResult.isValid){
        res.status(400).json({ message: 'Invalid token.'})
        return false
    }

    return true;
};

module.exports =  { checkAuthHeader }