const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');
const Users = require('../../data/users-model.js');

const knexConfig = require('../../knexfile.js').development;
const db = knex(knexConfig);

const routes = express.Router();

// =========== GET ROUTE =========== //
routes.get('/', (req, res) => {
  res.json('It is working');
});

// =========== REGISTER ROUTE =========== // Without the Users model
// routes.post('/api/register', async (req, res) => {
//   try {
//     if (req.body.password && req.body.username) {
//       const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//       req.body.password = hashedPassword;
//       const newUser = await db('users').insert({ username: req.body.username, password: req.body.password });
//       res.status(201).json({ id: newUser[0], username: req.body.username, password: req.body.password });
//     } else {
//       res.status(400).json({ message: 'You need to include username and password' });
//     }
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
//   // });

// =========== REGISTER ROUTE =========== // With the Users model
routes.post('/api/register', async (req, res) => {
  let { password, username } = req.body;
  try {
    if (password && username) {
      let hashedPswd = bcrypt.hashSync(password, 10);
      password = hashedPswd;
      const newUser = await Users.add({ username, password });
      res.status(201).json({ id: newUser[0], username, password });
    } else {
      res.status(400).json({ message: 'You need to include username and password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========== LOGIN ROUTE =========== // Without the Users model
// routes.post('/api/login', async (req, res) => {
//   try {
//     if (req.body.password && req.body.username) {
//       const specificUser = await db('users')
//         .where({ username: req.body.username })
//         .first();

//       const doPasswordsMatch = bcrypt.compareSync(req.body.password, specificUser.password);
//       if (specificUser && doPasswordsMatch) {
//         res.status(200).json({ message: `Welcome ${specificUser.username}` });
//       } else {
//         res.status(400).json({ message: 'Invalid credentials' });
//       }
//     } else {
//       res.status(400).json({ message: 'You need to include username and password' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// =========== LOGIN ROUTE =========== // With the Users model
routes.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      const userLogin = await Users.findByUsername(username);
      console.log(userLogin);
      const doPasswordsMatch = bcrypt.compareSync(password, userLogin.password);
      if (doPasswordsMatch && userLogin) {
        res.status(200).json({ message: `Welcome ${userLogin.username}` });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ message: 'You need to include username and password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = routes;
