import express from 'express';
import session from 'express-session';

const db = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

// Create express instnace
const app = express();

// const swaggerDocument = require('./swagger.json');

// const swaggerJsdoc = require('swagger-jsdoc');
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Sakepedia API Doc',
//       version: '1.0.0',
//     },
//   },
//   apis: [`${__dirname}/routes/*.js`],
// };
// const swaggerSpec = swaggerJsdoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Init body-parser options (inbuilt with express)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// sessionの設定
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  })
);

// Require & Import API routes
const auth = require('./routes/auth');
const awards = require('./routes/awards');
const breweries = require('./routes/breweries');
const brands = require('./routes/brands');
const sakes = require('./routes/sakes');
const bydatas = require('./routes/bydatas');
const comments = require('./routes/comments');
const users = require('./routes/users');
const analytics = require('./routes/analytics');

//Authenticate
app.use(auth);

// Use API Routes
//app.use(users)
app.use(awards);
app.use(breweries);
app.use(brands);
app.use(sakes);
app.use(bydatas);
app.use(comments);
app.use(users);
app.use(analytics);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
};
