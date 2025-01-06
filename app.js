const express = require('express')
const addController = require('./controllers/main-controller')
const app = express()
const port = process.port || 3000

addController(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})