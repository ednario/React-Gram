const { validationResult } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next(), res.status(400).json({ errors: errors.array() })
  }

  const extractedErrors = []

  errors.array().map(err => extractedErrors.push(err.msg))

  return res.status(422).json({ errors: extractedErrors })
}

module.exports = validate