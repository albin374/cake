import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Ellipse,
  Path,
  Text,
  Group,
  Image as KonvaImage,
  Transformer,
  Line
} from 'react-konva';
import { INGREDIENTS } from '../data/ingredients';
import { FROSTING_COLORS } from '../data/cakePrices';

// Cache for loaded HTMLImageElements
const imageCache = new Map();

const useLoadedImage = (url) => {
  const [image, setImage] = useState(() => (url ? imageCache.get(url) || null : null));

  useEffect(() => {
    if (!url) {
      setImage(null);
      return;
    }

    if (imageCache.has(url)) {
      setImage(imageCache.get(url));
      return;
    }

    const img = new window.Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(url, img);
      setImage(img);
    };
    img.onerror = () => {
      console.warn('Failed to load image:', url);
    };
  }, [url]);

  return image;
};

// Texture-preserving Tinted Cake Canvas Hook
const useTintedPhotorealisticCake = (shape, flavour, frostingColorHex, cakeImageUrl) => {
  const baseImg = useLoadedImage(cakeImageUrl);
  const [tintedCanvas, setTintedCanvas] = useState(null);

  useEffect(() => {
    if (!baseImg) {
      setTintedCanvas(null);
      return;
    }

    // If white or pure vanilla/chocolate flavour with matching color, use pristine photo directly
    if (
      !frostingColorHex ||
      frostingColorHex.toLowerCase() === '#fffdf9' ||
      frostingColorHex.toLowerCase() === '#ffffff'
    ) {
      setTintedCanvas(baseImg);
      return;
    }

    try {
      const offscreen = document.createElement('canvas');
      offscreen.width = baseImg.width;
      offscreen.height = baseImg.height;
      const ctx = offscreen.getContext('2d');
      if (!ctx) {
        setTintedCanvas(baseImg);
        return;
      }

      ctx.drawImage(baseImg, 0, 0);

      const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      const hex = frostingColorHex.replace('#', '');
      const tr = parseInt(hex.substring(0, 2), 16);
      const tg = parseInt(hex.substring(2, 4), 16);
      const tb = parseInt(hex.substring(4, 6), 16);

      const rMult = tr / 255;
      const gMult = tg / 255;
      const bMult = tb / 255;

      const h = offscreen.height;
      const w = offscreen.width;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const a = data[idx + 3];
          if (a === 0) continue;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Protect bottom marble board (lower ~22% with neutral gray/white) and gold rim
          const isMarbleBoard =
            y > h * 0.76 && Math.abs(r - g) < 14 && Math.abs(r - b) < 14 && r > 210;
          const isGoldRim = y > h * 0.72 && r > 175 && g > 135 && b < 110;

          if (!isMarbleBoard && !isGoldRim) {
            // High-pass specular preservation
            const brightness = (r + g + b) / 3;
            const specular = Math.max(0, brightness - 225) / 30; // 0 to 1

            // Multiply blend with gamma boost
            data[idx] = Math.min(255, Math.round(r * rMult * 1.08 + specular * 50));
            data[idx + 1] = Math.min(255, Math.round(g * gMult * 1.08 + specular * 50));
            data[idx + 2] = Math.min(255, Math.round(b * bMult * 1.08 + specular * 50));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setTintedCanvas(offscreen);
    } catch (e) {
      console.warn('Offscreen tinting fallback to base photo:', e);
      setTintedCanvas(baseImg);
    }
  }, [baseImg, shape, flavour, frostingColorHex, cakeImageUrl]);

  return tintedCanvas;
};

// Geometrical Surface Boundary Validation & Clamping for 3/4 Perspective
export const clampToCakeSurface = (x, y, shape = 'round') => {
  // Common center of top surface across all cake models
  const cx = 250;
  const cy = 165;

  if (shape === 'round') {
    const rx = 135;
    const ry = 68;
    const dx = x - cx;
    const dy = y - cy;
    const distSq = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);

    if (distSq <= 1.0) {
      return { x, y };
    }
    const angle = Math.atan2(dy / ry, dx / rx);
    return {
      x: Math.round(cx + Math.cos(angle) * (rx * 0.94)),
      y: Math.round(cy + Math.sin(angle) * (ry * 0.94))
    };
  }

  if (shape === 'heart') {
    const rx = 130;
    const ry = 66;
    const dx = x - cx;
    const dy = y - cy;

    // Normalised heart coordinates (-1 to +1)
    const nx = dx / rx;
    const ny = -dy / ry; // flip Y so up is positive

    // 2D heart boundary formula
    const heartDist = Math.pow(nx * nx + Math.pow(ny - Math.sqrt(Math.abs(nx)), 2), 0.5);

    if (heartDist <= 1.05 && ny >= -0.85 && ny <= 1.1) {
      return { x, y };
    }

    const angle = Math.atan2(dy, dx);
    return {
      x: Math.round(cx + Math.cos(angle) * (rx * 0.88)),
      y: Math.round(cy + Math.sin(angle) * (ry * 0.88))
    };
  }

  if (shape === 'square') {
    // Isometric diamond top surface
    const rx = 126;
    const ry = 64;
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);
    const diamondDist = dx / rx + dy / ry;

    if (diamondDist <= 0.96) {
      return { x, y };
    }
    const factor = 0.92 / diamondDist;
    return {
      x: Math.round(cx + (x - cx) * factor),
      y: Math.round(cy + (y - cy) * factor)
    };
  }

  // Rectangle Slab
  if (shape === 'rectangle') {
    const rx = 150;
    const ry = 56;
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);

    if (dx <= rx * 0.94 && dy <= ry * 0.94) {
      return { x, y };
    }
    return {
      x: Math.round(Math.max(cx - rx * 0.92, Math.min(cx + rx * 0.92, x))),
      y: Math.round(Math.max(cy - ry * 0.92, Math.min(cy + ry * 0.92, y)))
    };
  }

  return { x, y };
};

