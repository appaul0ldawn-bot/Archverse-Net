const mongoose = require('mongoose');

// Expanded MongoDB user schema properties
const ArchProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  birthdate: { type: Date, required: true },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  
  // Math-generated spiritual characteristics parameters
  zodiacElement: String,      // 'Fire', 'Earth', 'Air', 'Water'
  assignedSpiritGuide: String, // 'Phoenix', 'Golden Stag', 'Owl of Athena', 'Leviathan Whale'
  resonanceHz: Number          // 396, 432, 528, 963
});

// Algorithmic matrix parser helper function
function calculateSpiritualProfile(birthdateString) {
  const date = new Date(birthdateString);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Primal elemental mapping configuration rules
  let element = 'Earth';
  let guide = 'Golden Stag';
  let hz = 432;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19) || // Aries
      (month === 7 && day >= 23) || (month === 8 && day <= 22)) {  // Leo
    element = 'Fire';
    guide = 'Phoenix';
    hz = 528; // Transformation/Embers frequency
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21) || // Scorpio
             (month === 2 && day >= 19) || (month === 3 && day <= 20)) {   // Pisces
    element = 'Water';
    guide = 'Leviathan Whale';
    hz = 396; // Deep grounding resonance
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20) || // Gemini
             (month === 9 && day >= 23) || (month === 10 && day <= 22)) { // Libra
    element = 'Air';
    guide = 'Owl of Athena';
    hz = 963; // Pure cosmic awareness
  }

  return { element, guide, hz };
}

// Router verification endpoint
app.post('/api/auth/verify-email', async (req, res) => {
  const { token, birthdate } = req.body;
  try {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) return res.status(400).json({ success: false, error: 'Token expired.' });

    const traits = calculateSpiritualProfile(birthdate);
    
    user.emailVerified = true;
    user.birthdate = new Date(birthdate);
    user.zodiacElement = traits.element;
    user.assignedSpiritGuide = traits.guide;
    user.resonanceHz = traits.hz;
    
    await user.save();
    res.json({ success: true, profile: user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Verification error.' });
  }
});
