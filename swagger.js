const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Automatycznie wygenerowana dokumentacja API',
  },
  host: 'localhost:3000',
  schemes: ['http','https'],
}

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './controllers/auth-controller.js', 
  './controllers/main-controller.js', 
  './controllers/product-controller.js',
  './controllers/user-controller.js'];

 swaggerAutogen(outputFile, endpointsFiles, doc)
