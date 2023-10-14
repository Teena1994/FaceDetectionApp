const express = require('express');
const router = express.Router();
const { userSignUp, userLogIn } = require('./../controller/userController');
const processImage = require("../controller/imageProcessor");
const multer = require('multer');

const storage = multer.memoryStorage(); // Configure multer to store the uploaded file in memory
const upload = multer({ storage: storage });

router.post('/signUp', userSignUp);
router.post('/login', userLogIn);
router.post('/process-image', upload.single('image'), processImage);

module.exports = router;