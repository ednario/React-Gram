const { Router } = require('express');

// Controller
const { registerUser } = require('../controllers/UserControllers');

// Middlewares
const validate = require('../middlewares/handleValidation');
const { userCreateValidation } = require('../middlewares/userValidation');

const user = Router();

user
  .post('/register', userCreateValidation(), validate, registerUser);

module.exports = user;