var config = require('../config/db.js');
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  affiliates: function() {return this.belongsToMany(User)}
});

var Food = bookshelf.Model.extend({
  tableName: 'foods',
  donors: function() {return this.belongsTo(User, 'donor_id')},
  claimants: function() {return this.belongsTo(User, 'claimant_id')}
});

module.exports = { User, Food };
