import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PocketDimensionScene({ missionLocation = "HERMON_SUMMIT", clockRef }) {
  const portalRef = useRef();
  const sealingChainRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Rotate the spatial containment anomaly field mesh
    if (portalRef.current) {
      portalRef.current.rotation.z = -time * 0.4;
      portalRef.current.position.y = 2.5 + Math.sin(time * 2) * 0.15;
    }

    // 2. Animate binding lines tracking down to the desert anomaly pit (Dudael containment grid)
    if (sealingChainRef.current && missionLocation === "DUDAEL_PIT") {
      sealingChainRef.current.scale.y = 1.0 + Math.sin(time * 6) * 0.05;
      sealingChainRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group>
      {/* Dynamic atmospheric lighting matrix suited for ancient temporal spaces */}
      <ambientLight intensity={0.2} color="#1e1b4b" />
      <pointLight position={[0, 4, -5]} intensity={2.5} color="#c084fc" castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#38bdf8" />

      {/* --- ENVIRONMENT FLOORING --- */}
      {missionLocation === "HERMON_SUMMIT" ? (
        // Snowy high-altitude peak model environment setup meshes
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} metalness={0.1} />
        </mesh>
      ) : (
        // Desert layout setup for Dudael Pit boundaries
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
      )}

      {/* --- DYNAMIC INTERACTIVE MATRIX ANOMALIES MESHES --- */}
      {/* The Central Temporal Horizon Portal Rift */}
      <mesh ref={portalRef} position={[0, 2.5, -8]} castShadow>
        <torusGeometry args={[1.5, 0.15, 16, 100]} />
        <meshStandardMaterial color="#a855f7" emissive="#9333ea" emissiveIntensity={3} wireframe />
      </mesh>

      {/* Target Mission Interaction Structure Node (Azazel Constraint Cage in Dudael) */}
      {missionLocation === "DUDAEL_PIT" && (
        <group position={[0, 0.1, -8]}>
          {/* Containment Hole Geometry */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 1.8, 32]} />
            <meshStandardMaterial color="#1c1917" roughness={1.0} />
          </mesh>
          {/* Sealing Energy Matrix Pillar */}
          <mesh ref={sealingChainRef} position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 3, 12, 1, true]} />
            <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={4} wireframe />
          </mesh>
        </group>
      )}

      {/* Mount ancient visual markers (Like mountain spikes or ritual stones) */}
      <mesh position={[-6, 1, -10]} castShadow>
        <coneGeometry args={[0.5, 2, 6]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>
      <mesh position={[6, 1, -10]} castShadow>
        <coneGeometry args={[0.5, 2, 6]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>
    </group>
  );
}
