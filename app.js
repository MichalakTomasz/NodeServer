const express = require('express')
const { updateDatabase } = require('./models/data-models')
const middlewareConfig = require('./middleware/middleware-config')
const app = express()
const port = process.env.port || 3000
const httpsPort = 443
const mainController = require('./controllers/main-controller')
const authController = require('./controllers/auth-controller')
const productController = require('./controllers/product-controller')
const userController = require('./controllers/user-controller')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const getHttpsServer = require('./services/httpsService')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphQl/schema')
const root = require('./graphQl/root')

updateDatabase()
middlewareConfig(app)
app.use('/', mainController)
app.use('/', authController)
app.use('/', productController)
app.use('/', userController)
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  rootValue: root,
  qraphql: true, 
  context: req 
})))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

getHttpsServer(app).listen(httpsPort, () => { 
  console.log('Serwer HTTPS uruchomiony na porcie 443'); });