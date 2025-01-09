const fs = require('fs')

const getJson = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const config = getJson('./appsettings.json')

module.exports = config