// Individual Realistic Decoration Element with Perspective Shadows
const RealisticDecorationElement = ({
  decoration,
  isSelected,
  onSelect,
  onChange,
  cakeShape
}) => {
  const shapeRef = useRef(null);
  const ingredientData = useMemo(
    () => INGREDIENTS.find((i) => i.id === decoration.id),
    [decoration.id]
  );

  const image = useLoadedImage(ingredientData?.image);
  const width = decoration.width || 48;
  const height = decoration.height || 48;

  return (
    <Group
      id={decoration.instanceId}
      ref={shapeRef}
      x={decoration.x}
      y={decoration.y}
      rotation={decoration.rotation || 0}
      scaleX={decoration.scaleX || 1}
      scaleY={decoration.scaleY || 1}
      draggable
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect(decoration.instanceId);
      }}
      onTap={(e) => {
        e.cancelBubble = true;
        onSelect(decoration.instanceId);
      }}
      onDragEnd={(e) => {
        const rawX = Math.round(e.target.x());
        const rawY = Math.round(e.target.y());
        // Clamp strictly to the cake's visible top surface
        const clamped = clampToCakeSurface(rawX, rawY, cakeShape);
        e.target.x(clamped.x);
        e.target.y(clamped.y);
        onChange(decoration.instanceId, {
          x: clamped.x,
          y: clamped.y
        });
      }}
      onTransformEnd={() => {
        const node = shapeRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const rawX = Math.round(node.x());
        const rawY = Math.round(node.y());
        const clamped = clampToCakeSurface(rawX, rawY, cakeShape);
        node.x(clamped.x);
        node.y(clamped.y);
        onChange(decoration.instanceId, {
          x: clamped.x,
          y: clamped.y,
          rotation: Math.round(node.rotation()),
          scaleX,
          scaleY
        });
      }}
    >
      {/* 1. Ambient Occlusion Contact Shadow directly on the buttercream */}
      <Ellipse
        x={0}
        y={height * 0.44}
        radiusX={width * 0.36}
        radiusY={height * 0.15}
        fill="#1C0913"
        opacity={0.42}
        blurRadius={4}
      />

      {/* 2. Directional Studio Cast Shadow (offset bottom-right) */}
      <Ellipse
        x={4}
        y={height * 0.46}
        radiusX={width * 0.42}
        radiusY={height * 0.18}
        fill="#2A101C"
        opacity={0.22}
        blurRadius={7}
      />

      {/* 3. High-Definition Photorealistic Topping Image */}
      {image ? (
        <KonvaImage
          image={image}
          width={width}
          height={height}
          offsetX={width / 2}
          offsetY={height / 2}
          shadowColor="#261019"
          shadowBlur={isSelected ? 16 : 8}
          shadowOpacity={0.28}
          shadowOffsetY={isSelected ? 5 : 3}
        />
      ) : (
        <Circle
          radius={22}
          fill="#E85B91"
          opacity={0.8}
        />
      )}
    </Group>
  );
};

