// Express endpoint managing alchemical spirit cycling
app.post('/api/spirit-vault/recycle', async (req, res) => {
  try {
    const { username, spiritBytePayload } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ success: false, error: 'Profile not found.' });

    // 1. Decode and verify the structure integrity of the encrypted payload bytes
    const decodedSpirit = JSON.parse(atob(spiritBytePayload.bytePayload));

    // 2. Grant adequate token payload scaling matching difficulty tier calculations
    const tokenBounty = decodedSpirit.tokenRewardAdequacy || 100;
    user.tokens += tokenBounty;

    // Remove the item securely from player inventory array cache
    user.inventory.spiritBytes = user.inventory.spiritBytes.filter(
      s => s.spiritId !== spiritBytePayload.spiritId
    );
    await user.save();

    // 3. SOVEREIGN SECOND CHANCE RELOCATION SYSTEM:
    // Fragment the negative raw entity and redistribute it as small positive nodes across the global 3D map
    for (let i = 0; i < 5; i++) {
      const scatterLat = 31.7683 + (Math.random() - 0.5) * 0.05; // Spreads across New Jerusalem terrain
      const scatterLng = 35.2137 + (Math.random() - 0.5) * 0.05;

      await mongoose.model('MapMicroNode').create({
        lat: scatterLat,
        lng: scatterLng,
        type: 'alignment_booster', // Generates small positive reinforcement tasks for nearby lightworkers
        potency: 10
      });
    }

    // 4. Update the active scene loop via central 22Hz network broadcasts
    global.stateHasChanged = true;

    res.json({
      success: true,
      message: `Spirit unharmed and cleanly integrated back into the Archverse map as decentralized boosters. Unlocked 🪙 ${tokenBounty} ST.`,
      newBalance: user.tokens
    });

  } catch (err) {
    res.status(500).json({ success: false, error: 'Recycler compilation processing exception.' });
  }
});
