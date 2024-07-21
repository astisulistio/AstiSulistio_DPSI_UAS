const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql12721016', 'sql12721016', 'VAcFzfRu5F', {
  host: 'sql12.freesqldatabase.com',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;
