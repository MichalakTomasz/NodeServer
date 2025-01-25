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
const { createHandler } = require('graphql-http/lib/use/express')
const schema = require('./graphQl/schema')
const root = require('./graphQl/root')
const { ruruHTML } = require('ruru/server')

updateDatabase()
middlewareConfig(app)
app.use('/', mainController)
app.use('/', authController)
app.use('/', productController)
app.use('/', userController)
app.use('/graphql', createHandler({
  schema: schema,
  rootValue: root,
  context: req => req
}))
app.get('/graphqleditor', (req, res) => {
  res.type('html')
  res.end(ruruHTML({ emdpoint: '/graphql'}))
})
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

getHttpsServer(app).listen(httpsPort, () => { 
  console.log('Serwer HTTPS uruchomiony na porcie 443'); });