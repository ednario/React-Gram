const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {  registerUser  }