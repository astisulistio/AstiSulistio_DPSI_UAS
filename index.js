// index.js

const express = require('express');
const jwt = require('jsonwebtoken');
const { generateToken } = require('./auth'); // Sesuaikan dengan path file auth.js

const app = express();
const PORT = process.env.PORT || 3000;

// Contoh route yang membutuhkan otorisasi
app.get('/protected', verifyToken, (req, res) => {
  res.send('Halaman terlindungi');
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send('Akses tidak diizinkan');
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(401).send('Token tidak valid');
    }
    req.user = decoded;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});