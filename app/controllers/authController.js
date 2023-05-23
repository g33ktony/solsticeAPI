const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const TokenBlacklist = require('../models/blacklistModel');



// POST /auth/register - User registration
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}



// POST /auth/login - User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log("=>(authController.js:62) user", user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, 'solstice', {
      expiresIn: '1h'
    });
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  try {
    // Create a new document in the TokenBlacklist collection
    await TokenBlacklist.create({ token });
    
    res.json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
