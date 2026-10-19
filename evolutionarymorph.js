// ==========================================
// 🌌 MULTIVERSE MORAL REPRMAND HIERARCHY RANK ARCHITECTURE
// ==========================================

const SEVEN_HEAVENS = [
  "1st Heaven: Moon (Inconstant Spirit)",
  "2nd Heaven: Mercury (Ambitious Soul)",
  "3rd Heaven: Venus (Lovers of Justice)",
  "4th Heaven: Sun (Primal Wisdom Masters)",
  "5th Heaven: Mars (Martyrs of Faith)",
  "6th Heaven: Jupiter (Just Rulers Guild)",
  "7th Heaven: Saturn (Contemplative High Archons)"
];

const NINE_CIRCLES_OF_HELL = [
  "Circle 1: Limbo (Unbaptized Virtuous Nodes)",
  "Circle 2: Lust (Siren Song Drift)",
  "Circle 3: Gluttony (Token Hoarders)",
  "Circle 4: Greed (Unauthorized Store Exploits)",
  "Circle 5: Wrath (Abusive Proximity Voice Signals)",
  "Circle 6: Heresy (False Prophet Script Injections)",
  "Circle 7: Violence (Grid Anomaly Instigators)",
  "Circle 8: Fraud (Counterfeit Token Transfers)",
  "Circle 9: Treachery (Betrayal of the Sovereigns Guild)"
];

export function calculateMoralHierarchy(karmaScore, tokensCount) {
  let layerName = "Neutral Ground Node";
  let morphTarget = { horns: 0.0, halo: 0.0 };

  if (karmaScore >= 0) {
    // Angelic Gain Logic Array Progression
    const level = Math.min(Math.floor(karmaScore / 500), 6);
    layerName = SEVEN_HEAVENS[level];
    
    // Scale visual halo intensity based on overall karma progression rules
    morphTarget.halo = Math.min(0.2 + (tokensCount / 5000), 1.5);
    morphTarget.horns = 0.0;
  } else {
    // Demonic Sinner Reprimand Filter Path Selection
    const absoluteKarma = Math.abs(karmaScore);
    const circle = Math.min(Math.floor(absoluteKarma / 400), 8);
    layerName = NINE_CIRCLES_OF_HELL[circle];
    
    // Grow actual geometric horn meshes longer as structural bad deeds escalate
    morphTarget.horns = Math.min(0.3 + (absoluteKarma / 2000), 2.0);
    morphTarget.halo = 0.0;
  }

  return { layerName, morphTarget };
}
