
3D Ghost Spirit Animal & NPC Pathfinders

This React Three Fiber component draws your personalized Spirit Animal Companion as a translucent, floating mesh that orbits your avatar. It includes a bounding text tag that delivers ancient wisdom tips customized to your profile's elemental alignment:
jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const ZODIAC_WISDOM = {
  Fire: "Phoenix energy detected. Your path requires action—disrupt stagnancy at the grid lines to manifest tokens.",
  Earth: "Stag affinity locked. Stand firm. Meditate near the ancient temple structures to pull alignment matrix markers.",
  Water: "Deep currents moving. Follow the low frequencies. A hidden shadow ripple is forming 20 meters west.",
  Air: "Cosmic clarity active. Rise above the density loops. Look to the northern horizon line for light contracts."
};

export function SpiritGuideCompanion({ playerPosition, zodiacElement, guideName }) {
  const guideRef = useRef();
  const [showTip, setShowTip] = useState(false);

  useFrame((state) => {
    if (!guideRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Math Floating Routine: Orbit character softly like a hovering ghost entity
    const radius = 1.4;
    const orbitX = playerPosition[0] + Math.cos(time * 1.5) * radius;
    const orbitZ = playerPosition[2] + Math.sin(time * 1.5) * radius;
    const floatY = playerPosition[1] + 1.8 + Math.sin(time * 3) * 0.25; // Hovers at eye level

    guideRef.current.position.set(orbitX, floatY, orbitZ);
    guideRef.current.rotation.y = -time * 1.5 + Math.PI / 2; // Face forward along orbit vectors
  });

  return (
    <group ref={guideRef} onClick={() => setShowTip(!showTip)}>
      {/* 2. Holographic Glow Asset Shader */}
      <mesh castShadow>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial 
          color={zodiacElement === 'Fire' ? '#f97316' : '#60a5fa'} 
          transparent 
          opacity={0.4} 
          emissive={zodiacElement === 'Fire' ? '#ea580c' : '#2563eb'}
          emissiveIntensity={3}
          wireframe
        />
      </mesh>

      {/* 3. Floating Ancestral Guidance Dialogue Overlay */}
      {showTip && (
        <Html position={[0, 0.4, 0]} center distanceFactor={8}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1.5px solid #fbbf24',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#fff',
            fontFamily: 'serif',
            fontSize: '12px',
            width: '200px',
            boxShadow: '0 10px 15px rgba(0,0,0,0.5)'
          }}>
            <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '4px' }}>
              🐾 {guideName} ({zodiacElement}):
            </strong>
            "{ZODIAC_WISDOM[zodiacElement]}"
          </div>
        </Html>
      )}
    </group>
  );
}
