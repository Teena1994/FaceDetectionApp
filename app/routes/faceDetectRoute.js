const express = require('express');
const router = express.Router();
const { userSignUp, userLogIn } = require('./../controller/userController');
const { createRequest, listRequests } = require("../controller/imageProcessor");
const multer = require('multer');

const storage = multer.memoryStorage(); // Configure multer to store the uploaded file in memory
const upload = multer({ storage: storage });

router.post('/signUp', userSignUp);
router.post('/login', userLogIn);
router.post('/process-image', upload.single('image'), createRequest);
router.get('/request-list', listRequests)

module.exports = router;