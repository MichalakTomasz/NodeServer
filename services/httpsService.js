const https = require('https')
const fs = require('fs')
const express = require('express')

const getHttpsServer = (app) => {
    const  privateKey = fs.readFileSync('key.pem', 'utf8') 
    const certificate = fs.readFileSync('cert.pem', 'utf8')
    const credentials = { key: privateKey, cert: certificate }
    app.use(express.json())
    const httpsServer = https.createServer(credentials, app)
    return httpsServer    
}

module.exports = getHttpsServer