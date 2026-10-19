
Master Layout Rendering Structure Integration

Mount these additions into your parent view tree loop in VirtualWorldMap.jsx:
jsx
export default function VirtualWorldMap({ mapName, playerProfile, onLeaveWorld }) {
  const [inspectedPlayer, setInspectedPlayer] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <div className="map-title-banner">
        <h2>{mapName}</h2>
      </div>

      {/* 1. Counseling Guild Reports & Daily Checklists Sidebar Layer */}
      <GuildReportLedger userRank={playerProfile.rank} />

      {/* 2. Interactive Profile & Apparel Inspection Card Component Overlay */}
      <UserProfileCard targetPlayer={inspectedPlayer} onClose={() => setInspectedPlayer(null)} />

      {/* 3. Secure WebRTC Webcam Streaming & File Sharing Matrix Panel */}
      <SecureChatWindow targetUser={inspectedPlayer} currentUserProfile={playerProfile} />

      <Canvas camera={{ position:, fov: 50 }} shadows>
        {/* [... Existing Canvas rendering logic loops, handling avatar clicks via setInspectedPlayer(player) ...] */}
      </Canvas>

      <ChatInputHUD />
    </div>
  );
}
