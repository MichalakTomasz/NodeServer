const express = require('express')
const { updateDatabase } = require('./models/data-models')
const middlewareConfig = require('./middleware/middleware-config')
const addController = require('./controllers/main-controller')
const app = express()
const port = process.port || 3000

middlewareConfig(app)
updateDatabase()
addController(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})