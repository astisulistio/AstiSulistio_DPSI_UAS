const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Mengimpor bcrypt untuk hashing password
const User = require('../models/user'); // Mengimpor model User dari models/User
const sequelize = require('../config/database'); // Koneksi ke MySQL
const Order = require('../models/order');

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Kunci rahasia JWT diambil dari variabel lingkungan
const JWT_SECRET = process.env.JWT_SECRET || 'astisulistio'; // Ganti dengan kunci rahasia Anda

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk melayani file statis dari folder html
app.use(express.static(path.join(__dirname, '../html')));

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
    console.log('Login request received:', { username, password }); // Log request body
  
    try {
      const user = await User.findOne({ where: { username } });
      console.log('User found:', user); // Log user found
  
      if (!user) {
        console.error('User not found:', username); // Log if user not found
        return res.status(404).json({ message: 'Username atau password salah' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.error('Invalid password for user:', username); // Log if password invalid
        return res.status(404).json({ message: 'Username atau password salah' });
      }
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated token:', token); // Log generated token
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error); // Log error
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

app.post('/api/order', verifyToken, async (req, res) => {
  const { items, name, email, address } = req.body;

  if (!items || !name || !email || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
      const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const order = new Order({
          userId: req.user.id,
          items,
          totalAmount,
          name,
          email,
          address
      });

      await order.save();
      res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
      console.error('Order error:', error);
      res.status(500).json({ message: 'Error placing order' });
  }
});



// Route untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html')); // Ganti jika ada file utama
});

// Route untuk halaman register
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/register.html'));
});

// Route untuk halaman login
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/login.html'));
});

// Contoh route API, sesuaikan dengan kebutuhan
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Sinkronisasi Sequelize dengan database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database tables:', err);
  });

// Mulai server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
