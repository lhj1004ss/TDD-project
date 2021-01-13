const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//@@ desc GET
router.get('/', userController.register);

module.exports = router;