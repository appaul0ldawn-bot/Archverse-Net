const express = require('express');
const router = express.Router();
const User = require('./models/User');

// ==========================================================================
// 🌊 COGNITIVE MOVEMENT PREDICTION ENGINE (GLIMMER ORACLE MATRIX)
// ==========================================================================
router.post('/oracle/predict-glimmer', async (req, res) => {
  try {
    const { username, currentPositionX, currentPositionZ, headingVectorX, headingVectorZ } = req.body;
    
    // 1. Linearly project user's spatial vector path 10 seconds into the future
    const predictedX = currentPositionX + (headingVectorX * 10);
    const predictedZ = currentPositionZ + (headingVectorZ * 10);

    // 2. Generate an algorithmic prophecy glimmer based on destination coordinates intersection
    let glimmerVision = "The Veil ripples silently. Your path drifts forward along the quiet waters.";
    
    if (predictedX > 20 && predictedZ < -20) {
      glimmerVision = "✨ [GLIMMER VISION]: The Council of Waters foresees your arrival at the Eastern Pearlescent Gate. Prepare a prayer seed to plant.";
    } else if (Math.abs(predictedX) < 5 && Math.abs(predictedZ) < 5) {
      glimmerVision = "✨ [GLIMMER VISION]: A sudden convergence of light manifests at the city altar core. Align your frequency to 963Hz within 60 seconds.";
    }

    res.json({ success: true, glimmer: glimmerVision, targetCoordinates: { x: predictedX, z: predictedZ } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Oracle timeline calculation failure.' });
  }
});

// ==========================================================================
// 🙏 PRAYER REQUESTS & SOUL WISHES LEDGER
// ==========================================================================
router.post('/prayers/submit', async (req, res) => {
  try {
    const { username, prayerText, structuralLocation } = req.body;

    const newPrayer = await mongoose.model('PrayerNode').create({
      submittedBy: username,
      text: prayerText,
      location: structuralLocation,
      isAnswered: false,
      worthyStatus: 'PENDING_COUNCIL_REVIEW'
    });

    res.json({ success: true, prayerNode: newPrayer });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Prayer database submission error.' });
  }
});

router.post('/prayers/fulfill', async (req, res) => {
  try {
    const { fulfillerUsername, prayerId, fulfillmentActionText } = req.body;
    
    const fulfiller = await User.findOne({ username: fulfillerUsername });
    const prayer = await mongoose.model('PrayerNode').findById(prayerId);

    if (!fulfiller || !prayer || prayer.isAnswered) {
      return res.status(400).json({ success: false, error: 'Invalid transaction parameters or prayer already sealed.' });
    }

    // 3. Evaluate Worthiness Constraint: Determine if action matches Christ-like parameters
    const textAnalysisLower = fulfillmentActionText.toLowerCase();
    const isDeemedWorthy = textAnalysisLower.includes("give") || textAnalysisLower.includes("heal") || textAnalysisLower.includes("bless");

    if (!isDeemedWorthy) {
      prayer.worthyStatus = 'DECLINED_BY_COUNCIL';
      await prayer.save();
      return res.status(400).json({ success: false, error: 'Action evaluated as insufficient to fulfill request intent.' });
    }

    // 4. Allocate Token Rewards & Karma Gains for Worthy Manifestations
    prayer.isAnswered = true;
    prayer.worthyStatus = 'SEALED_WORTHY';
    prayer.answeredBy = fulfillerUsername;
    await prayer.save();

    fulfiller.tokens += 350; // High token adequacy reward for holy work
    fulfiller.karmaScore += 800; // Drastic upward shift through the 7 Heavens hierarchy
    await fulfiller.save();

    res.json({ success: true, message: 'Prayer worthiness sealed. 🪙 350 ST allocated to your vault profile.', updatedUser: fulfiller });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Fulfillment engine exception.' });
  }
});

module.exports = router;
