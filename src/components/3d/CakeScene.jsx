import React, { useRef, useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Cake3DModel, getCakeDimensions } from './Cake3DModel';
import { ProceduralTopping } from './ProceduralToppings';
import {
  RotateCcw,
  Play,
  Pause,
  Trash2,
  Copy,
  Plus,
  Minus,
  Sparkles,
  Move,
  Type,
  AlignCenter
} from 'lucide-react';

/**
 * 3D Cake Inscription Message rendered onto top surface via CanvasTexture
 * Guarantees crisp native text using Google Fonts loaded in index.html
 * Fully draggable across the cake surface!
 */
const CakeMessage3D = ({
  message,
  topY,
  isSelected,
  onPointerDown,
  onPointerOver,
  onPointerOut
}) => {
  const canvasRef = useRef(document.createElement('canvas'));

  const texture = useMemo(() => {
    const canvas = canvasRef.current;
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!message?.text) {
      return new THREE.CanvasTexture(canvas);
    }

    const fontName = message.font || 'Dancing Script';
    const fontSize = Math.max(22, (message.size || 26) * 1.5);
    ctx.font = `600 ${fontSize}px "${fontName}", cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Soft chocolate inscription depth shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = message.color || '#63384B';
    ctx.fillText(message.text, 256, 128);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [message?.text, message?.font, message?.color, message?.size]);

  if (!message?.text) return null;

  const msgX = message.x3d !== undefined ? message.x3d : ((message.x || 250) - 250) / 95;
  const msgZ = message.z3d !== undefined ? message.z3d : ((message.y || 165) - 165) / 95;
  const rotRad = ((message.rotation || 0) * Math.PI) / 180;

  return (
    <group
      position={[msgX, topY + 0.004, msgZ]}
      rotation={[-Math.PI / 2, 0, -rotRad]}
      onPointerDown={onPointerDown}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <mesh>
        <planeGeometry args={[2.5, 1.25]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>

      {/* Visual selection outline when active */}
      {isSelected && (
        <group position={[0, 0, 0.001]}>
          <mesh>
            <planeGeometry args={[2.55, 1.28]} />
            <meshBasicMaterial
              color="#E85B91"
              wireframe
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

/**
 * Glowing Halo / Ring indicator beneath selected topping
 */
const SelectionRing = ({ scale = 1 }) => (
  <group position={[0, 0.002, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.2 * scale, 0.25 * scale, 32]} />
      <meshBasicMaterial color="#E85B91" side={THREE.DoubleSide} transparent opacity={0.85} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.26 * scale, 0.29 * scale, 32]} />
      <meshBasicMaterial color="#FFFFFF" side={THREE.DoubleSide} transparent opacity={0.6} />
    </mesh>
  </group>
);

/**
 * Camera preset controller
 */
const CameraManager = ({ targetPreset, controlsRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (!targetPreset || !controlsRef.current) return;

    const { pos, target } = targetPreset;
    camera.position.set(pos[0], pos[1], pos[2]);
    controlsRef.current.target.set(target[0], target[1], target[2]);
    controlsRef.current.update();
  }, [targetPreset, camera, controlsRef]);

  return null;
};

/**
 * Main 3D Canvas Scene
 * Full user freedom: Click, Drag, Drop, and Reposition Toppings & Text anywhere on the 3D Cake
 */
export const CakeScene = ({
  cake,
  stageRef,
  selectedId,
  setSelectedId,
  updateDecoration,
  deleteDecoration,
  duplicateDecoration,
  updateMessage,
  onDropItem
}) => {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraPreset, setCameraPreset] = useState(null);

  // Dragging state
  const isDraggingRef = useRef(false);
  const dragTargetRef = useRef(null); // { type: 'decoration' | 'message', id?: string }
  const dragOffsetRef = useRef({ x: 0, z: 0 });
  const [activeDragType, setActiveDragType] = useState(null);

  const { height, radius, boardThickness } = useMemo(
    () => getCakeDimensions(cake.size),
    [cake.size]
  );
  // Cake top surface is precisely at height / 2
  const topY = height / 2;
  const boardY = -height / 2 - boardThickness / 2;

  // Selected decoration helper
  const selectedDeco = useMemo(
    () => (cake.decorations || []).find((d) => d.instanceId === selectedId),
    [cake.decorations, selectedId]
  );
  const isMessageSelected = selectedId === 'message';

  // Surface boundary clamping
  const clampToCakeTop = useCallback(
    (x, z) => {
      let clampedX = x;
      let clampedZ = z;

      if (cake.shape === 'round') {
        const maxR = radius * 0.88;
        const dist = Math.sqrt(x * x + z * z);
        if (dist > maxR && dist > 0.0001) {
          clampedX = (x / dist) * maxR;
          clampedZ = (z / dist) * maxR;
        }
      } else if (cake.shape === 'square') {
        const maxSide = 1.15;
        clampedX = Math.max(-maxSide, Math.min(maxSide, x));
        clampedZ = Math.max(-maxSide, Math.min(maxSide, z));
      } else if (cake.shape === 'rectangle') {
        const maxX = 1.45;
        const maxZ = 0.95;
        clampedX = Math.max(-maxX, Math.min(maxX, x));
        clampedZ = Math.max(-maxZ, Math.min(maxZ, z));
      } else if (cake.shape === 'heart') {
        const maxR = radius * 0.84;
        const dist = Math.sqrt(x * x + z * z);
        if (dist > maxR && dist > 0.0001) {
          clampedX = (x / dist) * maxR;
          clampedZ = (z / dist) * maxR;
        }
      }
      return { x: clampedX, z: clampedZ };
    },
    [cake.shape, radius]
  );

  // Start dragging a topping or text across the 3D surface
  const startDragging = useCallback(
    (type, id, currentX, currentZ, e) => {
      if (e) {
        e.stopPropagation();
      }

      // Temporarily disable OrbitControls so dragging doesn't spin the cake
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      isDraggingRef.current = true;
      dragTargetRef.current = { type, id };
      setActiveDragType(type);

      if (type === 'decoration') {
        setSelectedId(id);
      } else if (type === 'message') {
        setSelectedId('message');
      }

      // Calculate initial grab offset relative to item center
      if (e && e.point) {
        dragOffsetRef.current = {
          x: e.point.x - currentX,
          z: e.point.z - currentZ
        };
      } else {
        dragOffsetRef.current = { x: 0, z: 0 };
      }

      document.body.style.cursor = 'grabbing';
    },
    [setSelectedId]
  );

  // Global window pointer listeners for buttery smooth 3D dragging
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (
        !isDraggingRef.current ||
        !dragTargetRef.current ||
        !containerRef.current ||
        !cameraRef.current
      ) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      const topPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -topY);
      const intersection = new THREE.Vector3();

      if (raycaster.ray.intersectPlane(topPlane, intersection)) {
        const rawTargetX = intersection.x - dragOffsetRef.current.x;
        const rawTargetZ = intersection.z - dragOffsetRef.current.z;

        const { x: clampedX, z: clampedZ } = clampToCakeTop(rawTargetX, rawTargetZ);

        const currentTarget = dragTargetRef.current;
        if (currentTarget.type === 'decoration' && updateDecoration) {
          updateDecoration(currentTarget.id, {
            x3d: clampedX,
            z3d: clampedZ
          });
        } else if (currentTarget.type === 'message' && updateMessage) {
          updateMessage({
            x3d: clampedX,
            z3d: clampedZ
          });
        }
      }
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        dragTargetRef.current = null;
        setActiveDragType(null);
        document.body.style.cursor = 'auto';

        // Re-enable OrbitControls for 360° camera rotation
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [topY, clampToCakeTop, updateDecoration, updateMessage]);

  // Camera presets
  const applyPreset = (presetName) => {
    const presets = {
      front: { pos: [0, 0.9, 5.0], target: [0, 0, 0] },
      top: { pos: [0, 5.4, 0.001], target: [0, 0, 0] },
      side: { pos: [5.0, 0.9, 0], target: [0, 0, 0] },
      isometric: { pos: [3.2, 3.2, 4.0], target: [0, 0, 0] },
      reset: { pos: [0, 3.0, 4.8], target: [0, 0, 0] }
    };

    if (presets[presetName]) {
      setCameraPreset({ ...presets[presetName], id: Date.now() });
    }
  };

  // Drag and Drop from left IngredientPanel using Raycasting
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dataStr = e.dataTransfer.getData('application/json');
    if (!dataStr) return;

    try {
      const item = JSON.parse(dataStr);
      if (!containerRef.current || !cameraRef.current) {
        onDropItem(item);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

      const topPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -topY);
      const intersection = new THREE.Vector3();

      if (raycaster.ray.intersectPlane(topPlane, intersection)) {
        const { x: clampedX, z: clampedZ } = clampToCakeTop(intersection.x, intersection.z);
        const newId = onDropItem(item, {
          x3d: clampedX,
          y3d: topY,
          z3d: clampedZ
        });
        if (newId) setSelectedId(newId);
      } else {
        onDropItem(item);
      }
    } catch (err) {
      console.warn('Drop handling error:', err);
    }
  };

  return (
    <div className="relative w-full max-w-[620px] mx-auto flex flex-col items-center">
      {/* 3D Viewport - Seamless with Stainless Steel Page Background */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative w-full aspect-square max-h-[580px] rounded-3xl overflow-hidden select-none bg-transparent"
        style={{
          backgroundImage: `url('/assets/Brushed%20Stainless%20Steel%20with%20Golden%20Highlights.png')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* SweetArt 3D Studio Live Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-cake-primary shadow-xs border border-pink-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            3D Studio
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-cake-muted/80 bg-white/80 px-2.5 py-1 rounded-full border border-pink-50">
            {cake.shape.toUpperCase()} • {cake.size} KG
          </span>
        </div>

        {/* Camera Quick Presets Header Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-cake-border shadow-xs">
          <button
            type="button"
            onClick={() => applyPreset('front')}
            className="px-2.5 py-1 text-[11px] font-bold rounded-xl text-cake-text hover:bg-cake-light hover:text-cake-primary transition-colors"
            title="Front View"
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => applyPreset('top')}
            className="px-2.5 py-1 text-[11px] font-bold rounded-xl text-cake-text hover:bg-cake-light hover:text-cake-primary transition-colors"
            title="Top View"
          >
            Top
          </button>
          <button
            type="button"
            onClick={() => applyPreset('side')}
            className="px-2.5 py-1 text-[11px] font-bold rounded-xl text-cake-text hover:bg-cake-light hover:text-cake-primary transition-colors"
            title="Side View"
          >
            Side
          </button>
          <button
            type="button"
            onClick={() => applyPreset('isometric')}
            className="px-2.5 py-1 text-[11px] font-bold rounded-xl text-cake-text hover:bg-cake-light hover:text-cake-primary transition-colors"
            title="3/4 Perspective"
          >
            3/4
          </button>
          <button
            type="button"
            onClick={() => applyPreset('reset')}
            className="p-1.5 rounded-xl text-cake-muted hover:text-cake-primary hover:bg-cake-light transition-colors"
            title="Reset Camera Angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 360 Auto-Rotate Toggle Button */}
        <div className="absolute bottom-4 left-4 z-20">
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold shadow-xs transition-all ${
              autoRotate
                ? 'bg-cake-primary text-white shadow-cake-soft'
                : 'bg-white/95 text-cake-text hover:bg-cake-light border border-cake-border'
            }`}
          >
            {autoRotate ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Stop 360°</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>360° Orbit</span>
              </>
            )}
          </button>
        </div>

        {/* Floating Selected Item Action Toolbar (for both Decorations and Message!) */}
        {selectedDeco && (
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-cake-primary/40 shadow-cake-soft flex items-center gap-1">
            <span className="text-[10px] font-bold text-cake-primary px-2 truncate max-w-[100px] flex items-center gap-1">
              <Move className="w-3 h-3 text-cake-primary" />
              <span>{selectedDeco.name}</span>
            </span>
            <button
              type="button"
              onClick={() =>
                updateDecoration(selectedDeco.instanceId, {
                  rotation: (selectedDeco.rotation || 0) - 15
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Rotate Left (-15°)"
            >
              ↺
            </button>
            <button
              type="button"
              onClick={() =>
                updateDecoration(selectedDeco.instanceId, {
                  rotation: (selectedDeco.rotation || 0) + 15
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Rotate Right (+15°)"
            >
              ↻
            </button>
            <button
              type="button"
              onClick={() =>
                updateDecoration(selectedDeco.instanceId, {
                  scale: Math.max(0.6, (selectedDeco.scale || 1) - 0.1)
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Scale Down"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() =>
                updateDecoration(selectedDeco.instanceId, {
                  scale: Math.min(1.8, (selectedDeco.scale || 1) + 0.1)
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Scale Up"
            >
              <Plus className="w-3 h-3" />
            </button>
            {duplicateDecoration && (
              <button
                type="button"
                onClick={() => duplicateDecoration(selectedDeco.instanceId)}
                className="p-1.5 rounded-xl hover:bg-cake-light text-cake-primary transition-colors"
                title="Duplicate Item"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => deleteDecoration(selectedDeco.instanceId)}
              className="p-1.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
              title="Delete Item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Selected Message Action Toolbar */}
        {isMessageSelected && cake.message?.text && (
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-cake-primary/40 shadow-cake-soft flex items-center gap-1">
            <span className="text-[10px] font-bold text-cake-primary px-2 flex items-center gap-1">
              <Type className="w-3 h-3 text-cake-primary" />
              <span>Piped Inscription</span>
            </span>
            <button
              type="button"
              onClick={() =>
                updateMessage({
                  rotation: (cake.message.rotation || 0) - 15
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Rotate Left (-15°)"
            >
              ↺
            </button>
            <button
              type="button"
              onClick={() =>
                updateMessage({
                  rotation: (cake.message.rotation || 0) + 15
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Rotate Right (+15°)"
            >
              ↻
            </button>
            <button
              type="button"
              onClick={() =>
                updateMessage({
                  size: Math.max(16, (cake.message.size || 26) - 2)
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Font Size Smaller"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() =>
                updateMessage({
                  size: Math.min(36, (cake.message.size || 26) + 2)
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-text text-xs"
              title="Font Size Bigger"
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() =>
                updateMessage({
                  x3d: 0,
                  z3d: -0.15,
                  rotation: 0
                })
              }
              className="p-1.5 rounded-xl hover:bg-cake-light text-cake-primary transition-colors text-xs flex items-center gap-1"
              title="Reset Message to Center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateMessage({ text: '' })}
              className="p-1.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
              title="Clear Inscription"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* REACT THREE FIBER CANVAS */}
        <Canvas
          shadows
          camera={{ position: [0, 3.0, 4.8], fov: 42 }}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05
          }}
          onCreated={({ gl, camera }) => {
            cameraRef.current = camera;
            if (stageRef) {
              stageRef.current = gl.domElement;
            }
          }}
          onPointerDown={() => {
            // Click outside items deselects
            if (!isDraggingRef.current) {
              setSelectedId(null);
            }
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Studio Lighting & Ambient Ambiance */}
          <ambientLight intensity={0.68} color="#FFF8F2" />

          {/* Key Light (Cast Shadow) */}
          <directionalLight
            position={[4, 7, 4.5]}
            intensity={1.25}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
            shadow-camera-near={1}
            shadow-camera-far={20}
            shadow-camera-left={-3.5}
            shadow-camera-right={3.5}
            shadow-camera-top={3.5}
            shadow-camera-bottom={-3.5}
          />

          {/* Warm Fill Light */}
          <directionalLight position={[-4.5, 3.5, -2.5]} intensity={0.4} color="#FFE8EF" />

          {/* Cool Backlight */}
          <directionalLight position={[0, 4.5, -5.5]} intensity={0.45} color="#F0F4FF" />

          {/* Drei OrbitControls */}
          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={2.2}
            enableDamping
            dampingFactor={0.06}
            minDistance={2.8}
            maxDistance={8.5}
            maxPolarAngle={Math.PI / 2 + 0.04}
          />

          {/* Camera Preset Rig */}
          <CameraManager targetPreset={cameraPreset} controlsRef={controlsRef} />

          <Suspense fallback={null}>
            {/* Ground Contact Shadow beneath marble board */}
            <ContactShadows
              position={[0, boardY - 0.01, 0]}
              opacity={0.65}
              scale={7.5}
              blur={2.2}
              far={3.5}
              color="#4A2633"
            />

            {/* 3D CAKE TIER MODEL (Complete Round Cylinder by Default) */}
            <Cake3DModel
              shape={cake.shape}
              size={cake.size}
              flavour={cake.flavour}
              frosting={cake.frosting}
              frostingColor={cake.frostingColor}
              icingStyle={cake.icingStyle}
              onCakePointerDown={(e) => {
                if (!isDraggingRef.current) {
                  setSelectedId(null);
                }
              }}
            />

            {/* 3D CAKE INSCRIPTION MESSAGE (Click & Drag to any position on cake!) */}
            <CakeMessage3D
              message={cake.message}
              topY={topY}
              isSelected={isMessageSelected}
              onPointerDown={(e) => {
                const curX =
                  cake.message?.x3d !== undefined
                    ? cake.message.x3d
                    : ((cake.message?.x || 250) - 250) / 95;
                const curZ =
                  cake.message?.z3d !== undefined
                    ? cake.message.z3d
                    : ((cake.message?.y || 165) - 165) / 95;
                startDragging('message', null, curX, curZ, e);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'grab';
              }}
              onPointerOut={() => {
                if (!isDraggingRef.current) {
                  document.body.style.cursor = 'auto';
                }
              }}
            />

            {/* PLACED 3D TOPPINGS (Click & Drag to ANY position on cake surface!) */}
            {(cake.decorations || []).map((dec) => {
              const posX = dec.x3d !== undefined ? dec.x3d : (dec.x - 250) / 95;
              const posZ = dec.z3d !== undefined ? dec.z3d : (dec.y - 165) / 95;
              const posY = topY - 0.005;
              const isSelected = selectedId === dec.instanceId;

              return (
                <group
                  key={dec.instanceId}
                  position={[posX, posY, posZ]}
                  rotation={[0, ((dec.rotation || 0) * Math.PI) / 180, 0]}
                  scale={[dec.scale || 1, dec.scale || 1, dec.scale || 1]}
                  onPointerDown={(e) => {
                    startDragging('decoration', dec.instanceId, posX, posZ, e);
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = 'grab';
                  }}
                  onPointerOut={() => {
                    if (!isDraggingRef.current) {
                      document.body.style.cursor = 'auto';
                    }
                  }}
                >
                  <ProceduralTopping id={dec.id} />
                  {isSelected && <SelectionRing scale={dec.scale || 1} />}
                </group>
              );
            })}
          </Suspense>
        </Canvas>
      </div>

      {/* Interactive Guidance Pill */}
      <div className="mt-3 flex items-center justify-between w-full px-2 text-[11px] font-medium">
        <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 shadow-sm border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Click & Drag toppings or text to reposition anywhere on the cake!</span>
        </span>
        <span className="hidden sm:inline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 shadow-sm border border-white/10 font-semibold">
          Drag from sidebar or drop directly
        </span>
      </div>
    </div>
  );
};
