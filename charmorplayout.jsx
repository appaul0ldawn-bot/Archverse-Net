
The Updated 3D Character Morph Render Layout

Update the mesh architecture inside your AnimatedAvatarMesh view to read these calculation fields and structurally project the physical alignment manifestations:
jsx
import React from 'react';

export function EvolvingMoralAvatar({ morphTarget, playerColor }) {
  return (
    <group>
      {/* Primary Torso Capsule Bounding Box Layer */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.9, 0.4]} />
        <meshStandardMaterial color={playerColor} roughness={0.5} />
      </mesh>

      {/* Head Element Node */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#ffdbb5" />
      </mesh>

      {/* 😇 ANGELIC MORPH TARGET: Glowing Halo Mesh Ring */}
      {morphTarget.halo > 0 && (
        <mesh position={[0, 2.15, 0]} scale={[morphTarget.halo, 1, morphTarget.halo]}>
          <torusGeometry args={[0.22, 0.02, 8, 24]} />
          <meshStandardMaterial color="#fde047" emissive="#fbbf24" emissiveIntensity={2.5} />
        </mesh>
      )}

      {/* 👿 DEMONIC MORPH TARGET: Horns Geometry Pair */}
      {morphTarget.horns > 0 && (
        <group position={[0, 1.95, 0]}>
          {/* Left Horn Spike Cone */}
          <mesh position={[-0.15, 0.15, 0.05]} rotation={[0, 0, 0.4]} scale={[1, morphTarget.horns, 1]}>
            <coneGeometry args={[0.06, 0.3, 8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
          {/* Right Horn Spike Cone */}
          <mesh position={[0.15, 0.15, 0.05]} rotation={[0, 0, -0.4]} scale={[1, morphTarget.horns, 1]}>
            <coneGeometry args={[0.06, 0.3, 8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}
