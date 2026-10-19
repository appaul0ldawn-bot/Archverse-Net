const express = require('express');
const router = express.Router();
const { Plant, PotionRecipe } = require('./models/Alchemy');
const User = require('./models/User');

// ==========================================
// 🧪 ALCHEMICAL TRANSFORMATION CRAFTING SYSTEM
// ==========================================
router.post('/craft', async (req, res) => {
  try {
    const { username, recipeId } = req.body;

    // 1. Fetch target user and recipe schema documents from MongoDB
    const user = await User.findOne({ username });
    const recipe = await PotionRecipe.findById(recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ success: false, error: 'User or Recipe matrix node not found.' });
    }

    // 2. Validate ingredient inventory stock levels inside player vault profiles
    let ingredientsMatch = true;
    for (const ingredient of recipe.requiredIngredients) {
      const playerStock = user.inventory.plants.find(
        (p) => p.plantId.toString() === ingredient.plantId.toString()
      );
      if (!playerStock || playerStock.quantity < ingredient.quantity) {
        ingredientsMatch = false;
        break;
      }
    }

    if (!ingredientsMatch) {
      return res.status(400).json({ success: false, error: 'Insufficient harvest components to complete brew.' });
    }

    // 3. Subtract ingredients from player data state collections
    recipe.requiredIngredients.forEach((ingredient) => {
      const playerStock = user.inventory.plants.find(
        (p) => p.plantId.toString() === ingredient.plantId.toString()
      );
      playerStock.quantity -= ingredient.quantity;
    });

    // 4. Bind the unlocked alchemical element superability directly to the active user profile profile
    user.activeSuperability = recipe.unlockedSuperabilityId;
    
    // Reward player with Soul Tokens for successful higher-tier manifestation conversions
    user.tokens += 100;

    await user.save();

    // 5. Notify frontend frames across live socket connections to update UI layouts instantly
    if (global.io && global.players[req.socket.id]) {
      global.players[req.socket.id].activeSuperability = user.activeSuperability;
      global.players[req.socket.id].tokens = user.tokens;
      global.stateHasChanged = true;
    }

    res.json({
      success: true,
      message: `Successfully brewed ${recipe.resultPotionName}! Superability activated.`,
      updatedUser: user
    });

  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal alchemical engine calculation error.' });
  }
});

module.exports = router;
