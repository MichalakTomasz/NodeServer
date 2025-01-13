const https = require('https'); 
const fs = require('fs'); 
const express = require('express')

const getHttpsServer = (app) => {
    const  privateKey = fs.readFileSync('key.pem', 'utf8'); 
    const certificate = fs.readFileSync('cert.pem', 'utf8'); 
    const credentials = { key: privateKey, cert: certificate }; // Twoje middleware i konfiguracja 
    app.use(express.json()); 
    app.get('/', (req, res) => { res.send('Hello, secure world!'); }); // Utwórz serwer HTTPS 
    const httpsServer = https.createServer(credentials, app); // Serwer będzie nasłuchiwać na porcie 443 (domyślny port HTTPS) 
    return httpsServer    
}

module.exports = getHttpsServer