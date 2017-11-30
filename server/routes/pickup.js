var pickup = require('express').Router();
var Promise = require('bluebird');
var { Pickup, Food } = require('../models');


pickup.get('/donor', (req, res) => {
  console.log(req.session);
  new Pickup().where('donor_id', req.session.userId).fetchAll({ withRelated: 'foods' })
  .then((pickups) => {
    res.status(200).send(pickups);
  })
})

pickup.post('/donor', (req, res) => {
  var foods = req.body.foods;
  new Pickup({ donor_id: req.session.userId}).save()
  .then(({ id }) => {
    foods.forEach((food) => food.pickup_id = id);
    return Food.collection(foods).invokeThen('save');
  })
  .then((results) => res.status(200).send());
})

pickup.put('/donor', (req, res) => {
  var foods = req.body.foods;
  new Pickup({ donor_id: req.session.userId}).save()
  .then(({ id }) => {
    foods.forEach((food) => food.pickup_id = id);
    return Food.collection(foods).invokeThen('save');
  })
  .then((results) => res.status(200).send());
});

pickup.delete('/donor', (req, res) => {
  Food.collection(req.body.foods).invokeThen('destroy')
  .then((results) => {
    if (!req.body.pickup) return res.status(200).send();
    new Pickup(req.body.pickup).destroy()
    .then((results) => res.status(200).send());
  });
});

pickup.get('/bank', (req, res) => {
  new Pickup().fetchAll({ withRelated: 'foods' })
  .then((pickups) => {
    res.status(200).end(JSON.stringify(pickups, null, 2));
  }) // ISSUE: this only returns pickups, but not the food items involved
});
//  suggestion: read up on joins and how they work with bookshelf


// pickup.post('/', (req, res) => {
//   var { pickup, foods } = req.body;
//   var { id, type } = user;
//   if (type === 'DONOR') {   //donor creates new pickup or updates old pickup
//     pickup = pickup || {};
//     pickup.donor_id = req.session.userId;
//     // ISSUE: with this setup updates can only really add food items not remove food items
//     new Pickup(pickup).save()
//     .then((pickup) => {
//       var pickup_id = pickup.toJSON().id;
//       var foodPromises = foods.map((food) => {
//         food.pickup_id = pickup_id;
//         return new Food(food).save()
//       });
//       Promise.all(foodPromises)
//       .then(() => {
//         console.log(`pickup stored at ${pickup_id}`);
//         res.status(200).end();
//       });
//     });
//   } else if (type === 'BANK') {   //bank claims/cancels pickup (each call toggles)
//     pickup.bank_id = (pickup.bank_id === id) ? null : id;
//     console.log(pickup);
//     new Pickup(pickup).save()
//     .then((results) => {
//       res.status(200).end();
//     })
//   }
// });
// suggestion: the bank/donor conditional is fine, but move food changes to a PUT method
// oooh or better yet, hrrmmm maybe this does update, if the food has a food id then it should overwrite, not create new
// still, it doesn't remove deleted foods.
// two options
//    - retrieve food items, compare new/old update/add/delete accordingly
//      pros:  cuts down on db calls, one call for retrieval, one call for each updated/ deleted item
//      cons:  updates and deletes are handled differently, increased code complexity
//    - delete all old food items, insert new items
//      pros:  simple, destroy and rewrite
//      cons:  probably more db calls, one for the delete, one for each new insert


//  example:  four item list, update two, delete two
//    1: 1 call for retrieve, two calls for update,
//    2: 1 call for retrieve...
//  nm, they really are the same choice

// TODO:  retrieve all where=pickup_id,
//        compare - make update list (additions go here with no food_id) and delete FoodList
//        delete - where=food_id[0] OR food_id[1]...
//        insert -

pickup.post('/', (req, res) => {

})

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
