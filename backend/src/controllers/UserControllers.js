const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
};

// Register user and sing in
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  // check if user exists
  const user = await User.findOne({ email })

  if(user) {
    res.status(422).json({ errors: ["email already registered, please use another email address"]})
    return
  }

  // Generate password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  try {
    const user = await newUser.save();

  // Return user and token
    res.status(200).json({
      _id: user._id,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // check if user exists
  if(!user) {
    res.status(422).json({ errors: ["User does not exist"]})
    return
  }

  // check if password is correct
  if(!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Invalid email or password"]})
    return
  }

  // Return user and token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  });
}

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user

  res.status(200).json(
    user
  )
}

// Update an user
const updateUser = async (req, res) => {
  const { name, password, bio } = req.body

  let profileImage = null

  if(req.file){
    profileImage = req.file.filename
  }

  const reqUser = req.user

  const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id))

  if(name) {
    user.name = name
  }

  if(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword
  }

  if(profileImage) {
    user.profileImage = profileImage
  }

  if(bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  })
}

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select('-password')

    if(!user) {
      res.status(404).json({ errors: ["User not found"]})
      return
    }
  
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  login,
  getCurrentUser,
  updateUser,
  getUserById
}