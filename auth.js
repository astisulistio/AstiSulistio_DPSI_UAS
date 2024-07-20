// auth.js

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
};
