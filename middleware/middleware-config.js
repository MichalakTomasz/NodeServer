const bodyParser = require('body-parser')

const middlewareConfig = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
}

module.exports = middlewareConfig