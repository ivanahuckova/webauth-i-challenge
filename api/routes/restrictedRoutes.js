const express = require('express');
// const Users = require('../../data/users-model.js');

const routes = express.Router();

// =========== GET ROUTES =========== //
routes.get('/', (req, res) => {
  res.json('You can see restricted content! WIP');
});

routes.get('/something', (req, res) => {
  res.json('You can see restricted something! WIP');
});

module.exports = routes;
