var user = require('express').Router();
var { User } = require('../models');

user.get('/', (req, res) => {
  var id = req.query.id;
  new User().where('id', id).fetch()
  .then((user) => {
    res.status(200).end(JSON.stringify(user, null, 2));
  })
});

user.post('/', (req, res) => {
  var { username, type } = req.body;
  new User({username, type}).save()
  .then((user) => {
    res.status(200).end(`${user.toJSON().id}`);
  })
});

module.exports = user;
