const express = require('express');
const router = express.Router();
const MedicalTerm = require('../models/MedicalTerm');

// 🔍 Alle medizinischen Begriffe abrufen
router.get('/', async (req, res) => {
    try {
        const terms = await MedicalTerm.findAll();  // Holt alle Einträge
        res.json(terms);
    } catch (error) {
        console.error("❌ Fehler beim Abrufen der Daten:", error);
        res.status(500).json({ error: error.message });
    }
});

// ➕ Neuen Begriff hinzufügen
router.post('/', async (req, res) => {
    try {
        const { term, definition, category, example } = req.body;
        const newTerm = await MedicalTerm.create({ term, definition, category, example });
        res.status(201).json(newTerm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🚨 **Fehlende Zeile war hier: Exportiere den Router**
module.exports = router;
