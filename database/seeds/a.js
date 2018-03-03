
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'The Fat Lady',
          lat: 37.796623,
          lng: -122.277830,
          address: '201 Washington St',
          city: 'Oakland',
          state: 'CA',
          zip: '94607',
          email: 'other@other.com',
          type: 'DONOR',
          hash: 'f6b34f628879b633bb2dafe7682085fa227b45ddd9beee5f06ba736f034ead0902c27049d390c13f8b1218bf353aadef5ec45515776424a695cf1fde05692b16',
          salt: '391586258e7f71b4'
        },
        {
          name: 'Lake Merrit Food Bank',
          lat: 37.801162,
          lng: -122.265438,
          address: '184 13th st',
          city: 'Oakland',
          state: 'CA',
          zip: '94612',
          email: 'drk.w.jhnsn@gmail.com',
          type: 'BANK',
          hash: '533a6d9502e9097f2678890d93549bef8afc9265026fd66b1e32f9f6cd18a14f5fca53518ae8386af82a30408b954f6dd22cb5bc8354d1664b757503d68d3963',
          salt: '4763455369e6be9d'
        },
      ]);
    });
};
