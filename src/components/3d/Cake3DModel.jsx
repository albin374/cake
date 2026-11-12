import React, { useMemo } from 'react';
import * as THREE from 'three';
import { FROSTING_COLORS, SIZE_PRICES } from '../../data/cakePrices';
import {
  getButtercreamTopTexture,
  getButtercreamSideTexture,
  getMarbleTexture
} from '../../utils/textureGenerator';

/**
 * Dimensions based on cake weight size (0.5kg, 1kg, 1.5kg, 2kg, 3kg)
 */
export const getCakeDimensions = (size = '1') => {
  const sizeConfig = SIZE_PRICES[size] || { multiplier: 1.0 };
  const mult = sizeConfig.multiplier || 1.0;
  // Scaled bakery proportions: classic tall bakery tier
  const scale = 0.88 + (mult - 0.8) * 0.22;
  const radius = 1.5 * scale;
  const height = 1.3 * Math.sqrt(scale);
  const boardRadius = radius * 1.36;
  const boardThickness = 0.08;
  return { scale, radius, height, boardRadius, boardThickness };
};

/**
 * Creates 2D profile shapes for non-cylindrical cakes
 */
const createExtrudedCakeShape = (shapeType = 'square', scale = 1) => {
  const shape = new THREE.Shape();

  if (shapeType === 'square') {
    const w = 2.6 * scale;
    const h = 2.6 * scale;
    const r = 0.3 * scale;
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  } else if (shapeType === 'heart') {
    const s = scale * 1.35;
    const cy = -0.05 * s;
    shape.moveTo(0, -1.25 * s - cy);
    shape.bezierCurveTo(-0.2 * s, -0.65 * s - cy, -1.65 * s, 0.2 * s - cy, -1.65 * s, 0.8 * s - cy);
    shape.bezierCurveTo(-1.65 * s, 1.35 * s - cy, -0.85 * s, 1.6 * s - cy, 0, 0.9 * s - cy);
    shape.bezierCurveTo(0.85 * s, 1.6 * s - cy, 1.65 * s, 1.35 * s - cy, 1.65 * s, 0.8 * s - cy);
    shape.bezierCurveTo(1.65 * s, 0.2 * s - cy, 0.2 * s, -0.65 * s - cy, 0, -1.25 * s - cy);
  } else if (shapeType === 'rectangle') {
    const w = 3.2 * scale;
    const h = 2.2 * scale;
    const r = 0.25 * scale;
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  }

  return shape;
};

