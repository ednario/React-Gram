const { body } = require('express-validator')

const userCreateValidation = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .isString()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name is required min 3 characters'),
      body('email')
      .isEmail()
      .withMessage('Email is invalid'),
      body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('confirmpassword')
      .isString()
      .withMessage('Confirm password is required')
      .custom((value, {req}) => {
        if(value != req.body.password) {
          throw new Error('Passwords do not match')
        }
        return true
      })
  ]
}

const loginValidation = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Email is invalid'),
      body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ]
}

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name is required min 3 characters"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]
}

module.exports = { 
  userCreateValidation,
  loginValidation,
  userUpdateValidation
}