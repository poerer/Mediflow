require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const MedicalTerm = require('./models/MedicalTerm');  // Importiere das Model
const medicalTermsRoutes = require('./routes/medicalTerms'); // Importiere die API-Routen

const app = express();
app.use(cors());
app.use(express.json());

// Test-Route
app.get('/', (req, res) => {
    res.send('Mediflow API läuft! 🚀');
});

// API-Routen für medizinische Begriffe
app.use('/api/terms', medicalTermsRoutes);

// Datenbank synchronisieren
sequelize.sync()
    .then(() => console.log("✅ Datenbank synchronisiert!"))
    .catch(err => console.log("❌ Fehler beim Synchronisieren:", err));

    MedicalTerm.findAll().then(terms => {
        console.log("✅ Einträge in der Datenbank:", terms);
    }).catch(error => {
        console.error("❌ Fehler beim Abrufen der Daten:", error);
    });
    
// Server starten
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`✅ Server läuft auf Port ${port}`));
