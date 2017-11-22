require('dotenv').config();
var express = require('express');
var app = express();
var { pickup, user } = require('./routes');
var passport = require('passport')
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Promise = require('bluebird');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};












app.use(allowCrossDomain);
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));
app.use('/pickup', pickup);
app.use('/user', user);

app.listen(3000, () => console.log('Server listening...'));
