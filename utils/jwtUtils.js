const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  // Sign the payload with the secret and set an expiration time (e.g., 1 hour)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
};

// Optional: Function to extract token from headers
exports.extractTokenFromHeaders = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]; // Return the token part after 'Bearer'
  }
  return null;
};
