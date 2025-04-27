const express = require('express');
const Profile = require('../models/Profile');

const router = express.Router();

router.post('/', async (req, res) => {
  const { uid, displayName, email, firstName, lastName, country } = req.body; // ✅ Alle Felder annehmen

  try {
    let profile = await Profile.findOne({ where: { uid } });

    if (!profile) {
      profile = await Profile.create({
        uid,
        displayName,
        email,
        firstName,
        lastName,
        country,
      });
    } else {
      // ✅ Update vorhandenes Profil
      await profile.update({
        displayName,
        email,
        firstName,
        lastName,
        country,
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('❌ Fehler beim Erstellen/Updaten des Profils:', error);
    res.status(500).json({ message: 'Fehler beim Erstellen/Updaten des Profils' });
  }
});

module.exports = router;
