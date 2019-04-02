const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);
const dotenv = require('dotenv');

dotenv.config();

//Routes Import
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const restrictedRoutes = require('./routes/restrictedRoutes');

//DB import
const db = require('../data/dbConfig');

//Middleware import
const Authorized = require('./middleware/auth-middleware');

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

//Apply middleware
server.use(Authorized.authorizedForRestricted);

//Routes
server.use('/', authRoutes);
server.use('/api/users', userRoutes);
server.use('/api/restricted', restrictedRoutes);

module.exports = server;
