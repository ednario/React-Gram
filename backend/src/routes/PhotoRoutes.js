const { Router } = require('express')

// Controller
const { 
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos
} = require('../controllers/PhotoControllers')

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
    .delete('/:id', authGuard, deletePhoto)
    .get('/', authGuard, getAllPhotos)
    .get('/user/:id', authGuard, getUserPhotos)

module.exports = photo