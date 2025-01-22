const moment = require('moment')
const { generateToken } = require("../services/jwtTokenService")
const { 
    getProducts, 
    getProductById, 
    getUserById, 
    findAccount, 
    insertUser, 
    updateUser, 
    registerUser,
    insertProduct,
    updateProduct
} = require('../repository/appRepository')
const { checkAuth, getGraphQlHeaderToken } = require('../services/authHeaderService')
const guestRole = ['guest']
const userRole = ['user']
const adminRole = ['admin']

const root = {
//Query
    getProducts: async (args, context) => 
        await protectRequest(args, context, getProducts, guestRole),
    getProduct: async (args, context) => 
        await protectRequest(args.id, context, getProductById, guestRole),
    getUserById: async (args, context) => 
        await protectRequest(args.id, context, getUserById, userRole),
        
//Mutation
    findAccount: async (args, context) => 
        await protectRequest(args.credentials, context, findAccount, guestRole),
    insertUser: async (args, context) => 
        await protectRequest(args.user, context, insertUser, adminRole),
    updateUser: async (args, context) => 
        await protectRequest(args.user, context, updateUser, adminRole),
    insertProduct: async (args, context) => 
        await protectRequest(args.product, context, insertProduct, userRole),
    updateProduct: async (args, context) => 
        (await protectRequest(args.product, context, updateProduct, userRole))?.length > 0,
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
        const authResult = checkAuth(token, guestRole)
        if (!authResult.success) {
            res.status(authResult.status).json({
            message: authResult.message
        })
        throw new Error('Bad request.@')
        }

        const credentials = args.credentials
        if (!credentials) {
          throw new Error('Bad request.')
          
        }
        const findResult = await findAccount(credentials)
        if (!findResult?.Email) {
          throw new Error('Wrong credentials.')
        }
    
        const payload = {
          userId: findResult.Id,
          userName: findResult.Email,
          roles: findResult.Roles.map(r => r.Name)
        }
        token = generateToken(payload)
    
        return {
          token: token,
          isAuthorized: true
        }
    },
    register: async (args, context) => {
        const token = getGraphQlHeaderToken(context)
        const authResult = checkAuth(token, guestRole)
        if (!authResult.success) {
            throw new Error(authResult.message)
        }
  
        const credentials = args.user
        if (!credentials){
            throw new Error('Bad request.')
        }

        const findResult = await findAccount(credentials)
        if (findResult?.Email) {
          throw new Error('This email exists.')
        }

        const roles = [
            { Name: 'guest'},
            { Name: 'user'},
            { Name: 'admin'}
        ]
        const registerUserResult = await registerUser(credentials, roles)
        if (registerUserResult) {
            return 'User registred successful.'
        } else {
            throw new Error('Registration error.')
        }
    }
}

const protectRequest = async (args, context, func, roles) => {
    const token = getGraphQlHeaderToken(context)
        const authResult = await checkAuth(token, roles)
        if (authResult.success){
            return await func(args)
        }
        throw new Error('Not authorized.') 
}

module.exports = root

