require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongodb = require('./database/');
const baseRouter = require('./routes/');

app.use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.use('/', baseRouter);

const port = process.env.PORT || 3000;
mongodb.initClient((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and App lintening on port: ${port}`);
  }
});
