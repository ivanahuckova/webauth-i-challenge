const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../../data/users-model.js');

const routes = express.Router();

// =========== REGISTER ROUTE ===========
routes.post('/api/register', async (req, res) => {
  let { password, username } = req.body;
  try {
    if (password && username) {
      let hashedPswd = bcrypt.hashSync(password, 10);
      password = hashedPswd;
      const newUser = await Users.add({ username, password });
      req.session.user = newUser;
      res.status(201).json({ id: newUser[0], username, password });
    } else {
      res.status(400).json({ message: 'You need to include username and password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========== LOGIN ROUTE ===========
routes.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      const userLogin = await Users.findByUsername(username);
      const doPasswordsMatch = bcrypt.compareSync(password, userLogin.password);
      if (doPasswordsMatch && userLogin) {
        req.session.user = userLogin;
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

// =========== LOGOUT ROUTE ===========
routes.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "You've been logged out" });
});

module.exports = routes;
