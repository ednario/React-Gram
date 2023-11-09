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

module.exports = { insertPhoto }