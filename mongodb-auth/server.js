const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Mengimpor bcrypt untuk hashing password
const User = require('../models/User'); // Mengimpor model User dari models/User
const sequelize = require('../config/database'); // Koneksi ke MySQL

const app = express();
const port = process.env.PORT || 3000;

// Kunci rahasia JWT diambil dari variabel lingkungan
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware untuk verifikasi token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send('Akses tidak diizinkan');

  const token = authHeader.split(' ')[1]; // Extract Bearer token

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).send('Token tidak valid');
    }
    req.user = decoded;
    next();
  });
};

// Rute pendaftaran
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
  }
});

// Rute login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request:', { username, password }); // Log input request

  try {
    const user = await User.findOne({ where: { username } });
    console.log('User found:', user); // Log user found

    if (!user) {
      console.error('User not found for username:', username); // Log jika pengguna tidak ditemukan
      return res.status(404).json({ message: 'Username atau password salah' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Password mismatch for username:', username); // Log jika password tidak cocok
      return res.status(404).json({ message: 'Username atau password salah' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error); // Log error
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});

// Rute yang dilindungi
app.get('/api/protected', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Token is valid', user });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database tables:', err);
  });
