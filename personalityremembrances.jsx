
Real Life Personality-Based Remembrances (Daily Missions)

These missions generate dynamic target vectors based on the user's element profile. For example, Fire elements are assigned active purges, while Earth elements receive grounding anchoring contracts:
jsx
import React from 'react';

export function PersonalityMissionsHUD({ element }) {
  const getMissionText = () => {
    switch(element) {
      case 'Fire': return { title: "🔥 Burn Through The Illusion", desc: "Use your flaming sword mesh weapon node to strike down the shadow grid anomaly located at the central square steps." };
      case 'Water': return { title: "💧 Purify the Grid Current", desc: "Walk down to the river delta bank coordinates. Initialize a 528Hz tuning frequency tone to stabilize the localized water table vectors." };
      case 'Air': return { title: "💨 Disperse the Fog Cloud", desc: "Ascend to the highest balcony structure tip in New Jerusalem. Scan the firmament horizon parameters to log entry portals." };
      default: return { title: "🌱 Anchor Heavenly Foundations", desc: "Locate the ancient olive grove coordinates on the map. Stand still for 60 seconds to plant an energetic protection seed grid." };
    }
  };

  const currentMission = getMissionText();

  return (
    <div className="chat-log-sidebar" style={{ top: '24px', left: '360px', width: '280px', maxHeight: '18%' }}>
      <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>
        🔑 Soul Remembrance Objective
      </div>
      <h4 style={{ margin: '4px 0', color: '#fff', fontSize: '13px' }}>{currentMission.title}</h4>
      <p style={{ fontSize: '11px', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>{currentMission.desc}</p>
    </div>
  );
}
