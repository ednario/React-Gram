const { Router } = require('express');

// Controller
const { registerUser } = require('../controllers/UserControllers');

// Middlewares
const validate = require('../middlewares/handleValidation');

const user = Router();

user
  .post('/register', validate, registerUser);

module.exports = user;