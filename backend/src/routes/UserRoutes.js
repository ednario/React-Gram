const { Router } = require('express');

// Controller
const { registerUser } = require('../controllers/UserControllers');

const user = Router();

user
  .post('/register', registerUser);

module.exports = user;