export const CakeCanvas = ({
  cake,
  stageRef,
  selectedId,
  setSelectedId,
  zoomLevel,
  updateDecoration,
  deleteDecoration,
  onDropItem
}) => {
  const containerRef = useRef(null);
  const trRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 580, height: 540 });

  // Size scale factor for 0.5kg to 3kg
  const sizeScales = {
    '0.5': 0.88,
    '1': 1.0,
    '1.5': 1.08,
    '2': 1.15,
    '3': 1.24
  };
  const currentScale = (sizeScales[cake.size] || 1.0) * zoomLevel;

  // Responsive container sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.min(640, Math.max(340, rect.width - 16));
        const height = Math.min(580, Math.max(360, width * 0.95));
        setDimensions({ width, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync Konva Transformer to selected node
  useEffect(() => {
    if (!trRef.current || !stageRef.current) return;
    if (selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer()?.batchDraw();
        return;
      }
    }
    trRef.current.nodes([]);
    trRef.current.getLayer()?.batchDraw();
  }, [selectedId, cake.decorations, stageRef]);

  // Keyboard shortcuts (Delete, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          return;
        }
        if (selectedId) {
          e.preventDefault();
          deleteDecoration(selectedId);
        }
      } else if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, deleteDecoration, setSelectedId]);

  // Handle Drag & Drop onto Konva Stage
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!stageRef.current) return;

    const rawData = e.dataTransfer.getData('application/json');
    if (!rawData) return;

    try {
      const item = JSON.parse(rawData);
      stageRef.current.setPointersPositions(e);
      const stage = stageRef.current;
      const pointerPos = stage.getPointerPosition();

      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Virtual top surface center is at (250, 165)
      const adjustedX = 250 + (pointerPos.x - centerX) / currentScale;
      const adjustedY = 165 + (pointerPos.y - centerY) / currentScale;

      // Clamp strictly within the visible top surface
      const clamped = clampToCakeSurface(Math.round(adjustedX), Math.round(adjustedY), cake.shape);

      onDropItem(item, clamped);
    } catch (err) {
      console.error('Error handling dropped item:', err);
    }
  };

  const checkDeselect = (e) => {
    if (
      e.target === e.target.getStage() ||
      e.target.name() === 'background-plate' ||
      e.target.name() === 'cake-base'
    ) {
      setSelectedId(null);
    }
  };

  // Find active frosting color hex
  const activeFrostingColor = useMemo(() => {
    const found = FROSTING_COLORS.find((c) => c.id === cake.frostingColor);
    return found || FROSTING_COLORS[1];
  }, [cake.frostingColor]);

  // Photorealistic Cake Image Path
  const cakePhotoUrl = useMemo(() => {
    const flavour = cake.flavour || 'vanilla';
    const shape = cake.shape || 'round';
    return `/assets/cakes/cake_${shape}_${flavour}.png`;
  }, [cake.shape, cake.flavour]);

  // Optional Decoration Assets
  const dripImage = useLoadedImage(cake.icingStyle === 'drip' ? '/assets/cakes/cake_chocolate_drip.png' : null);
  const pearlImage = useLoadedImage('/assets/decorations/sugar_pearls.png');
  const flowerImage = useLoadedImage('/assets/decorations/buttercream_flower.png');
  const rosetteImage = useLoadedImage('/assets/decorations/piping_rosette.png');

  // Tinted Cake Image (Preserving Texture & Highlights)
  const tintedCakeCanvas = useTintedPhotorealisticCake(
    cake.shape,
    cake.flavour,
    activeFrostingColor.hex,
    cakePhotoUrl
  );

  // Center coordinate of top surface in virtual 500x500 scene
  const cx = 250;
  const cy = 165;

  // Cake dimensions and offset so the top surface is consistently pinned at (250, 165)
  const cakeDimensions = useMemo(() => {
    if (cake.shape === 'rectangle') {
      return { width: 490, height: 285, offsetX: 251, offsetY: 78 };
    }
    if (cake.shape === 'heart') {
      return { width: 460, height: 356, offsetX: 230, offsetY: 96 };
    }
    if (cake.shape === 'square') {
      return { width: 460, height: 368, offsetX: 215, offsetY: 100 };
    }
    // Round
    return { width: 460, height: 365, offsetX: 183, offsetY: 99 };
  }, [cake.shape]);

  // Perspective-sorted decorations (Z-ordering by Y position: farther items draw first)
  const sortedDecorations = useMemo(() => {
    return [...(cake.decorations || [])].sort((a, b) => (a.y || 0) - (b.y || 0));
  }, [cake.decorations]);

  // Perimeter points for decorative borders (Pearls, Flowers, Rosettes)
  const borderPoints = useMemo(() => {
    const points = [];
    const count = cake.shape === 'rectangle' ? 22 : 18;
    const rx = cake.shape === 'rectangle' ? 148 : cake.shape === 'heart' ? 128 : 132;
    const ry = cake.shape === 'rectangle' ? 54 : 66;

    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI / count) * i;
      let px = cx + Math.cos(angle) * rx;
      let py = cy + Math.sin(angle) * ry;

      if (cake.shape === 'square') {
        const factor = 0.94 / (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
        px = cx + Math.cos(angle) * rx * factor;
        py = cy + Math.sin(angle) * ry * factor;
      }

      points.push({ x: px, y: py, angle });
    }
    return points;
  }, [cake.shape, cx, cy]);

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative w-full flex items-center justify-center p-2 select-none"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#FFF5F8] via-[#FFF9F3] to-[#FFF0F5]">
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          className="cursor-crosshair"
        >
          {/* Main Photorealistic Scene Layer */}
          <Layer>
            <Group
              x={dimensions.width / 2}
              y={dimensions.height / 2}
              offsetX={cx}
              offsetY={cy + 30}
              scaleX={currentScale}
              scaleY={currentScale}
            >
              {/* LAYER 1: Realistic Studio Pedestal Shadow on Table */}
              <Ellipse
                name="background-plate"
                x={cx}
                y={cy + 225}
                radiusX={215}
                radiusY={70}
                fill="#24101A"
                opacity={0.16}
                blurRadius={20}
              />

              {/* LAYER 2, 3 & 4: PHOTOREALISTIC CAKE (Marble Board + Sponge Body + Frosting Texture) */}
              {tintedCakeCanvas ? (
                <KonvaImage
                  name="cake-base"
                  image={tintedCakeCanvas}
                  x={cx}
                  y={cy}
                  width={cakeDimensions.width}
                  height={cakeDimensions.height}
                  offsetX={cakeDimensions.offsetX}
                  offsetY={cakeDimensions.offsetY}
                  shadowColor="#381824"
                  shadowBlur={16}
                  shadowOpacity={0.2}
                  shadowOffsetY={8}
                />
              ) : (
                /* Fallback loading placeholder */
                <Group>
                  <Ellipse
                    x={cx}
                    y={cy + 180}
                    radiusX={175}
                    radiusY={65}
                    fill="#F7F1EB"
                    stroke="#E8DFD7"
                    strokeWidth={2}
                  />
                  <Ellipse
                    x={cx}
                    y={cy}
                    radiusX={135}
                    radiusY={68}
                    fill={activeFrostingColor.hex}
                    stroke={activeFrostingColor.darkHex}
                  />
                </Group>
              )}

              {/* LAYER 5: OPTIONAL DECORATION STYLES & BORDERS */}
              {/* Style A: White Pearl Border */}
              {cake.icingStyle === 'pearl_border' &&
                borderPoints.map((pt, i) => (
                  <Group key={`pearl-${i}`} x={pt.x} y={pt.y}>
                    <Ellipse
                      x={1}
                      y={4}
                      radiusX={7}
                      radiusY={4}
                      fill="#1E0A14"
                      opacity={0.3}
                      blurRadius={2}
                    />
                    {pearlImage ? (
                      <KonvaImage
                        image={pearlImage}
                        width={20}
                        height={20}
                        offsetX={10}
                        offsetY={10}
                      />
                    ) : (
                      <Circle
                        radius={6}
                        fill="#FFFFFF"
                        stroke="#E5C79E"
                        strokeWidth={1}
                      />
                    )}
                  </Group>
                ))}

              {/* Style B: Buttercream Flower Border */}
              {cake.icingStyle === 'flower_border' &&
                borderPoints.map((pt, i) => (
                  <Group key={`flower-rim-${i}`} x={pt.x} y={pt.y}>
                    <Ellipse
                      x={2}
                      y={7}
                      radiusX={12}
                      radiusY={6}
                      fill="#220B17"
                      opacity={0.32}
                      blurRadius={3}
                    />
                    {flowerImage ? (
                      <KonvaImage
                        image={flowerImage}
                        width={28}
                        height={28}
                        offsetX={14}
                        offsetY={14}
                        rotation={i * 20}
                      />
                    ) : (
                      <Circle radius={10} fill="#FB7185" />
                    )}
                  </Group>
                ))}

              {/* Style C: Rosette Crown */}
              {cake.icingStyle === 'rosette' &&
                borderPoints.map((pt, i) => (
                  <Group key={`rosette-rim-${i}`} x={pt.x} y={pt.y}>
                    <Ellipse
                      x={1}
                      y={6}
                      radiusX={11}
                      radiusY={5}
                      fill="#220B17"
                      opacity={0.3}
                      blurRadius={3}
                    />
                    {rosetteImage ? (
                      <KonvaImage
                        image={rosetteImage}
                        width={26}
                        height={26}
                        offsetX={13}
                        offsetY={13}
                      />
                    ) : (
                      <Circle
                        radius={9.5}
                        fill="#FFFDF9"
                        stroke={activeFrostingColor.darkHex}
                        strokeWidth={1.5}
                      />
                    )}
                  </Group>
                ))}

              {/* Style D: Whimsical Swirls */}
              {cake.icingStyle === 'swirl' && (
                <Ellipse
                  x={cx}
                  y={cy}
                  radiusX={cake.shape === 'rectangle' ? 146 : 132}
                  radiusY={cake.shape === 'rectangle' ? 52 : 65}
                  fill="transparent"
                  stroke="#FFFFFF"
                  strokeWidth={7}
                  dash={[16, 12]}
                  shadowColor="#2A101C"
                  shadowBlur={6}
                  shadowOpacity={0.25}
                />
              )}

              {/* Style E: Vintage Ruffle Border */}
              {cake.icingStyle === 'ruffle' && (
                <Ellipse
                  x={cx}
                  y={cy}
                  radiusX={cake.shape === 'rectangle' ? 148 : 134}
                  radiusY={cake.shape === 'rectangle' ? 54 : 67}
                  fill="transparent"
                  stroke="#FFFFFF"
                  strokeWidth={5}
                  dash={[6, 6]}
                  shadowColor="#2A101C"
                  shadowBlur={4}
                  shadowOpacity={0.2}
                />
              )}

              {/* LAYER 6: PHOTOREALISTIC CHOCOLATE DRIP EFFECT */}
              {cake.icingStyle === 'drip' && dripImage && (
                <KonvaImage
                  image={dripImage}
                  x={cx}
                  y={cy + 15}
                  width={340}
                  height={190}
                  offsetX={170}
                  offsetY={95}
                  opacity={0.96}
                  shadowColor="#1F0E08"
                  shadowBlur={8}
                  shadowOpacity={0.35}
                  shadowOffsetY={3}
                />
              )}

              {/* LAYER 7: PHOTOREALISTIC TOPPINGS (Depth-sorted by Y position) */}
              {sortedDecorations.map((dec) => (
                <RealisticDecorationElement
                  key={dec.instanceId}
                  decoration={dec}
                  isSelected={dec.instanceId === selectedId}
                  onSelect={(id) => setSelectedId(id)}
                  onChange={(id, attrs) => updateDecoration(id, attrs)}
                  cakeShape={cake.shape}
                />
              ))}

              {/* LAYER 8: 3D ROYAL ICING CUSTOM MESSAGE IN PERSPECTIVE */}
              {cake.message?.text && (
                <Group
                  x={cake.message.x || cx}
                  y={cake.message.y || cy}
                  rotation={cake.message.rotation || 0}
                  scaleY={0.86} // Perspective foreshortening for 3/4 camera view
                  draggable
                  onDragEnd={(e) => {
                    const rawX = Math.round(e.target.x());
                    const rawY = Math.round(e.target.y());
                    const clamped = clampToCakeSurface(rawX, rawY, cake.shape);
                    e.target.x(clamped.x);
                    e.target.y(clamped.y);
                    updateDecoration('__message__', {});
                  }}
                >
                  {/* Ambient Contact Shadow on Frosting */}
                  <Text
                    text={cake.message.text}
                    fontFamily={cake.message.font || 'Dancing Script'}
                    fontSize={cake.message.size || 26}
                    fontStyle="bold"
                    fill="#1A0711"
                    opacity={0.42}
                    align="center"
                    verticalAlign="middle"
                    offsetX={(cake.message.text.length * (cake.message.size || 26) * 0.28)}
                    offsetY={10}
                    blurRadius={2.5}
                  />

                  {/* Main 3D Piped Relief Text */}
                  <Text
                    text={cake.message.text}
                    fontFamily={cake.message.font || 'Dancing Script'}
                    fontSize={cake.message.size || 26}
                    fontStyle="bold"
                    fill={cake.message.color || activeFrostingColor.textHex}
                    align="center"
                    verticalAlign="middle"
                    offsetX={(cake.message.text.length * (cake.message.size || 26) * 0.28)}
                    offsetY={12}
                    shadowColor="#FFFFFF"
                    shadowBlur={1}
                    shadowOpacity={0.55}
                    shadowOffsetY={-1}
                  />
                </Group>
              )}

              {/* LAYER 9: SELECTION TRANSFORMER */}
              <Transformer
                ref={trRef}
                rotateEnabled={true}
                keepRatio={true}
                borderStroke="#E85B91"
                borderStrokeWidth={2}
                borderDash={[5, 4]}
                anchorFill="#FFFFFF"
                anchorStroke="#E85B91"
                anchorCornerRadius={4}
                anchorSize={10}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 18 || newBox.height < 18) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            </Group>
          </Layer>
        </Stage>

        {/* Selected Decoration Floating Quick Action Toolbar */}
        {selectedId && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-pink-200 flex items-center gap-3 text-xs font-medium text-cake-text animate-fade-in z-20">
            <span className="flex items-center gap-1.5 text-cake-primary font-semibold">
              <span className="w-2 h-2 rounded-full bg-cake-primary animate-pulse" />
              Item Selected
            </span>
            <div className="h-4 w-px bg-pink-200" />
            <button
              onClick={() => deleteDecoration(selectedId)}
              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors flex items-center gap-1"
              title="Delete item (Delete key)"
            >
              <span>🗑️</span> Delete
            </button>
            <button
              onClick={() => setSelectedId(null)}
              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Deselect
            </button>
          </div>
        )}

        {/* Helper instruction tooltip pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full border border-pink-100 shadow-sm text-[11px] text-cake-muted flex items-center gap-2 pointer-events-none">
          <span>✨ 3/4 Perspective Studio • Realistic Contact Shadows • Boundary-Locked Top Surface</span>
        </div>
      </div>
    </div>
  );
};
