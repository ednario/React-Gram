const { Router } = require('express')

// Controller
const { 
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto
} = require('../controllers/PhotoControllers')

// Middlewares'
const { 
  photoInsertValidation,
  photoUpdateValidation  
} = require('../middlewares/photoValidation')
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
    .get('/:id', authGuard, getPhotoById)
    .put('/:id', authGuard, photoUpdateValidation(), validate, updatePhoto)

module.exports = photo