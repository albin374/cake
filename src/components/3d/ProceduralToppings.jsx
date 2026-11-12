import React, { useMemo } from 'react';
import * as THREE from 'three';

// 3D Procedural Strawberry
export const Strawberry3D = () => {
  // Organic, bakery-proportioned strawberry lathe profile
  const strawberryGeom = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.001, 0.001),
      new THREE.Vector2(0.045, 0.04),
      new THREE.Vector2(0.105, 0.12),
      new THREE.Vector2(0.155, 0.22),
      new THREE.Vector2(0.165, 0.27),
      new THREE.Vector2(0.14, 0.33),
      new THREE.Vector2(0.08, 0.36),
      new THREE.Vector2(0.001, 0.36)
    ];
    const lathe = new THREE.LatheGeometry(pts, 24);
    lathe.computeVertexNormals();
    return lathe;
  }, []);

  return (
    <group dispose={null} rotation={[-0.08, 0, 0.06]}>
      {/* Plump Tapered Berry Body */}
      <mesh geometry={strawberryGeom} castShadow>
        <meshPhysicalMaterial
          color="#D80027"
          roughness={0.28}
          metalness={0.02}
          clearcoat={0.35}
          clearcoatRoughness={0.25}
        />
      </mesh>
      {/* Calyx 5-leaf star draping over shoulder */}
      <group position={[0, 0.35, 0]}>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <mesh
            key={i}
            rotation={[0.35, (deg * Math.PI) / 180, -0.45]}
            position={[0, 0, 0]}
            castShadow
          >
            <coneGeometry args={[0.06, 0.16, 5]} />
            <meshStandardMaterial color="#245A38" roughness={0.65} />
          </mesh>
        ))}
        {/* Curving Stem */}
        <mesh position={[0, 0.08, 0]} rotation={[0.1, 0, 0.15]} castShadow>
          <cylinderGeometry args={[0.02, 0.025, 0.14, 8]} />
          <meshStandardMaterial color="#194228" roughness={0.7} />
        </mesh>
      </group>
      {/* Golden Achene Seeds on Berry Surface */}
      {[
        [0.12, 0.26, 0.08],
        [-0.12, 0.26, 0.08],
        [0, 0.22, 0.15],
        [0.13, 0.28, -0.07],
        [-0.13, 0.28, -0.07],
        [0.08, 0.14, 0.09],
        [-0.08, 0.14, 0.09],
        [0.06, 0.18, -0.11],
        [-0.06, 0.18, -0.11]
      ].map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// 3D Procedural Raspberry
export const Raspberry3D = () => {
  // Cluster of 16 drupelets in hollow cone arrangement
  const drupelets = useMemo(() => {
    const list = [];
    const layers = [
      { y: 0.06, r: 0.11, count: 6 },
      { y: 0.15, r: 0.14, count: 7 },
      { y: 0.24, r: 0.12, count: 6 },
      { y: 0.31, r: 0.06, count: 3 }
    ];
    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (2 * Math.PI / layer.count) * i + layer.y;
        list.push([
          Math.cos(angle) * layer.r,
          layer.y,
          Math.sin(angle) * layer.r
        ]);
      }
    });
    return list;
  }, []);

  return (
    <group dispose={null}>
      {drupelets.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshPhysicalMaterial
            color="#C2185B"
            roughness={0.3}
            metalness={0.05}
            clearcoat={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// 3D Procedural Blueberry Cluster
export const Blueberry3D = () => {
  return (
    <group dispose={null}>
      {/* Main Front Berry */}
      <group position={[0.04, 0.095, 0.02]}>
        <mesh castShadow>
          <sphereGeometry args={[0.11, 24, 20]} />
          <meshPhysicalMaterial
            color="#222C54"
            roughness={0.6}
            metalness={0.08}
            clearcoat={0.15}
          />
        </mesh>
        {/* Star Indentation */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.035, 0.015, 0.025, 5]} />
          <meshStandardMaterial color="#10152B" roughness={0.9} />
        </mesh>
      </group>
      {/* Secondary Companion Berry */}
      <group position={[-0.08, 0.085, -0.03]}>
        <mesh castShadow>
          <sphereGeometry args={[0.095, 20, 16]} />
          <meshPhysicalMaterial
            color="#2D3B72"
            roughness={0.6}
            metalness={0.08}
            clearcoat={0.15}
          />
        </mesh>
        <mesh position={[0, 0.088, 0]}>
          <cylinderGeometry args={[0.03, 0.015, 0.02, 5]} />
          <meshStandardMaterial color="#10152B" roughness={0.9} />
        </mesh>
      </group>
      {/* Third Accent Berry */}
      <group position={[0.02, 0.075, 0.09]}>
        <mesh castShadow>
          <sphereGeometry args={[0.08, 18, 14]} />
          <meshPhysicalMaterial
            color="#1F284C"
            roughness={0.6}
            metalness={0.08}
            clearcoat={0.15}
          />
        </mesh>
      </group>
    </group>
  );
};

// 3D Procedural Glossy Twin Cherries
export const Cherry3D = () => {
  return (
    <group dispose={null}>
      {/* Left Cherry Body */}
      <mesh castShadow position={[-0.11, 0.12, 0]}>
        <sphereGeometry args={[0.13, 24, 20]} />
        <meshPhysicalMaterial
          color="#850000"
          roughness={0.1}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
        />
      </mesh>
      {/* Right Cherry Body */}
      <mesh castShadow position={[0.11, 0.115, 0.03]}>
        <sphereGeometry args={[0.125, 24, 20]} />
        <meshPhysicalMaterial
          color="#940000"
          roughness={0.1}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
        />
      </mesh>
      {/* Slender Arched Green Stems joining at top */}
      <mesh position={[-0.05, 0.28, 0.01]} rotation={[0, 0, -0.34]} castShadow>
        <cylinderGeometry args={[0.014, 0.016, 0.32, 8]} />
        <meshStandardMaterial color="#326014" roughness={0.6} />
      </mesh>
      <mesh position={[0.05, 0.28, 0.02]} rotation={[0, 0, 0.34]} castShadow>
        <cylinderGeometry args={[0.014, 0.016, 0.32, 8]} />
        <meshStandardMaterial color="#326014" roughness={0.6} />
      </mesh>
      {/* Joint node */}
      <mesh position={[0, 0.44, 0.015]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#254A0E" roughness={0.7} />
      </mesh>
    </group>
  );
};

// 3D Procedural French Macaron
export const Macaron3D = () => {
  return (
    <group dispose={null}>
      {/* Bottom Shell */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#FF9BBB" roughness={0.4} />
      </mesh>
      {/* Bottom Pied (Ruffled skirt) */}
      <mesh castShadow position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.035, 12, 24]} />
        <meshStandardMaterial color="#E85B91" roughness={0.7} />
      </mesh>
      {/* Cream Filling Layer */}
      <mesh castShadow position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.07, 24]} />
        <meshStandardMaterial color="#FFF9F3" roughness={0.6} />
      </mesh>
      {/* Top Pied (Ruffled skirt) */}
      <mesh castShadow position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.035, 12, 24]} />
        <meshStandardMaterial color="#E85B91" roughness={0.7} />
      </mesh>
      {/* Top Shell */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#FF9BBB" roughness={0.4} />
      </mesh>
    </group>
  );
};

