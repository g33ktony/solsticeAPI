const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

