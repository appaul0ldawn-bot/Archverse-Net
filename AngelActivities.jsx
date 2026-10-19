
Angel Activity Reports & Counseling Guild Blog Ledger

For high-ranking players and Counseling Guilds, the Archverse provides a formal text submission interface. This acts as both a checklist for daily activities and a manual reporting blog to record regional matrix ripples.
jsx
import React, { useState } from 'react';

export function GuildReportLedger({ userRank }) {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState('');
  
  // Guard Constraint: Only allow Archangels and Council ranks to write reports
  const isAuthorized = ['Archangel', 'Council'].includes(userRank);

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!newReport.trim() || !isAuthorized) return;

    setReports([
      ...reports,
      {
        id: Date.now(),
        author: `Elder Node`,
        text: newReport.trim(),
        timestamp: new Date().toLocaleDateString()
      }
    ]);
    setNewReport('');
  };

  return (
    <div className="chat-log-sidebar" style={{ top: '48%', maxHeight: '35%', width: '340px' }}>
      <div className="dashboard-section-title">📜 Counseling Guild Ledger</div>
      
      {/* Daily Activity Checklist */}
      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
        ☑ [ ] Align 3 Proximity Pillars • [ ] Clear Local Shadow Ripple
      </div>

      <div style={{ overflowY: 'auto', flex: 1, marginBottom: '8px' }}>
        {reports.map(r => (
          <div key={r.id} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '6px', marginBottom: '6px' }}>
            <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>[{r.timestamp}] {r.author}:</span> {r.text}
          </div>
        ))}
      </div>

      {isAuthorized ? (
        <form onSubmit={handleSubmitReport} style={{ display: 'flex', gap: '4px' }}>
          <input 
            type="text" 
            value={newReport} 
            onChange={(e) => setNewReport(e.target.value)} 
            placeholder="Log manual manifestation report..." 
            style={{ flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', padding: '6px', fontSize: '12px' }}
          />
          <button type="submit" className="buy-upgrade-btn" style={{ padding: '4px 8px' }}>Log</button>
        </form>
      ) : (
        <div style={{ fontSize: '10px', color: '#64748b', textAlign: 'center' }}>🔒 Manual reporting locked to High Council Ranks</div>
      )}
    </div>
  );
}
