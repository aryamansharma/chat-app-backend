const express = require('express');
const router = express.Router();

// Getting controllers
const userControllers = require('../controllers/user-controller');

// refactoring controllers
const { getUsers, loginUser, signupUser, deleteUser } = userControllers;

router.route('/').get(getUsers);
router.route('/login').post(loginUser);
router.route('/signUp').post(signupUser);

router.route('/:id').delete(deleteUser);

module.exports = router;