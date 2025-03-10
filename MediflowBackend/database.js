const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("🔍 Verbindungsdaten:");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_DIALECT:", process.env.DB_DIALECT);

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: console.log  // Logs für SQL-Abfragen aktivieren
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ PostgreSQL erfolgreich verbunden!'))
    .catch(err => console.error('❌ Verbindung fehlgeschlagen:', err));

module.exports = sequelize;
