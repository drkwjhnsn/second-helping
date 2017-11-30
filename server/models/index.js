var config = require('../config/db.js');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var Pickup = bookshelf.Model.extend({
  tableName: 'pickups',
  donor: () => this.belongsTo(User, 'donor_id'),
  bank: () => this.belongsTo(User, 'bank_id'),
  foods: function () {return this.hasMany(Food)}
});

var Food = bookshelf.Model.extend({
  tableName: 'foods',
  pickup: () => this.belongsTo(Pickup)
});

module.exports = { User, Pickup, Food };
