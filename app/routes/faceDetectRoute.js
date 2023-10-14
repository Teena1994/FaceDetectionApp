const express = require('express');
const router = express.Router();
const { userSignUp, userLogIn } = require('./../controller/userController');
const validateToken = require('./../controller/tokenValidator');


router.post('/signUp', userSignUp);
router.post('/login', userLogIn);

module.exports = router;