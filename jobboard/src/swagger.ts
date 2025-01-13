// src/swagger.js

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board API',
            version: '1.0.0',
            description: 'API documentation for Job Board application',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change this URL when deployed
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs (adjust based on your structure)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app:any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
