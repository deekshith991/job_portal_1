import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.HASH_KEY || 'your_secret_key'; // Make sure to replace with your secure key in .env

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token in the request header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded token data to request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

