
Glassmorphic Profile & Social Feed Interface Overlay

This layout acts as the primary interactive social overlay wrapper, rendering swipe menus, location tags, media grids, and request channels directly to the left side of the Three.js screen space:
jsx
import React, { useState } from 'react';

export function ArchverseSocialHUD({ userSocialData, onSwipeRight, onPostStatus }) {
  const [activeTab, setActiveTab] = useState('PROFILE');
  const [statusInput, setStatusInput] = useState('');

  return (
    <div className="chat-log-sidebar" style={{ 
      top: '12%', left: '24px', width: '360px', maxHeight: '70%', 
      background: 'rgba(15, 23, 42, 0.95)', border: '2px solid #818cf8', borderRadius: '20px' 
    }}>
      {/* HUD HEADER TAB NAVIGATION */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
        {['PROFILE', 'MAIN_FEED', 'JUKEBOX'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`custom-option-btn ${activeTab === tab ? 'active' : ''}`}
            style={{ fontSize: '11px', padding: '6px' }}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* --- TAB VIEW 1: PROFILE & RELICS INSPECTOR --- */}
      {activeTab === 'PROFILE' && (
        <div style={{ overflowY: 'auto', flex: 1, marginTop: '10px' }}>
          <h3 style={{ margin: '0 0 2px 0' }}>{userSocialData.username}</h3>
          <div style={{ fontSize: '12px', color: '#fde047' }}>Aura Aura Mood: ✨ {userSocialData.auraMoodStatus}</div>
          
          <div className="dashboard-section-title">Active Afflictions / Spells</div>
          {userSocialData.activeSpellsAttached?.length > 0 ? (
            userSocialData.activeSpellsAttached.map((s, idx) => (
              <div key={idx} style={{ color: '#f87171', fontSize: '12px' }}>💀 Afflicted with: {s.spellName}</div>
            ))
          ) : (
            <div style={{ fontSize: '11px', color: '#64748b' }}>Spirit matrix completely unblemished and clean.</div>
          )}

          <div className="dashboard-section-title">Photo Album Grid</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {userSocialData.photoAlbum?.map((img, idx) => (
              <div key={idx} style={{ position: 'relative', background: '#000', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '4px', right: '4px', fontSize: '10px', color: '#fbbf24' }}>❤️ {img.likes}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB VIEW 2: SWIPE DISCOVERY & MAIN FEED --- */}
      {activeTab === 'MAIN_FEED' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          {/* Status Update Post Input Box */}
          <div style={{ marginBottom: '12px' }}>
            <input 
              type="text" 
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              placeholder="Post manifestation state to local sector coordinates..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px', borderRadius: '8px', fontSize: '12px' }}
            />
            <button onClick={() => { onPostStatus(statusInput); setStatusInput(''); }} className="buy-upgrade-btn" style={{ width: '100%', marginTop: '6px' }}>
              Broadcast Status Post
            </button>
          </div>

          {/* Swipe Discovery Card Section */}
          <div className="dashboard-section-title">Matrix Discovery Swipe Deck</div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '30px', backgroundColor: '#4f46e5', margin: '0 auto 8px auto' }} />
            <h4 style={{ margin: '0 0 2px 0' }}>Fallen_Guardian_44</h4>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>📍 Near Asheboro Sector Grid</span>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
              <button className="custom-option-btn" style={{ borderColor: '#f87171' }}>❌ Pass</button>
              <button onClick={() => onSwipeRight('Fallen_Guardian_44')} className="custom-option-btn active" style={{ borderColor: '#34d399' }}>❤️ Align</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB VIEW 3: JUKEBOX PLAYLISTS & TELETAC HARDWARE CAPABILITIES --- */}
      {activeTab === 'JUKEBOX' && (
        <div style={{ overflowY: 'auto', flex: 1, marginTop: '10px' }}>
          <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(129, 140, 248, 0.3)', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: '#a5b4fc', fontWeight: 'bold', display: 'block' }}>🍆 LOVENSE INTERFACE ACTIVATED</span>
            <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#cbd5e1' }}>
              Hardware device connectivity synced. Music frequency rhythm will modulate node vibration intensity in real-time.
            </p>
          </div>

          <div className="dashboard-section-title">Track Playlist Queue Requests</div>
          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
            {userSocialData.musicPlaylist?.activePlaylistRequests?.map((req, idx) => (
              <div key={idx} style={{ padding: '4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                🎵 <strong>{req.trackTitle}</strong> — <span style={{ color: '#64748b' }}>Requested by {req.requestedBy}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
