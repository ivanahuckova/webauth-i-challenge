const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

function add(username, password) {
  return db('users').insert(username, password);
}

function findByUsername(username) {
  return db('users')
    .select('username', 'id', 'password')
    .where({ username: username })
    .first();
}

module.exports = {
  add,
  findByUsername
};
