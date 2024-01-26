const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        Title: 'Players API',
        Description: 'Players API',
    },
    host: 'localhost:8083',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);