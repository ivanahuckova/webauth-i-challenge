const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile.js').development;
const db = knex(knexConfig);

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json('It is working');
});

routes.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await db('users').insert;
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = routes;
