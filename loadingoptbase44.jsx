
Custom glTF Asset Loading Optimization for Base44

When embedding the Archverse within your custom site layout on Base44, heavy 3D assets (like angelic wings or temple structures) can stall the page initialization cycle.
Use this loader configuration inside your React Three Fiber setup to display a smooth, translucent glassmorphic countdown wheel while the vector coordinates unpack in the background:
jsx
import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export function ArchverseCanvasLoader() {
  // Capture loading metrics from the core WebGL engine thread loop
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(234, 179, 8, 0.3)',
        borderRadius: '16px',
        padding: '20px 32px',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        minWidth: '200px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#eab308', borderRadius: '50%', margin: '0 auto 12px auto',
          animation: 'spin 1s linear infinite'
        }} />
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#eab308' }}>Constructing Grid...</h4>
        <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>
          {progress.toFixed(0)}% Manifested
        </p>

        {/* Local embedded style to animate the spinner cleanly */}
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </Html>
  );
}
