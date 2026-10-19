const mongoose = require('mongoose');

// Botanical Node Configuration Matrix
const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rarity: { type: String, enum: ['Common', 'Sacred', 'Abyssal'] },
  spawnBiomes: [String], // e.g., ['Desert', 'Mountain', 'Water_Bank']
  alchemicalProperties: {
    potencyModifier: Number,
    primaryElement: String // 'Sulfur', 'Mercury', 'Salt'
  }
});

const PotionRecipeSchema = new mongoose.Schema({
  resultPotionName: String,
  requiredIngredients: [{ plantId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  unlockedSuperabilityId: String // Links straight to your player state ability engine
});

module.exports = {
  Plant: mongoose.model('Plant', PlantSchema),
  PotionRecipe: mongoose.model('PotionRecipe', PotionRecipeSchema)
};
