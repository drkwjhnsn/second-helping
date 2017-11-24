require('dotenv').config();
var express = require('express');
var app = express();
var session = require('express-session');
var { pickup, user, auth } = require('./routes');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}

function verifyUser(req, res, next) {
  if (req.body.user.id === req.session.userId) {
    next();
  } else {
    res.status(302).redirect('/');
  }
}

app.use(allowCrossDomain);
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false }));
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/pickup', pickup);
app.use('/user', user);
app.use('/', express.static(__dirname + '/../client/public'));

var port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Shit's goin down at port ${port}`));
