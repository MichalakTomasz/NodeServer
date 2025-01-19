const { buildSchema } = require('graphql')

const schema = buildSchema(`
    input inputProduct {
        Id: ID
        Name: String
        Code: String
        Description: String
        UrlPicture: String
        Price: Float
    }

    type Product {
        Id: ID!
        Name: String
        Code: String
        Description: String
        UrlPicture: String
        Price: Float
    }

    input inputUser {
        Id: ID
        Email: String
        Password: String
        RegisterData: String
        Roles: [inputRole]
    }

    type User {
        Id: ID!
        Email: String
        Password: String
        RegisterDate: String
        Roles: [Role]
    }

    input inputRole {
        Id: ID
        Name: String
    }

    type Role {
        Id: ID!
        Name: String
    }

    input inputCredentials {
        Email: String
        Password: String
    }
    
    type Credentials {
        Email: String
        Passwodrd: String
    }

    type TokenResult {
        token: String
        isAuthorized: Boolean
    }

    type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
        getUserById(id: ID!): User
    }

    type Mutation {
        findAccount(credentials: inputCredentials!): User
        insertUser(user: inputUser!): User
        updateUser(user: inputUser!): User
        deleteUser(id: ID!): Boolean
        insertProduct(product: inputProduct!): Product
        updateProduct(product: inputProduct!): Boolean
        deleteProduct(id: ID!): Boolean
        auth: String
        login(credentials: inputCredentials): TokenResult
        register(user: inputCredentials!): String
    }
    `)

module.exports = schema