const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200)
     .set('Content-Type', 'text/html')
     .send(new Buffer('<h2>Holaaa</h2>'));
  
});

app.use(require('./api/locationList'));

module.exports = app;

