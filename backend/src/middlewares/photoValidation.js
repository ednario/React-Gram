const { body } = require('express-validator')

const photoInsertValidation = () => {
  return [
      body('title')
        .not()
        .equals('undefined')
        .withMessage('Title is required')
        .isString('Title must be string')
        .withMessage('Title must be string')
        .isLength({ min: 3 })
        .withMessage('Title is required min 3 characters'),
      body('image').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image is required')
        }
        return true
      })
  ]
}

const photoUpdateValidation = () => {
  return [
      body('title')
        .optional()
        .isString()
        .withMessage('Title must be string')
        .isLength({ min: 3 })
        .withMessage('Title is required min 3 characters'),
  ]
}

module.exports = { 
  photoInsertValidation,
  photoUpdateValidation
}