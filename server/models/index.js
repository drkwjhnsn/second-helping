var config = require('../config/db.js');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var Pickup = bookshelf.Model.extend({
  tableName: 'pickups',
  donor: function () {
    // console.dir(this.belongsTo(User, 'donor_id'), {depth: 5, colors: true});
    return this.belongsTo(User, 'donor_id')
  },
  bank: function () {
    return this.belongsTo(User, 'bank_id')
  },
  foods: function () {return this.hasMany(Food)}
  // important: arrow functions don't work here, they mess with the context!
});

var Food = bookshelf.Model.extend({
  tableName: 'foods',
  pickup: () => this.belongsTo(Pickup)
});

module.exports = { User, Pickup, Food };
