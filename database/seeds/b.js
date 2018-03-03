
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pickups').del()
    .then(function () {
      // Inserts seed entries
      return knex('pickups').insert([
        {
          donor_id: 1,
          bank_id: 2
        },
        {
          donor_id: 1,
          bank_id: null
        }
      ]);
    });
};
