const express = require('express')
const { updateDatabase } = require('./models/data-models')
const middlewareConfig = require('./middleware/middleware-config')
const app = express()
const port = process.port || 3000
const mainController = require('./controllers/main-controller');
const authController = require('./controllers/auth-controller')

updateDatabase()
middlewareConfig(app)
app.use('/', mainController)
app.use('/', authController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})