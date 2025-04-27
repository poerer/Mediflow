require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const MedicalTerm = require('./models/MedicalTerm');  
const medicalTermsRoutes = require('./routes/medicalTerms'); 
const profileRoutes = require('./routes/profile'); // <-- require statt import!!

const app = express(); // <-- DAS muss VOR app.use() kommen!

app.use(cors());
app.use(express.json());

// Routen einbinden
app.use('/api/terms', medicalTermsRoutes);
app.use('/api/profiles', profileRoutes); // <-- NUR EINMAL!

// Test-Route
app.get('/', (req, res) => {
    res.send('Mediflow API läuft! 🚀');
});

// Datenbank synchronisieren
sequelize.sync()
    .then(() => console.log("✅ Datenbank synchronisiert!"))
    .catch(err => console.log("❌ Fehler beim Synchronisieren:", err));

// Testweise MedicalTerms abrufen
MedicalTerm.findAll()
    .then(terms => {
        console.log("✅ Einträge in der Datenbank:", terms);
    })
    .catch(error => {
        console.error("❌ Fehler beim Abrufen der Daten:", error);
    });

// Server starten
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`✅ Server läuft auf Port ${port}`));
