const { generateToken } = require("../services/jwtTokenService")
const { 
    getProducts, 
    getProductById, 
    getUserById, 
    findAccount, 
    insertUser, 
    updateUser 
} = require('../repository/appRepository')
const { checkAuth, getGraphQlHeaderToken } = require('../services/authHeaderService')
const roles = ['guest']

const root = {
//Query
    getProducts: async (args, context) => 
        await rotectRequest(args, context, getProducts, roles),
    getProduct: async (args, context) => 
        await protectRequest(args.id, context, getProductById, roles),
    getUserById: async (args, context) => 
        await protectRequest(args.id, context, getUserById, roles),
//Mutation
    findAccount: async (args, context) => 
        await protectRequest(args.credentials, context, findAccount, roles),
    insertUser: async (args, context) => 
        await protectRequest(args.user, context, insertUser, roles),
    updateUser: async (args, context) => 
        await protectRequest(args.user, context, updateUser, roles),
    auth: () => {
        const payload = {
            userId: "",
            userName: "",
            roles: ["guest"],
          }
          return generateToken(payload)
        },
    login: async (args, context) => {
        let token = getGraphQlHeaderToken(context)
        const authResult = checkAuth(token, roles)
        if (!authResult.success) {
            res.status(authResult.status).json({
            message: authResult.message
        })
        throw new Error('Bad request')
        }

        const credentials = args.credentials
        if (!credentials) {
          throw new Error('Bad request')
          
        }
        const findResult = await findAccount(credentials)
        if (!findResult?.Email) {
          throw new Error('Wrong credentials')
        }
    
        const payload = {
          userId: findResult.Id,
          userName: findResult.Email,
          roles: findResult.Roles.map(r => r.role)
        }
        token = generateToken(payload)
    
        return {
          token: token,
          isAuthorized: true
        }
    }
}


const protectRequest = async (args, context, func, roles) => {
    const token = getGraphQlHeaderToken(context)
        const authResult = await checkAuth(token, roles)
        if (authResult.success){
            return await func(args)
        }
        throw new Error('Not authorized') 
}

module.exports = root

