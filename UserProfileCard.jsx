
The Profile Inspector UI Component (UserProfileCard.jsx)

jsx
import React from 'react';

export function UserProfileCard({ targetPlayer, onClose }) {
  if (!targetPlayer) return null;

  const isAngelic = targetPlayer.alignment === 'angelic';

  return (
    <div className="profile-inspector-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>{targetPlayer.name}</h3>
        <button onClick={onClose} style={{ background: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer' }}>✕</button>
      </div>

      <div style={{ margin: '8px 0', fontSize: '12px' }}>
        <span className="badge-indicator" style={{ backgroundColor: isAngelic ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: isAngelic ? '#fde047' : '#fca5a5' }}>
          Rank: {targetPlayer.rank || 'Cherub'}
        </span>
      </div>

      {/* --- STATUS INVENTORY LOG --- */}
      <div className="dashboard-section-title">Equipped Apparel & Relics</div>
      <div className="apparel-grid">
        <div className="apparel-slot"><strong>Wings</strong>{targetPlayer.equippedInventory?.wings || 'None'}</div>
        <div className="apparel-slot"><strong>Weapon</strong>{targetPlayer.equippedInventory?.weapon || 'None'}</div>
        <div className="apparel-slot"><strong>Headgear</strong>{targetPlayer.equippedInventory?.headgear || 'None'}</div>
      </div>

      <div className="dashboard-section-title">Vibrational Status</div>
      <div className="metric-row">
        <span>Matrix Core:</span>
        <span style={{ color: isAngelic ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
          {isAngelic ? 'ACTIVE LIGHT' : 'SHADOW DISGUISE'}
        </span>
      </div>
    </div>
  );
}
