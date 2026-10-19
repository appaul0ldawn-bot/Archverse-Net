const mongoose = require('mongoose');

// ==========================================
// 🌌 THE ARCHVERSE COSMIC CODEX SCHEMA
// ==========================================
const CodexEntrySchema = new mongoose.Schema({
  entityId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['ANGELIC_HIERARCHY', 'FALLEN_REALM', 'HYBRID_GENESIS', 'STARSEED_ORIGIN', 'APOCRYPHAL_TEXT'],
    required: true 
  },
  loreMetadata: {
    originText: String,      // Primary source citation (e.g., Ezekiel 1, Book of Enoch, Jasher)
    propheticTimeline: String, // Epoch mapping (e.g., Tribulation, Millennial Reign, Judgement Day)
    ancientWisdom: String      // Excerpt or historical warning profile
  },
  psionicAttributes: {
    primaryGift: { type: String, enum: ['TELEPATHY', 'TELEKINESIS', 'PSYCHOMETRY', 'PROPHECY'] },
    resonanceFrequency: Number // Target Solfeggio / Seraph wave tuning (e.g., 963, 528, 432 Hz)
  },
  visualMorphTargets: {
    haloIllumination: Number,  // 0.0 to 2.0 scaling logic
    hornCurvature: Number,
    wingSpanType: String       // 'CHERUB_FOUR_FACES', 'SERAPH_SIX_WINGS', 'VOID_TATTERED'
  }
});

module.exports = mongoose.model('CodexEntry', CodexEntrySchema);
