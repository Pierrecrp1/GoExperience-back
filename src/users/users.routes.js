const express = require('express');
const controller = require('./users.controller');
const middleware = require('../common/jwt.middleware');

const UsersRoutes = express.Router();
const control = new controller();
const middle = new middleware();

UsersRoutes.route('/')
    .post([control.createUser])

UsersRoutes.route('/login')
    .post([control.loginUser])

module.exports = UsersRoutes;