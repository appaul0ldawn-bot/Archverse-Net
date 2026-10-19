const INCANTATION_MATRIX = {
  demonic_spells: {
    "BIND_SOUL": {
      spokenKeyword: "Obscurare Catenis",
      duration: 300000, // 5 minutes
      profileEffect: "Soul Bind Anomaly",
      auraColorModifier: "#4a044e" // Dark Violet aura spike
    },
    "ENERGY_DRAIN": {
      spokenKeyword: "Consumere Lucem",
      duration: 60000,
      profileEffect: "Vibrational Stagnancy",
      auraColorModifier: "#18181b" // Shadow black shroud
    }
  },
  angelic_counters: {
    "BIND_SOUL": {
      spokenKeyword: "Psalm 91:4", // "He shall cover thee with his feathers"
      clearsEffect: "Soul Bind Anomaly"
    },
    "ENERGY_DRAIN": {
      spokenKeyword: "Isaiah 40:31", // "They shall mount up with wings as eagles"
      clearsEffect: "Vibrational Stagnancy"
    }
  }
};
