const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mediflow', 'pialindemann', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // optional: deaktiviert SQL-Logging im Terminal
});

module.exports = sequelize;
