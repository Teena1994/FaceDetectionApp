const express = require('express'),
      app = express(),
      cors = require('cors'),
      faceDetectAppRoute = require('./routes/faceDetectRoute.js'),
      setJwtTokenInEnv = require('./config/setJwtToken.js');
      require('dotenv').config({path: '../.env'});

//Initial setup to generate and store JWT secret token in .env file
if(process.env.JWT_SECRET === undefined){
  setJwtTokenInEnv();
} 

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

//face detection app routes
app.use('/api/face-detect', faceDetectAppRoute);

// Middleware for cors policy
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});