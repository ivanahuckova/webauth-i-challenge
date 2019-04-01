const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');

const knexConfig = require('../../knexfile.js').development;
const db = knex(knexConfig);

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json('It is working');
});

routes.post('/api/register', async (req, res) => {
  const user = req.body;
  try {
    if (user.password && user.username) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await db('users').insert(user);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: 'You need to include username and password' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = routes;
