const express = require('express');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', urlRoutes);

module.exports = app;
