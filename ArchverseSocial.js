const mongoose = require('mongoose');

const ArchverseSocialSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  
  // --- METAPHYSICAL LAYER ---
  activeSpellsAttached: [{
    spellName: String,
    effectType: String,
    expiresAt: Date,
    appliedBy: String
  }],
  masteredGospels: [String], // Unlocked counter-verses in user library inventory
  auraMoodStatus: { type: String, default: 'Serene' }, // 'Serene', 'Radiant', 'Wrathful', 'Veiled'
  
  // --- SOCIAL FEED LAYER ---
  statusPost: { type: String, maxLength: 280 },
  lastPostLocation: {
    cityName: String,
    lat: Number,
    lng: Number
  },
  photoAlbum: [{ url: String, uploadedAt: { type: Date, default: Date.now }, likes: { type: Number, default: 0 } }],
  videoAlbum: [{ url: String, uploadedAt: { type: Date, default: Date.now } }],
  
  // --- JUKEBOX & hardware INTERFACING ---
  musicPlaylist: {
    name: String,
    tracks: [{ title: String, url: String }],
    lovenseIntensityMap: { type: Boolean, default: false }, // Syncs track bass to device vibration levels
    activePlaylistRequests: [{ requestedBy: String, trackTitle: String }]
  },
  
  // --- SWIPE / SOCIAL DISCOVERY MATRICES ---
  swipedRightProfiles: [String], // Array tracking profile matches liked by this user
  swipedLeftProfiles: [String]
});

module.exports = mongoose.model('ArchverseSocial', ArchverseSocialSchema);
