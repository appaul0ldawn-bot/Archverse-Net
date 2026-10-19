import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function ChristEffectsEngine({ playerPositionVector, socket }) {
  const crossBeamRef = useRef();
  const [activeGlimmer, setActiveGlimmer] = useState(null);

  // 1. Intercept real-time predictive oracle pulses from the server
  useEffect(() => {
    socket.on('glimmer_manifested', (glimmerText) => {
      setActiveGlimmer(glimmerText);
      // Auto-expire the vision overlay window after 5 seconds visibility
      setTimeout(() => setActiveGlimmer(null), 5000);
    });
    return () => socket.off('glimmer_manifested');
  }, [socket]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 2. Animate the Crystalline Beam of Light over the center grid
    if (crossBeamRef.current) {
      crossBeamRef.current.rotation.y = time * 0.1;
      // Soft breathing pulse expansion logic
      crossBeamRef.current.scale.x = 1.0 + Math.sin(time * 2) * 0.05;
      crossBeamRef.current.scale.z = 1.0 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group>
      {/* 🏛️ THE DYNAMIC BEAM OF MESSIAH (Centerpiece light for New Jerusalem) */}
      <mesh ref={crossBeamRef} position={[0, 25, 0]}>
        <cylinderGeometry args={[2, 4, 50, 16, 1, true]} />
        <meshStandardMaterial 
          color="#fef08a" 
          emissive="#fbbf24" 
          emissiveIntensity={3} 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 👁️ ORACLE HUD GLIMMER PANEL VISUAL OVERLAY */}
      {activeGlimmer && (
        <Html center position={[playerPositionVector.x, playerPositionVector.y + 3.5, playerPositionVector.z]} distanceFactor={8}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(234,179,8,0.2) 100%)',
            border: '2px dashed #eab308', borderRadius: '12px', padding: '12px 16px',
            color: '#fff', fontSize: '11px', width: '260px', fontFamily: 'sans-serif',
            boxShadow: '0 0 15px rgba(234,179,8,0.4)', textAlign: 'center'
          }}>
            {activeGlimmer}
          </div>
        </Html>
      )}
    </group>
  );
}
