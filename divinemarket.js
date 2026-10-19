const express = require('express');
const router = express.Router();
const User = require('./models/User');

const DIVINE_CATALOG = {
  abilities: [
    { id: 'ab_seraph_flight', name: 'Ascended Flight Vector', cost: 1200, category: 'abilities', restrictedZone: 'NONE' },
    { id: 'ab_abyss_blink', name: 'Abyssal Spatial Phase', cost: 1400, category: 'abilities', restrictedZone: 'NONE' }
  ],
  enchantments: [
    { id: 'ench_halo_glow', name: 'Solfeggio 963Hz Crown Aura', cost: 600, category: 'enchantments', baseModifier: 'Light_Regen' },
    { id: 'ench_void_shroud', name: 'Dante Sinner Void Shroud', cost: 650, category: 'enchantments', baseModifier: 'Shadow_Stealth' }
  ]
};

// Purchase Endpoint processing
router.post('/divine-store/purchase', async (req, res) => {
  try {
    const { username, itemId, category } = req.body;
    const user = await User.findOne({ username });
    
    const targetItem = DIVINE_CATALOG[category]?.find(i => i.id === itemId);
    if (!user || !targetItem || user.tokens < targetItem.cost) {
      return res.status(400).json({ success: false, error: 'Insolvent token assets or item node invalid.' });
    }

    user.tokens -= targetItem.cost;
    user.equippedInventory[category].push(targetItem.id);
    await user.save();

    global.stateHasChanged = true;
    res.json({ success: true, updatedUser: user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Marketplace transaction failure.' });
  }
});

module.exports = router;
