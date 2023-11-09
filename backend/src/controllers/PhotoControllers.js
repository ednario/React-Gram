const Photo = require('../models/Photo')
const User = require('../models/User')

const mongoose = require('mongoose')

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body
  const image = req.file.filename

  const reqUser = req.user

  const user = await User.findById(reqUser._id)

  // Create a photo
  const newPhoto = await Photo.create({
    title,
    image,
    userId: user._id,
    userName: user.name
  })

  // If photo was created sucessfully, return data
  if(!newPhoto) {
    return res.status(400).json({
      success: false,
      message: 'Failed to create photo'
    })
  }

  res.status(201).json({
    success: true,
    data: newPhoto
  })
}

// Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params

  const reqUser = req.user

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    // check if photo exists
    if(!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      })
    }

    // check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to delete this photo'
      })
    }

    await Photo.findByIdAndDelete(photo._id)

    res.status(200).json({
      success: true,
      message: 'Photo deleted'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Photo not deleted'
    })
  }
}

// Get all photos from DB
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({}).sort({ createdAt: -1 }).exec()

    res.status(200).json({
      success: true,
      data: photos
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get photos'
    })
  }
}

// Get user photos from DB
const getUserPhotos = async (req, res) => {
  const { id } = req.params

  try {
    const photos = await Photo.find({ userId: id }).sort({ createdAt: -1 }).exec()

    res.status(200).json({
      success: true,
      data: photos
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get photos'
    })
  }
}

// Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params

  try {
    const photo = await Photo.findById(id)

    if(!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      })
    }

    res.status(200).json({
      success: true,
      data: photo
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get photo'
    })
  }
}

module.exports = { 
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById
}