
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donors_claimants').insert([
    {
      donor_id: 1,
      claimant_id: 2
    }
  ])
};
