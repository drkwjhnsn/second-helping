
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {
          // pickup_id: 1,
          donor_id: 1,
          claimant_id: 2,
          description: 'Potatoes',
          quantity: '20 lbs'
        },
        {
          // pickup_id: 1,
          donor_id: 1,
          claimant_id: 2,
          description: 'Corn',
          quantity: '10 lbs'
        },
        {
          // pickup_id: 2,
          donor_id: 1,
          description: 'Apples',
          quantity: '15 lbs'
        },
        {
          // pickup_id: 2,
          donor_id: 1,
          description: 'Squash',
          quantity: '5 lbs'
        }
      ]);
    });
};
