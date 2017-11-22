var dbConfig = {
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'derek',
    password : '',
    database : 'secondHelping'
  }
};
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var Pickup = bookshelf.Model.extend({
  tableName: 'pickups'
});

var Food = bookshelf.Model.extend({
  tableName: 'foods'
});

module.exports = { User, Pickup, Food };
