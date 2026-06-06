const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      version: '1.0.0',
      description: 'API REST pour gérer les livres — Localhost Academy',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: [path.join(__dirname, '../routes/bookRoutes.js')],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;