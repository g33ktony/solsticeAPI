const TokenBlacklist = require('../models/blacklistModel');

const verifyBlacklisted = async (req, res, next) => {
  try {
    const [,token] = req.headers.authorization.split(' ');
    
    // Check if the token exists in the TokenBlacklist collection
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ error: 'Token revoked' });
    }
    
    // Token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyBlacklisted;
