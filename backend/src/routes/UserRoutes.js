const { Router } = require('express')

// User Controller
const { 
  registerUser,
  login,
  getCurrentUser,
  updateUser,
  getUserById
} = require('../controllers/UserControllers')

// Middlewares
const validate = require('../middlewares/handleValidation')
const { 
  userCreateValidation,
  loginValidation,
  userUpdateValidation
 } = require('../middlewares/userValidation')
 const authGuard = require('../middlewares/authGuard')
const { imageUpload } = require('../middlewares/imageUpload')

const user = Router("/users")

user
  .post('/register', userCreateValidation(), validate, registerUser)
  .post('/login', loginValidation(), validate, login)
  .get('/profile', authGuard, getCurrentUser)
  .put('/',
    authGuard, 
    userUpdateValidation(), 
    validate, 
    imageUpload.single('profileImage'), 
    updateUser
  )
  .get('/:id', getUserById)

module.exports = user