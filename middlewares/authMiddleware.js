const { verifyToken, extractTokenFromHeaders } = require('../utils/jwtUtils');

exports.protect = (req, res, next) => {
  const token = extractTokenFromHeaders(req);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } 
  catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

