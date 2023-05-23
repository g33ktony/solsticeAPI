const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth register new user
router.post('/register', authController.register);

// GET /users by id
router.post('/login', authController.login);

// POST /logout
router.post('/logout', authController.logout);


module.exports = router;
