const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // oder dein Verbindungsfile

const Profile = sequelize.define('Profile', {
  displayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Profile;
