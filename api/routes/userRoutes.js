const express = require('express');
const Users = require('../../data/users-model.js');
const Authorized = require('../middleware/auth-middleware.js');

const routes = express.Router();

// =========== SHOW ALL USERS IF LOGGED IN ROUTE ===========
routes.get('/', Authorized.isLoggedIn, async (req, res) => {
  try {
    const allUsers = await Users.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routes;
