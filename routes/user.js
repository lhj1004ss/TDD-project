const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//@@ desc GET create an user
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId',userController.getUserById);

module.exports = router;