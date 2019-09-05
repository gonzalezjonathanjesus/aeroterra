const express = require('express');
const path = require('path');
const allowCrossDomain = require('./middlewares/cors');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(allowCrossDomain);

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(require('./routes/index'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Escuchando puerto: ${PORT}`)
})