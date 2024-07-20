const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('../config/database'); // Ubah koneksi ke MySQL

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Define User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Middleware for JWT token verification
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).send('Akses tidak diizinkan');

    const token = authHeader.split(' ')[1]; // Extract Bearer token
    console.log('Token:', token); // Tambahkan log ini untuk memeriksa token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err); // Tambahkan log error untuk verifikasi token
            return res.status(401).send('Token tidak valid');
        }
        req.user = decoded; // Pastikan payload yang didekodekan sesuai
        next();
    });
};

// Register route
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat registrasi' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(404).json({ message: 'Username atau password salah' });
        }

        const payload = { id: user.id }; // Pastikan payload konsisten
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat login' });
    }
});

// Protected route
app.get('/api/protected', verifyToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Token is valid', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve static files from the 'html' folder
app.use(express.static(path.join(__dirname, '..', 'html')));

// Send index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
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
