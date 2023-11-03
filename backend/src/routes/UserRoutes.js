const { Router } = require('express')

// User Controller
const { 
  registerUser,
  login,
  getCurrentUser } = require('../controllers/UserControllers')

// Middlewares
const validate = require('../middlewares/handleValidation')
const { 
  userCreateValidation,
  loginValidation
 } = require('../middlewares/userValidation')
 const authGuard = require('../middlewares/authGuard')

const user = Router("/users")

user
  .post('/register', userCreateValidation(), validate, registerUser)
  .post('/login', loginValidation(), validate, login)
  .get('/profile', authGuard, getCurrentUser)

module.exports = user