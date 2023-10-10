const express = require('express');
const rutaPrincipal = require('./rutaPrincipal/principal.js');
const app = express();

app.get('/', rutaPrincipal);

module.exports = app;