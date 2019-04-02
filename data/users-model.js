const db = require('../data/dbConfig.js');

function add(username, password) {
  return db('users').insert(username, password);
}

function findByUsername(username) {
  return db('users')
    .select('username', 'id', 'password')
    .where({ username: username })
    .first();
}

function findAll() {
  return db('users').select('username', 'id', 'password');
}

module.exports = {
  add,
  findByUsername,
  findAll
};
