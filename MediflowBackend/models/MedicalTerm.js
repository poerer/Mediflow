const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const MedicalTerm = sequelize.define('MedicalTerm', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    term: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    example: {
        type: DataTypes.TEXT
    },
}, {
    tableName: 'medical_terms',  // **Hier manuell den Tabellennamen setzen**
    timestamps: false            // Falls du `created_at` nicht automatisch willst
});

module.exports = MedicalTerm;
