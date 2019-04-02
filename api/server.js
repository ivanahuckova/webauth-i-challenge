const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);
const dotenv = require('dotenv');

dotenv.config();

//Routes Import
const authRoutes = require('./routes/authRoutes');

//DB import
const db = require('../data/dbConfig');

//Server
const server = express();

//Cookies configuration
const sessionConfig = {
  name: 'users-app-login',
  secret: process.env.COOKIES_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false //in production needs to be true
  },
  httpOnly: true,
  resave: false,
  saveOnInitialized: false,
  store: new SessionStore({
    knex: db,
    tablename: 'online_sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use('/', authRoutes);

module.exports = server;
