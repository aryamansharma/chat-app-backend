const express = require('express');
const router = express.Router();

// Getting controllers
const userControllers = require('../controllers/user-controller');

// refactoring controllers
const { getUsers, createUser } = userControllers;

router.route('/').get(getUsers).post(createUser);

module.exports = router;