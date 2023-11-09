const { Router } = require('express')

// Controller
const { insertPhoto } = require('../controllers/PhotoControllers')

// Middlewares'
const { photoInsertValidation } = require('../middlewares/photoValidation')
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
const { imageUpload } = require('../middlewares/imageUpload')

const photo = Router("/photos")

// Routes
photo
    .post('/',
    authGuard,
    imageUpload.single('image'),
    photoInsertValidation(),
    validate,
    insertPhoto)

module.exports = photo