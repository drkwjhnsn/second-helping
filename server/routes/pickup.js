var pickup = require('express').Router();
var { Pickup } = require('../models');

pickup.get('/', (req, res) => {
  new Pickup().fetchAll()
  .then((pickups) => {
    res.status(200).end(JSON.stringify(pickups, null, 2))
  })
});

pickup.post('/', (req, res) => {
  var { pickup, foods, user } = req.body;
  var { id, type } = user;
  if (type === 'DONOR') {   //donor creates new pickup or updates old pickup
    pickup = pickup || {};
    pickup.donor_id = id;
    new Pickup(pickup).save()
    .then((pickup) => {
      var pickup_id = pickup.toJSON().id;
      var foodPromises = foods.map((food) => {
        food.pickup_id = pickup_id;
        return new Food(food).save()
      });
      Promise.all(foodPromises)
      .then(() => {
        console.log(`pickup stored at ${pickup_id}`);
        res.status(200).end();
      });
    });
  } else if (type === 'BANK') {   //bank claims/cancels pickup (each call toggles)
    pickup.bank_id = (pickup.bank_id === id) ? null : id;
    console.log(pickup);
    new Pickup(pickup).save()
    .then((results) => {
      res.status(200).end();
    })
  }
});

pickup.delete('/', (req, res) => {
  var pickup_id = req.query.id;
  new Food().where('pickup_id', pickup_id).destroy()
  .then(() => {
    new Pickup().where('id', pickup_id).destroy()
    .then(() => {
      res.status(200).end();
    })
  })
});

module.exports = pickup;
