const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  try {
    // Extract the JWT from the request headers or other suitable locations
    const [,token] = req.headers.authorization.split(' ')
    
    // Verify the JWT
    const decodedToken = jwt.verify(token, 'solstice');
    
    // Attach the user ID to the request object
    req.userId = decodedToken.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate
