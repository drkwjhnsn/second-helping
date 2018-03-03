var pickup = require('express').Router();
var Promise = require('bluebird');
var { Pickup, Food } = require('../models');


pickup.get('/donor', (req, res) => {
  new Pickup().where('donor_id', req.session.userId).fetchAll({ withRelated: 'foods' })
  .then((pickups) => {
    res.status(200).send(pickups);
  })
})

pickup.post('/donor', (req, res) => {
  var foods = req.body.foods;
  var donor_id = req.session.userId;
  new Pickup({ donor_id }).save()
  .then(({ id }) => {
    foods.forEach((food) => food.pickup_id = id);
    return Food.collection(foods).invokeThen('save');
  })
  .then((results) => res.status(200).send());
})

pickup.put('/donor', (req, res) => {
  var foods = req.body.foods;
  var donor_id = req.session.userId;
  new Pickup({ donor_id }).save()
  .then(({ id }) => {
    foods.forEach((food) => food.pickup_id = id);
    return Food.collection(foods).invokeThen('save');
  })
  .then((results) => res.status(200).send());
});

pickup.delete('/donor', (req, res) => {
  var pickupId = req.query.pickupId;
  new Food().where('pickup_id', pickupId).destroy()
  .then((results) => new Pickup().where('id', pickupId).destroy())
  .then((results) => res.status(200).send());
});

pickup.get('/bank', (req, res) => {
  var bank_id = req.session.userId;
  new Pickup().query({ where: { bank_id: null }, orWhere: { bank_id } }).fetchAll({ withRelated: ['foods', 'donor'] })
  .then((pickups) => {

    //this is the mildly hacky workaround to the lesson of keeping auth data in table apart from user data
    pickups = pickups.serialize();
    pickups.forEach((pickup) => {
      delete pickup.donor.salt;
      delete pickup.donor.hash;
    });

    res.status(200).send(pickups);
  })
});

pickup.post('/bank', (req, res) => {
  var id = req.body.claimId;
  var bank_id = req.session.userId;
  new Pickup({ id, bank_id }).save()
  .then((results) => res.status(200).send());
})

pickup.put('/bank', (req, res) => { // this is not safe, does not verify that user actually owns the claim
  var id = req.body.claimId;
  new Pickup({ id, bank_id: null }).save()
  .then((results) => res.status(200).send());
})

pickup.delete('/bank', (req, res) => { // ditto
  var claimId = req.query.claimId;
  new Food().where('pickup_id', claimId).destroy()
  .then((results) => new Pickup().where('id', claimId).destroy())
  .then((results) => res.status(200).send());
})

module.exports = pickup;