// 3D Procedural Celebration Candle
export const Candle3D = () => {
  return (
    <group dispose={null}>
      {/* Golden Candle Stick */}
      <mesh castShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.84, 16]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      {/* Wick */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>
      {/* Candle Flame */}
      <mesh position={[0, 0.98, 0]}>
        <coneGeometry args={[0.06, 0.18, 12]} />
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#F59E0B"
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>
      {/* Flame Inner Core */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={2.5}
        />
      </mesh>
    </group>
  );
};

// 3D Procedural Chocolate Curls
export const ChocolateCurls3D = () => {
  return (
    <group dispose={null} rotation={[0.4, 0.3, 0]}>
      <mesh castShadow position={[0, 0.15, 0]}>
        <torusGeometry args={[0.22, 0.07, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#3E2016"
          roughness={0.25}
          metalness={0.08}
        />
      </mesh>
      {/* Second Inner Curl */}
      <mesh castShadow position={[0.08, 0.16, 0.06]} rotation={[0.5, 0.4, 0]}>
        <torusGeometry args={[0.15, 0.045, 12, 24, Math.PI * 1.3]} />
        <meshStandardMaterial
          color="#4E2B1E"
          roughness={0.25}
          metalness={0.08}
        />
      </mesh>
    </group>
  );
};

// 3D Procedural Buttercream Flower Rose
export const ButtercreamFlower3D = () => {
  return (
    <group dispose={null}>
      {/* Central Bud */}
      <mesh castShadow position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#E11D48" roughness={0.45} />
      </mesh>
      {/* Inner Petals */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <mesh
          key={`in-${i}`}
          position={[
            Math.cos((deg * Math.PI) / 180) * 0.12,
            0.14,
            Math.sin((deg * Math.PI) / 180) * 0.12
          ]}
          rotation={[0.3, (deg * Math.PI) / 180, 0.4]}
          castShadow
        >
          <sphereGeometry args={[0.11, 12, 10, 0, Math.PI]} />
          <meshStandardMaterial color="#FB7185" roughness={0.45} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Outer Petals */}
      {[36, 108, 180, 252, 324].map((deg, i) => (
        <mesh
          key={`out-${i}`}
          position={[
            Math.cos((deg * Math.PI) / 180) * 0.22,
            0.1,
            Math.sin((deg * Math.PI) / 180) * 0.22
          ]}
          rotation={[0.5, (deg * Math.PI) / 180, 0.5]}
          castShadow
        >
          <sphereGeometry args={[0.16, 12, 10, 0, Math.PI]} />
          <meshStandardMaterial color="#FDA4AF" roughness={0.45} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

// 3D Procedural Satin Ribbon Bow
export const Bow3D = () => {
  return (
    <group dispose={null}>
      {/* Central Knot */}
      <mesh castShadow position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.09, 14, 14]} />
        <meshStandardMaterial color="#E85B91" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Left Loop */}
      <mesh castShadow position={[-0.2, 0.2, 0]} rotation={[0, 0, 0.4]}>
        <torusGeometry args={[0.18, 0.05, 12, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#FF75A0" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Right Loop */}
      <mesh castShadow position={[0.2, 0.2, 0]} rotation={[0, 0, -0.4]}>
        <torusGeometry args={[0.18, 0.05, 12, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#FF75A0" roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Ribbon Tails */}
      <mesh castShadow position={[-0.14, 0.06, 0.05]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.04, 0.06, 0.26, 8]} />
        <meshStandardMaterial color="#C83E73" roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0.14, 0.06, 0.05]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.04, 0.06, 0.26, 8]} />
        <meshStandardMaterial color="#C83E73" roughness={0.3} />
      </mesh>
    </group>
  );
};

// 3D Procedural Glistening Sugar Pearls
export const SugarPearls3D = () => {
  return (
    <group dispose={null}>
      <mesh castShadow position={[-0.08, 0.12, 0.04]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.35} />
      </mesh>
      <mesh castShadow position={[0.1, 0.14, -0.04]}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color="#FEF3C7" roughness={0.1} metalness={0.4} />
      </mesh>
      <mesh castShadow position={[0.02, 0.09, 0.12]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#FCE7F3" roughness={0.1} metalness={0.3} />
      </mesh>
    </group>
  );
};

// 3D Procedural Rainbow Sprinkles
export const Sprinkles3D = () => {
  const sprinkles = [
    { pos: [-0.15, 0.03, 0.1], rot: [0.2, 0.5, 0.8], col: '#E85B91' },
    { pos: [0.12, 0.03, -0.1], rot: [0.4, -0.6, 0.2], col: '#3B82F6' },
    { pos: [-0.05, 0.03, -0.15], rot: [-0.3, 0.8, -0.4], col: '#F59E0B' },
    { pos: [0.18, 0.03, 0.08], rot: [0.6, 0.2, 0.9], col: '#10B981' },
    { pos: [-0.18, 0.03, -0.05], rot: [0.1, -0.4, 0.3], col: '#8B5CF6' },
    { pos: [0.02, 0.03, 0.18], rot: [0.5, 0.6, -0.7], col: '#EF4444' }
  ];

  return (
    <group dispose={null}>
      {sprinkles.map((s, idx) => (
        <mesh key={idx} position={s.pos} rotation={s.rot} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial color={s.col} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// 3D Procedural Kiwi Slice
export const SugarFruits3D = () => {
  return (
    <group dispose={null} rotation={[Math.PI / 2, 0, 0]}>
      {/* Outer Skin Rim */}
      <mesh castShadow position={[0, 0, 0.04]}>
        <cylinderGeometry args={[0.26, 0.26, 0.05, 24]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.7} />
      </mesh>
      {/* Translucent Green Pulp */}
      <mesh position={[0, 0, 0.045]}>
        <cylinderGeometry args={[0.24, 0.24, 0.055, 24]} />
        <meshStandardMaterial color="#84CC16" roughness={0.3} />
      </mesh>
      {/* Inner Pale Center */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
        <meshStandardMaterial color="#FEF9C3" roughness={0.4} />
      </mesh>
    </group>
  );
};

// 3D Procedural Whipped Cream Dollop / Rosette
export const WhippedCream3D = () => {
  return (
    <group dispose={null}>
      <mesh castShadow position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#FFFDF9" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.24, 0]}>
        <coneGeometry args={[0.12, 0.22, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
    </group>
  );
};

/**
 * Universal Dynamic Topping Renderer
 */
export const ProceduralTopping = ({ id }) => {
  switch (id) {
    case 'strawberry':
      return <Strawberry3D />;
    case 'raspberry':
      return <Raspberry3D />;
    case 'blueberry':
      return <Blueberry3D />;
    case 'cherry':
      return <Cherry3D />;
    case 'sugar_fruits':
      return <SugarFruits3D />;
    case 'macaron':
      return <Macaron3D />;
    case 'candle':
      return <Candle3D />;
    case 'chocolate_curls':
      return <ChocolateCurls3D />;
    case 'buttercream_flower':
      return <ButtercreamFlower3D />;
    case 'bow':
      return <Bow3D />;
    case 'sugar_pearls':
      return <SugarPearls3D />;
    case 'sprinkles':
      return <Sprinkles3D />;
    case 'piping_rosette':
      return <ButtercreamFlower3D />;
    case 'whipped_cream':
      return <WhippedCream3D />;
    default:
      return <Strawberry3D />;
  }
};
