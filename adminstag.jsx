
Admin Staging Log Review Console HUD Component

For developer and admin views, mount this translucent log aggregator panel directly over the UI layout matrix. It streams incoming telemetry lines in real-time, allowing you to instantly catch WebSockets latency drops, WebRTC peer failures, or unauthorized asset injection attempts:
jsx
import React, { useEffect, useState, useRef } from 'react';

export function StagingLogReviewHUD({ socket }) {
  const [liveLogs, setLiveLogs] = useState([]);
  const [filterLevel, setFilterLevel] = useState('ALL');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Intercept telemetry snapshot pulses emitted down via the 22Hz central server loop
    socket.on('telemetry_pulse', (newLogLine) => {
      setLiveLogs((prev) => [...prev, newLogLine].slice(-100)); // Cap local console buffer at 100 rows
    });

    return () => socket.off('telemetry_pulse');
  }, [socket]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [liveLogs]);

  const filteredData = liveLogs.filter(log => filterLevel === 'ALL' || log.level === filterLevel);

  return (
    <div className="chat-log-sidebar" style={{ top: '68%', left: '24px', width: '320px', maxHeight: '25%', borderColor: '#ef4444' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '11px', color: '#f87171', fontWeight: 700 }}>🛠️ CLIENT PIPELINE TELEMETRY</span>
        <select 
          value={filterLevel} 
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{ background: '#0f172a', color: '#fff', fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}
        >
          <option value="ALL">All</option>
          <option value="EXCEPTION">Exceptions</option>
          <option value="SECURITY">Security</option>
        </select>
      </div>

      <div ref={scrollContainerRef} style={{ overflowY: 'auto', flex: 1, fontFamily: 'monospace', fontSize: '11px' }}>
        {filteredData.map((log, index) => (
          <div key={index} style={{ marginBottom: '4px', color: log.level === 'EXCEPTION' ? '#f87171' : log.level === 'SECURITY' ? '#fbbf24' : '#e2e8f0' }}>
            <span>[{log.level}]</span> <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
