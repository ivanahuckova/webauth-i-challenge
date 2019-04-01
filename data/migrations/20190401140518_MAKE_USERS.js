exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username', 128).notNullable();
    table.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
