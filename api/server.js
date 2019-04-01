const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');

const authRoutes = require('./routes/authRoutes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/', authRoutes);

module.exports = server;
