var auth = require('express').Router();
var crypto = require('crypto');
var { User } = require('../models');

auth.get('/autologin', (req, res) => {
  var { userId } = req.session;
  if (userId) {
    new User().where('id', userId).fetch()
    .then((user) => {
      console.log('autologin');
      res.status(200).send(user.toJSON());
    })
  } else {
    res.clearCookie('autologin');
  }
});

auth.post('/signin', (req, res) => {
  var { email, password } = req.body;
  new User().where('email', email).fetch()
  .then((user) => {
    if (user) {
      var user = user.toJSON();
      var submitHash = sha512(password, user.salt);
      if (user.hash === submitHash) {
        delete user.salt;
        delete user.hash;
        req.session.userId = user.id;
        res.cookie('autologin', true).status(200).send(user);
      } else {
        res.status(302).send();
      }
    } else {
      res.status(302).send();
    }
  })
})

auth.post('/signup', (req, res) => {
  var { type, name, address, city, state, zip, email, password, lat, lng } = req.body;
  var { salt, hash } = saltHashPassword(password);
  new User({ address, name, city, state, zip, email, salt, hash, type, lat, lng }).save()
  .then((user) => {
    user = user.toJSON();
    delete user.salt;
    delete user.hash;
    req.session.userId = user.id;
    res.cookie('autologin', true).status(200).send(user);
  });
});

function saltHashPassword(userpassword) {
  var salt = genRandomString(16);
  var hash = sha512(userpassword, salt);
  return {salt, hash};
}

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}

function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var passwordHash = hash.digest('hex');
    return passwordHash;
}

module.exports = auth;
