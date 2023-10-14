const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized Access. Please provide valid token to proceed!' });
    } else {
      console.log(token, process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Token is valid, and 'decoded' contains the payload
      console.log('Token verified successfully', decoded);
      //next();
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.error('JsonWebTokenError:', err.message);
      res.status(401).json({ error: `JsonWebTokenError: ${err.message}` });
  
    } else if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: `TokenExpiredError: ${err.message}` });
    } else {
      console.error('Error:', err.message);
      res.status(401).json({ error: err.message });
  
    }
  }
}

module.exports = validateToken;




