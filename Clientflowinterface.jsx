
Client Onboarding Flow Interface

When a new user connects to the Archverse for the first time, they navigate through a step-by-step registration matrix that caches data to MongoDB and locks their session:
jsx
// Onboarding Step State Controller Sequence
const ONBOARDING_STEPS = {
  1: "AUTHENTICATION_GATE",    // Username, Password, and Age Declaration
  2: "ALIGNMENT_SELECTION",   // Choosing Angelic or Demonic baseline aura matrices
  3: "BIOMETRIC_VERIFICATION", // Age/ID verification gate (Required for camera layers)
  4: "REALM_DEPLOYMENT"        // Spawning onto the 3D Google Tiles Map floor
};
