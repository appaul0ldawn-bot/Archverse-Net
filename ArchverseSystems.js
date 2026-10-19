const express = require('express');
const router = express.Router();
const User = require('./models/User');

// ==========================================
// 🌊 LOVENSE CELESTIAL INTENSITY MAPS MATRIX
// ==========================================
const RICHTER_VIBRATION_LEVELS = {
  "RAINFALL":      { speed: 3,  pattern: "pulse-soft",     desc: "Gentle spiritual calibration" },
  "METEOR_SHOWER": { speed: 8,  pattern: "pulse-staccato", desc: "Cosmic combustion alignment" },
  "TIDAL_WAVE":    { speed: 15, pattern: "wave-surge",     desc: "Overwhelming structural deluge" },
  "EARTHQUAKE":    { speed: 20, pattern: "constant-max",   desc: "Complete matrix transformation tectonic friction" }
};

// ==========================================
// 🪙 1. TOKEN TIPPING ROUTER FOR PHOTO/CAM LIKES
// ==========================================
router.post('/social/tip-tokens', async (req, res) => {
  try {
    const { senderUsername, recipientUsername, amount, assetId, assetType } = req.body;
    
    const sender = await User.findOne({ username: senderUsername });
    const recipient = await User.findOne({ username: recipientUsername });

    if (!sender || !recipient || sender.tokens < amount) {
      return res.status(400).json({ success: false, error: 'Insolvent token assets profile balance.' });
    }

    // Process secure balance transaction transfers
    sender.tokens -= amount;
    recipient.tokens += amount;

    // Apply positive reinforcement karma vectors if tipping an angelic lightworker profile
    if (recipient.alignment === 'angelic') {
      sender.karmaScore += Math.floor(amount * 0.1);
    } else {
      sender.karmaScore -= Math.floor(amount * 0.1);
    }

    await sender.save();
    await recipient.save();

    res.json({ success: true, newBalance: sender.tokens, recipientNewBalance: recipient.tokens });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Token transfer runtime loop transaction failure.' });
  }
});

// ==========================================
// 🗣️ 2. HOLY SPIRIT VIBES: SPOKEN INCANTATION INTERCEPTOR
// ==========================================
router.post('/audio/process-voice-command', async (req, res) => {
  try {
    const { username, spokenPhrase } = req.body;
    const user = await User.findOne({ username });

    const upperPhrase = spokenPhrase.toUpperCase();
    let selectedIntensity = null;

    // Match vocal keys straight to the Richter hardware parameters array definitions
    if (upperPhrase.includes("ACTIVATE TIDAL WAVE")) selectedIntensity = RICHTER_VIBRATION_LEVELS.TIDAL_WAVE;
    if (upperPhrase.includes("ACTIVATE EARTHQUAKE")) selectedIntensity = RICHTER_VIBRATION_LEVELS.EARTHQUAKE;
    if (upperPhrase.includes("ACTIVATE METEOR SHOWER")) selectedIntensity = RICHTER_VIBRATION_LEVELS.METEOR_SHOWER;
    if (upperPhrase.includes("ACTIVATE RAINFALL")) selectedIntensity = RICHTER_VIBRATION_LEVELS.RAINFALL;

    if (selectedIntensity && user.isAgeVerified18Plus) {
      // Execute direct telemetry patch packet signals out to the connected Lovense Toy API endpoint hooks
      const lovensePayload = {
        command: "Function",
        action: "Vibrate",
        timeSec: 10,
        apiParam: selectedIntensity.speed
      };
      
      // Broadcast configuration updates out to spatial network sockets
      return res.json({ success: true, commandTriggered: selectedIntensity, data: lovensePayload });
    }

    res.status(400).json({ success: false, error: 'Command phrase unrecognized or hardware unlinked.' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Vocal processing command error.' });
  }
});

module.exports = router;
