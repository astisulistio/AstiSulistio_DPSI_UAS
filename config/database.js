const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3306
});

module.exports = {
  development: {
    username: 'sql12721016',
    password: 'VAcFzfRu5F',
    database: 'sql12721016',
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    dialect: 'mysql',
  },
};
