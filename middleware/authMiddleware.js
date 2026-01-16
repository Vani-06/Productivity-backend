const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  // Check if the header exists and starts with "Bearer"
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]; // Extract the actual code
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the user's ID to the request so we know who is talking
      req.user = decoded; 
      
      next(); // "You're allowed in! Go to the next function."
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, no entry" });
  }
};

module.exports = { protect };