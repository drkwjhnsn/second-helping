exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('address', 100);
      table.string('city', 50);
      table.string('state', 50);
      table.string('zip', 15);
      table.string('email', 50).unique();
      table.string('type', 20);
      table.string('hash', 128);
      table.string('salt', 16);
    })
    .createTable('pickups', (table) => {
      table.increments('id').primary();
      table.integer('donor_id').references('users.id');
      table.integer('bank_id').references('users.id');
    })
    .createTable('foods', (table) => {
      table.increments('id').primary();
      table.integer('pickup_id').references('pickups.id');
      table.string('description', 256);
      table.string('expiry', 128);
      table.string('quantity', 128);
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('foods')
    .dropTable('pickups')
    .dropTable('users');
};