export const Cake3DModel = ({
  shape = 'round',
  size = '1',
  flavour = 'vanilla',
  frosting = 'vanilla',
  frostingColor = 'pink',
  icingStyle = 'smooth',
  onCakePointerDown,
  onPointerMove,
  onPointerLeave
}) => {
  const { scale, radius, height, boardRadius, boardThickness } = useMemo(
    () => getCakeDimensions(size),
    [size]
  );

  // Top surface is exactly at height / 2
  const topY = height / 2;
  const bottomY = -height / 2;
  const boardY = bottomY - boardThickness / 2;

  // Resolve frosting hex color
  const hexColor = useMemo(() => {
    const found = FROSTING_COLORS.find(
      (c) => c.id === frostingColor || c.hex.toLowerCase() === frostingColor?.toLowerCase()
    );
    return found ? found.hex : frostingColor || '#FFD6E5';
  }, [frostingColor]);

  // Procedural Spatula & Normal Textures
  const topNormalMap = useMemo(() => getButtercreamTopTexture(), []);
  const sideNormalMap = useMemo(() => getButtercreamSideTexture(), []);
  const marbleMap = useMemo(() => getMarbleTexture(), []);

  // Main Cake Geometry (ROUND CYLINDER as Core)
  const isRound = shape === 'round';

  const { nonRoundGeometry, borderPoints } = useMemo(() => {
    if (isRound) {
      // 36 evenly spaced perimeter points around circular rim
      const pts = [];
      const numPoints = 36;
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        pts.push({
          x: Math.cos(theta) * radius,
          z: Math.sin(theta) * radius,
          y: topY
        });
      }
      return { nonRoundGeometry: null, borderPoints: pts };
    }

    // Extruded geometry for square, heart, rectangle
    const shapeObj = createExtrudedCakeShape(shape, scale);
    const geom = new THREE.ExtrudeGeometry(shapeObj, {
      depth: height,
      curveSegments: 32,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.04 * scale,
      bevelThickness: 0.03 * scale
    });
    geom.rotateX(-Math.PI / 2);
    geom.center();

    const shapePts = shapeObj.getSpacedPoints(shape === 'rectangle' ? 44 : 36);
    const pts = shapePts.map((p) => ({
      x: p.x,
      z: -p.y,
      y: topY
    }));

    return { nonRoundGeometry: geom, borderPoints: pts };
  }, [isRound, shape, scale, radius, height, topY]);

  // Gourmet Chocolate Drip drops data
  const dripDrops = useMemo(() => {
    if (icingStyle !== 'drip') return [];
    return borderPoints.map((pt, i) => {
      const seed = Math.sin(i * 1.6 + 0.3) * 0.5 + 0.5;
      const dripLength = 0.16 + seed * 0.48 * scale;
      return {
        x: pt.x * 0.992,
        z: pt.z * 0.992,
        y: topY - dripLength / 2,
        length: dripLength
      };
    });
  }, [icingStyle, borderPoints, topY, scale]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. CIRCULAR CAKE BOARD (Centralized, NO golden line) */}
      <group position={[0, boardY, 0]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[boardRadius, boardRadius * 1.005, boardThickness, 64]} />
          <meshStandardMaterial
            map={marbleMap}
            roughness={0.3}
            metalness={0.04}
            color="#FFFFFF"
          />
        </mesh>
      </group>

      {/* 2. MAIN CAKE TIER */}
      {isRound ? (
        <group>
          {/* Complete Cylindrical Round Cake with proper Three.js CylinderGeometry */}
          <mesh
            castShadow
            receiveShadow
            onPointerDown={onCakePointerDown}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            <cylinderGeometry args={[radius, radius, height, 64, 16]} />
            {/* Multi-material: [side, top, bottom] */}
            <meshPhysicalMaterial
              attach="material-0"
              color={hexColor}
              normalMap={sideNormalMap}
              normalScale={new THREE.Vector2(0.24, 0.24)}
              roughness={0.44}
              metalness={0.0}
              clearcoat={0.12}
              clearcoatRoughness={0.35}
            />
            <meshPhysicalMaterial
              attach="material-1"
              color={hexColor}
              normalMap={topNormalMap}
              normalScale={new THREE.Vector2(0.2, 0.2)}
              roughness={0.46}
              metalness={0.0}
              clearcoat={0.08}
              clearcoatRoughness={0.4}
            />
            <meshStandardMaterial
              attach="material-2"
              color="#F0E8DD"
              roughness={0.8}
            />
          </mesh>

          {/* Smooth Rounded Edge: Soft fillet around the top rim (same frosting material) */}
          <mesh position={[0, topY - 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius - 0.02, 0.035, 16, 64]} />
            <meshPhysicalMaterial
              color={hexColor}
              roughness={0.44}
              metalness={0.0}
              clearcoat={0.1}
              clearcoatRoughness={0.35}
            />
          </mesh>
        </group>
      ) : (
        /* Extruded Non-Round Tiers (Square, Heart, Rectangle) */
        <mesh
          geometry={nonRoundGeometry}
          castShadow
          receiveShadow
          onPointerDown={onCakePointerDown}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <meshPhysicalMaterial
            color={hexColor}
            normalMap={topNormalMap}
            normalScale={new THREE.Vector2(0.22, 0.22)}
            roughness={0.46}
            metalness={0.0}
            clearcoat={0.1}
            clearcoatRoughness={0.35}
          />
        </mesh>
      )}

      {/* 3. ICING BORDER STYLES */}
      {/* (A) White Pearl Border */}
      {icingStyle === 'pearl_border' && (
        <group>
          {borderPoints.map((pt, i) => (
            <mesh key={`pearl-${i}`} position={[pt.x, topY + 0.03, pt.z]} castShadow>
              <sphereGeometry args={[0.045 * scale, 16, 16]} />
              <meshPhysicalMaterial
                color="#FFFDF5"
                roughness={0.18}
                metalness={0.12}
                clearcoat={0.9}
                clearcoatRoughness={0.1}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* (B) Buttercream Flower Border */}
      {icingStyle === 'flower_border' && (
        <group>
          {borderPoints.filter((_, i) => i % 2 === 0).map((pt, i) => (
            <group
              key={`floret-${i}`}
              position={[pt.x, topY + 0.038, pt.z]}
              rotation={[0, (i * Math.PI) / 6, 0]}
              scale={[scale * 0.65, scale * 0.65, scale * 0.65]}
            >
              {[0, 72, 144, 216, 288].map((deg, pi) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <mesh
                    key={`p-${pi}`}
                    position={[Math.cos(rad) * 0.045, 0.015, Math.sin(rad) * 0.045]}
                    rotation={[-0.2, rad, 0.2]}
                    castShadow
                  >
                    <sphereGeometry args={[0.042, 12, 12]} />
                    <meshStandardMaterial
                      color={hexColor}
                      roughness={0.4}
                      metalness={0.02}
                    />
                  </mesh>
                );
              })}
              <mesh position={[0, 0.028, 0]}>
                <sphereGeometry args={[0.022, 12, 12]} />
                <meshStandardMaterial color="#FFD166" roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* (C) Rosette Crown */}
      {icingStyle === 'rosette' && (
        <group>
          {borderPoints.filter((_, i) => i % 2 === 0).map((pt, i) => (
            <group
              key={`rosette-${i}`}
              position={[pt.x, topY + 0.045, pt.z]}
              rotation={[0, (i * Math.PI) / 4, 0]}
              scale={[scale * 0.75, scale * 0.75, scale * 0.75]}
            >
              <mesh castShadow>
                <coneGeometry args={[0.07, 0.085, 8]} />
                <meshStandardMaterial color={hexColor} roughness={0.38} />
              </mesh>
              <mesh position={[0, -0.018, 0]}>
                <torusGeometry args={[0.06, 0.025, 8, 16]} />
                <meshStandardMaterial color={hexColor} roughness={0.38} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* (D) Gourmet Chocolate Drip */}
      {icingStyle === 'drip' && (
        <group>
          {/* Top Drip Rim Beads */}
          {borderPoints.map((pt, i) => (
            <mesh key={`puddle-${i}`} position={[pt.x * 0.985, topY + 0.01, pt.z * 0.985]}>
              <sphereGeometry args={[0.06 * scale, 12, 12]} />
              <meshPhysicalMaterial
                color="#32160E"
                roughness={0.12}
                clearcoat={1.0}
                clearcoatRoughness={0.08}
              />
            </mesh>
          ))}
          {/* Vertical Drips Hanging Down */}
          {dripDrops.map((drip, i) => (
            <group key={`drip-${i}`} position={[drip.x, drip.y, drip.z]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.024 * scale, 0.03 * scale, drip.length, 12]} />
                <meshPhysicalMaterial
                  color="#32160E"
                  roughness={0.12}
                  clearcoat={1.0}
                  clearcoatRoughness={0.08}
                />
              </mesh>
              <mesh position={[0, -drip.length / 2, 0]} castShadow>
                <sphereGeometry args={[0.038 * scale, 12, 12]} />
                <meshPhysicalMaterial
                  color="#32160E"
                  roughness={0.12}
                  clearcoat={1.0}
                  clearcoatRoughness={0.08}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* (E) Whimsical Swirls */}
      {icingStyle === 'swirl' && (
        <group>
          {borderPoints.map((pt, i) => (
            <mesh
              key={`swirl-${i}`}
              position={[pt.x, topY + 0.035, pt.z]}
              rotation={[0.3, (i * Math.PI) / 6, 0.2]}
              castShadow
            >
              <torusGeometry args={[0.048 * scale, 0.02 * scale, 8, 16, Math.PI * 1.5]} />
              <meshStandardMaterial color={hexColor} roughness={0.38} />
            </mesh>
          ))}
        </group>
      )}

      {/* (F) Vintage Ruffles */}
      {icingStyle === 'ruffle' && (
        <group>
          {borderPoints.map((pt, i) => (
            <mesh
              key={`ruffle-${i}`}
              position={[pt.x * 1.005, topY + 0.025, pt.z * 1.005]}
              rotation={[0.45, (i * Math.PI) / 8, 0]}
              castShadow
            >
              <boxGeometry args={[0.09 * scale, 0.055 * scale, 0.02 * scale]} />
              <meshStandardMaterial color={hexColor} roughness={0.42} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
