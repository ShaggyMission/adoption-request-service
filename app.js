const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/adoptionRequest.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use(bodyParser.json());
app.use('/adoptionRequest-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

module.exports = app;

