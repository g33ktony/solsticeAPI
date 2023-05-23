const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate')
const verifyBlacklisted = require('../middlewares/verifyBlacklisted')

// GET /users
router.get('/', [verifyBlacklisted, authenticate], userController.getAllUsers);

// GET /users by id
router.get('/:id', [verifyBlacklisted, authenticate], userController.getUserById);

// DELETE /users by id
router.delete('/:id', [verifyBlacklisted, authenticate], userController.deleteUserById);


module.exports = router;
