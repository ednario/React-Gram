const { Router } = require('express')

// Controller
const { registerUser, login } = require('../controllers/UserControllers')

// Middlewares
const validate = require('../middlewares/handleValidation')
const { 
  userCreateValidation,
  loginValidation
 } = require('../middlewares/userValidation')

const user = Router("/users")

user
  .post('/register', userCreateValidation(), validate, registerUser)
  .post('/login', loginValidation(), validate, login)

module.exports = user