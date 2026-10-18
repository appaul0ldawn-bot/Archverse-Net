import React, { useState, useEffect } from 'react';

export function PoketanjelHUD({ currentUsername, currentTokensBalance, socket }) {
  const [journalLog, setJournalLog] = useState([]);
  const [tickerMessage, setTickerLog] = useState('Welcome Asher! Ready to catch MonSTARS across the local grid?');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    socket.emit('request_poketanjel_dex_snapshot', { username: currentUsername });
    socket.on('poketanjel_dex_payload', (data) => {
      setJournalLog(data.journalRecords || []);
    });
    return () => socket.off('poketanjel_dex_payload');
  }, [currentUsername, socket]);

  const executePocketCubeCapture = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/arcade/poketanjel-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUsername,
          targetMonstarName: "Void_Brimstone_Golem",
          rawFrequencyHz: 444
        })
      });
      const data = await response.json();
      if (data.success) {
        setTickerLog(data.message);
        // Refresh local journal records buffer array
        socket.emit('request_poketanjel_dex_snapshot', { username: currentUsername });
      }
    } catch (e) {
      console.error("Failed to execute Pocket Cube capture loop:", e);
    } finally {
      setIsProcessing(false);
    }
  };

  const executeLibWebDatabaseSync = async () => {
    try {
      const response = await fetch('/api/arcade/poketanjel-lib-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUsername })
      });
      const data = await response.json();
      if (data.success) {
        alert(`📚 Lib-Web Sync Complete!\nUploaded ${data.synchronizedSpiritsCount} purified spirits to Master Database.\nGranted: +${data.tokenPayoutGranted} Angel Tokens!`);
        setJournalLog([]);
        setTickerLog('Demadek journal buffer successfully synchronized with global databases.');
      }
    } catch (e) {
      console.error("Lib-Web database synchronization connection drop:", e);
    }
  };

  return (
    <div className="storefront-overlay-wrapper" style={{
      top: '10%', left: '24px', width: '360px', maxHeight: '82%',
      background: '#22c55e', // Classic Gameboy Olive Green casing tint
      border: '6px solid #166534', borderRadius: '24px', padding: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.8)', color: '#0f172a', fontFamily: 'monospace'
    }}>
      {/* --- RETRO LCD DOT-MATRIX SCREEN SECTION --- */}
      <div style={{
        background: '#859a51', width: '100%', height: '140px', border: '3px solid #455227',
        borderRadius: '8px', padding: '10px', boxSizing: 'border-box', position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: '#1c240c' }}>
          <span>👤 Asher [CatchEMP]</span>
          <span>🛸 Dreidel: Lvl 44</span>
        </div>
        
        {/* Dynamic Action Screen Output */}
        <div style={{ marginTop: '10px', fontSize: '11px', lineHeight: 1.3, color: '#0f172a', textAlign: 'left', fontWeight: 'bold' }}>
          "{tickerMessage}"
        </div>

        {/* Small battery simulation LED light indicator */}
        <div style={{ position: 'absolute', left: '6px', bottom: '6px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc2626', boxShadow: '0 0 4px #dc2626' }} />
      </div>

      {/* --- DEMADEK AUTOFILLER JOURNAL PREVIEW --- */}
      <div style={{ marginTop: '10px', textAlign: 'left' }}>
        <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#14532d', display: 'block', marginBottom: '4px' }}>
          📖 Demadek Autofiller Buffer ({journalLog.length})
        </span>
        <div style={{ background: '#4ade80', borderRadius: '6px', padding: '6px', height: '6px', maxHeight: '80px', overflowY: 'auto', fontSize: '10px', color: '#14532d', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {journalLog.length > 0 ? journalLog.map((entry, i) => (
            <div key={i}>• {entry.name} ({entry.originalSpectralHz}Hz) -> <span style={{ fontWeight: 'bold' }}>GOOD_LIGHTCODE</span></div>
          )) : <div style={{ fontStyle: 'italic' }}>No pending captures in local journal memory...</div>}
        </div>
      </div>

      {/* --- RETRO GAMEBOY DIRECTIONAL BUTTON CONTROLS GRID --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <button onClick={executePocketCubeCapture} disabled={isProcessing} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: '50%', width: '55px', height: '55px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px', boxShadow: '0 4px #020617' }}>
          {isProcessing ? 'Cube...' : 'THROW\nCUBE'}
        </button>

        <button onClick={executeLibWebDatabaseSync} style={{ background: '#166534', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          📚 LIB-WEB\nSYNC
        </button>
      </div>
    </div>
  );
}
