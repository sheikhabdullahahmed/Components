import jwt from 'jsonwebtoken';

// Generate JWT token with 30 days expiration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
