const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan jalur ini sesuai dengan lokasi file database.js

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON, // Menyimpan array item sebagai JSON
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false    
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Order;
