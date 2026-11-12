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
import { FROSTING_COLORS, FLAVOUR_PRICES } from '../data/cakePrices';

// Image loader cache for decorations
const useDecorationImage = (dataUri) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!dataUri) return;
    const img = new window.Image();
    img.src = dataUri;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
    };
  }, [dataUri]);

  return image;
};

// Individual Decoration on Canvas
const DecorationElement = ({
  decoration,
  isSelected,
  onSelect,
  onChange,
  onContextMenu
}) => {
  const shapeRef = useRef(null);
  const ingredientData = useMemo(
    () => INGREDIENTS.find((i) => i.id === decoration.id),
    [decoration.id]
  );
  const image = useDecorationImage(ingredientData?.image);

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
        onChange(decoration.instanceId, {
          x: Math.round(e.target.x()),
          y: Math.round(e.target.y())
        });
      }}
      onTransformEnd={() => {
        const node = shapeRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        onChange(decoration.instanceId, {
          x: Math.round(node.x()),
          y: Math.round(node.y()),
          rotation: Math.round(node.rotation()),
          scaleX,
          scaleY
        });
      }}
    >
      {image ? (
        <KonvaImage
          image={image}
          width={decoration.width}
          height={decoration.height}
          offsetX={decoration.width / 2}
          offsetY={decoration.height / 2}
          shadowColor="#000"
          shadowBlur={isSelected ? 10 : 5}
          shadowOpacity={0.25}
          shadowOffsetY={4}
        />
      ) : (
        // Fallback placeholder while loading
        <Circle
          radius={20}
          fill="#E85B91"
          opacity={0.7}
          offsetX={0}
          offsetY={0}
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
  const [dimensions, setDimensions] = useState({ width: 560, height: 520 });

  // Size scale factor for 0.5kg to 3kg
  const sizeScales = {
    '0.5': 0.85,
    '1': 1.0,
    '1.5': 1.08,
    '2': 1.16,
    '3': 1.25
  };
  const currentScale = (sizeScales[cake.size] || 1.0) * zoomLevel;

  // Measure container for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.min(620, Math.max(340, rect.width - 20));
        const height = Math.min(560, Math.max(360, width * 0.95));
        setDimensions({ width, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync Transformer to selected decoration
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

  // Handle keyboard shortcuts (Delete, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Only if not focused on an input
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

  // Native HTML5 drop support onto Konva canvas
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

      // Convert coordinate relative to canvas center offset and zoom
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Stage content is centered around (250, 240)
      const adjustedX = 250 + (pointerPos.x - centerX) / currentScale;
      const adjustedY = 240 + (pointerPos.y - centerY) / currentScale;

      onDropItem(item, { x: Math.round(adjustedX), y: Math.round(adjustedY) });
    } catch (err) {
      console.error('Error handling dropped item:', err);
    }
  };

  // Deselect when clicking empty canvas
  const checkDeselect = (e) => {
    if (e.target === e.target.getStage() || e.target.name() === 'background-plate') {
      setSelectedId(null);
    }
  };

  // Get colors
  const activeFrostingColor = useMemo(() => {
    const found = FROSTING_COLORS.find((c) => c.id === cake.frostingColor);
    return found || FROSTING_COLORS[1];
  }, [cake.frostingColor]);

  const activeFlavour = useMemo(() => {
    const found = FLAVOUR_PRICES[cake.flavour];
    return found || FLAVOUR_PRICES.vanilla;
  }, [cake.flavour]);

  // Center coordinate of the cake inside internal 500x500 virtual coordinates
  const cx = 250;
  const cy = 250;

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative w-full flex items-center justify-center p-2 select-none"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-gradient-to-b from-[#FFF5F8] to-[#FFF9F3]">
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          className="cursor-crosshair"
        >
          {/* Main Cake Layer */}
          <Layer>
            {/* Center Cake Scene Group with responsive scaling & centering */}
            <Group
              x={dimensions.width / 2}
              y={dimensions.height / 2}
              offsetX={250}
              offsetY={240}
              scaleX={currentScale}
              scaleY={currentScale}
            >
              {/* --- BOTTOM CAKE BOARD / PEDESTAL STAND --- */}
              <Ellipse
                name="background-plate"
                x={cx}
                y={cy + 85}
                radiusX={180}
                radiusY={70}
                fill="#F7F1EB"
                stroke="#E8DFD7"
                strokeWidth={3}
                shadowColor="#4A2835"
                shadowBlur={25}
                shadowOpacity={0.16}
                shadowOffsetY={15}
              />
              {/* Scalloped Gold/Lace Cake Rim */}
              <Ellipse
                name="background-plate"
                x={cx}
                y={cy + 83}
                radiusX={172}
                radiusY={66}
                fill="transparent"
                stroke="#E5C79E"
                strokeWidth={2}
                dash={[6, 6]}
              />

              {/* --- CAKE BASE & 3D BODY RENDERED BY SHAPE --- */}
              {cake.shape === 'round' && (
                <Group>
                  {/* Side Body (Cylinder Depth) */}
                  <Rect
                    x={cx - 140}
                    y={cy - 20}
                    width={280}
                    height={85}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: 280, y: 0 }}
                    fillLinearGradientColorStops={[
                      0,
                      activeFrostingColor.darkHex,
                      0.3,
                      activeFrostingColor.hex,
                      0.8,
                      activeFrostingColor.hex,
                      1,
                      activeFrostingColor.darkHex
                    ]}
                  />
                  {/* Flavour Crumb Texture Peeking on Side Base */}
                  <Rect
                    x={cx - 140}
                    y={cy + 55}
                    width={280}
                    height={10}
                    fill={activeFlavour.sideColor}
                    opacity={0.35}
                  />

                  {/* Bottom Rounded Curve */}
                  <Ellipse
                    x={cx}
                    y={cy + 65}
                    radiusX={140}
                    radiusY={50}
                    fill={activeFrostingColor.darkHex}
                  />

                  {/* Decorative Bottom Border Pearls / Shells */}
                  {Array.from({ length: 22 }).map((_, i) => {
                    const angle = (Math.PI / 21) * i;
                    const bx = cx - Math.cos(angle) * 140;
                    const by = cy + 65 + Math.sin(angle) * 50;
                    return (
                      <Circle
                        key={`bot-pearl-${i}`}
                        x={bx}
                        y={by}
                        radius={6.5}
                        fill="#FFFFFF"
                        stroke={activeFrostingColor.darkHex}
                        strokeWidth={1}
                        shadowColor="#000"
                        shadowBlur={3}
                        shadowOpacity={0.15}
                      />
                    );
                  })}

                  {/* Drips (if Icing Style is 'drip') */}
                  {cake.icingStyle === 'drip' && (
                    <Group>
                      {[
                        { x: -130, h: 25 },
                        { x: -95, h: 42 },
                        { x: -60, h: 28 },
                        { x: -20, h: 50 },
                        { x: 15, h: 32 },
                        { x: 50, h: 48 },
                        { x: 85, h: 35 },
                        { x: 120, h: 22 }
                      ].map((drip, idx) => (
                        <Path
                          key={`drip-${idx}`}
                          data={`M ${cx + drip.x - 8} ${cy - 5} Q ${cx + drip.x} ${cy + drip.h} ${cx + drip.x + 8} ${cy - 5} Z`}
                          fill={cake.flavour === 'chocolate' ? '#3B1E14' : activeFrostingColor.darkHex}
                          opacity={0.9}
                        />
                      ))}
                    </Group>
                  )}

                  {/* Top Frosting Surface (Ellipse) */}
                  <Ellipse
                    x={cx}
                    y={cy - 20}
                    radiusX={140}
                    radiusY={52}
                    fillLinearGradientStartPoint={{ x: cx - 140, y: cy - 70 }}
                    fillLinearGradientEndPoint={{ x: cx + 140, y: cy + 30 }}
                    fillLinearGradientColorStops={[
                      0,
                      '#FFFFFF',
                      0.3,
                      activeFrostingColor.hex,
                      1,
                      activeFrostingColor.hex
                    ]}
                    stroke={activeFrostingColor.darkHex}
                    strokeWidth={1.5}
                    shadowColor="#63384B"
                    shadowBlur={8}
                    shadowOpacity={0.12}
                    shadowOffsetY={2}
                  />

                  {/* Top Border Piping according to icingStyle */}
                  {cake.icingStyle === 'rosette' &&
                    Array.from({ length: 18 }).map((_, i) => {
                      const angle = (2 * Math.PI / 18) * i;
                      const rx = cx + Math.cos(angle) * 136;
                      const ry = cy - 20 + Math.sin(angle) * 50;
                      return (
                        <Circle
                          key={`top-rosette-${i}`}
                          x={rx}
                          y={ry}
                          radius={9}
                          fill="#FFFFFF"
                          stroke={activeFrostingColor.darkHex}
                          strokeWidth={1.5}
                        />
                      );
                    })}

                  {cake.icingStyle === 'swirl' && (
                    <Ellipse
                      x={cx}
                      y={cy - 20}
                      radiusX={136}
                      radiusY={48}
                      fill="transparent"
                      stroke="#FFFFFF"
                      strokeWidth={5}
                      dash={[12, 10]}
                    />
                  )}

                  {cake.icingStyle === 'ruffle' && (
                    <Ellipse
                      x={cx}
                      y={cy - 20}
                      radiusX={138}
                      radiusY={50}
                      fill="transparent"
                      stroke="#FFFFFF"
                      strokeWidth={4}
                      dash={[5, 5]}
                    />
                  )}
                </Group>
              )}

              {cake.shape === 'square' && (
                <Group>
                  {/* Square Perspective Body */}
                  {/* Front-Left Face */}
                  <Line
                    points={[cx - 130, cy - 20, cx, cy + 35, cx, cy + 105, cx - 130, cy + 50]}
                    closed
                    fill={activeFrostingColor.darkHex}
                  />
                  {/* Front-Right Face */}
                  <Line
                    points={[cx, cy + 35, cx + 130, cy - 20, cx + 130, cy + 50, cx, cy + 105]}
                    closed
                    fill={activeFrostingColor.darkHex}
                    opacity={0.82}
                  />
                  {/* Bottom Cake Edge Piping */}
                  <Line
                    points={[cx - 130, cy + 50, cx, cy + 105, cx + 130, cy + 50]}
                    stroke="#FFFFFF"
                    strokeWidth={5}
                    lineCap="round"
                    lineJoin="round"
                  />
                  {/* Top Square Face */}
                  <Line
                    points={[cx, cy - 75, cx + 130, cy - 20, cx, cy + 35, cx - 130, cy - 20]}
                    closed
                    fillLinearGradientStartPoint={{ x: cx - 130, y: cy - 75 }}
                    fillLinearGradientEndPoint={{ x: cx + 130, y: cy + 35 }}
                    fillLinearGradientColorStops={[
                      0,
                      '#FFFFFF',
                      0.3,
                      activeFrostingColor.hex,
                      1,
                      activeFrostingColor.hex
                    ]}
                    stroke={activeFrostingColor.darkHex}
                    strokeWidth={2}
                    shadowColor="#63384B"
                    shadowBlur={8}
                    shadowOpacity={0.12}
                  />
                  {/* Icing style border for square */}
                  <Line
                    points={[cx, cy - 75, cx + 130, cy - 20, cx, cy + 35, cx - 130, cy - 20]}
                    closed
                    stroke="#FFFFFF"
                    strokeWidth={cake.icingStyle === 'rosette' ? 7 : 3}
                    dash={cake.icingStyle === 'swirl' ? [10, 8] : undefined}
                  />
                </Group>
              )}

              {cake.shape === 'heart' && (
                <Group>
                  {/* Heart 2.5D Body & Depth */}
                  {/* Side extrusion */}
                  <Path
                    data={`M ${cx - 120} ${cy - 10} C ${cx - 120} ${cy + 40}, ${cx} ${cy + 75}, ${cx} ${cy + 95} L ${cx} ${cy + 130} C ${cx} ${cy + 110}, ${cx - 120} ${cy + 75}, ${cx - 120} ${cy + 25} Z`}
                    fill={activeFrostingColor.darkHex}
                  />
                  <Path
                    data={`M ${cx + 120} ${cy - 10} C ${cx + 120} ${cy + 40}, ${cx} ${cy + 75}, ${cx} ${cy + 95} L ${cx} ${cy + 130} C ${cx} ${cy + 110}, ${cx + 120} ${cy + 75}, ${cx + 120} ${cy + 25} Z`}
                    fill={activeFrostingColor.darkHex}
                    opacity={0.85}
                  />
                  {/* Heart Top Surface */}
                  <Path
                    data={`M ${cx} ${cy + 50} C ${cx - 70} ${cy + 20}, ${cx - 140} ${cy - 30}, ${cx - 120} ${cy - 75} C ${cx - 100} ${cy - 120}, ${cx - 30} ${cy - 110}, ${cx} ${cy - 65} C ${cx + 30} ${cy - 110}, ${cx + 100} ${cy - 120}, ${cx + 120} ${cy - 75} C ${cx + 140} ${cy - 30}, ${cx + 70} ${cy + 20}, ${cx} ${cy + 50} Z`}
                    fillLinearGradientStartPoint={{ x: cx - 120, y: cy - 110 }}
                    fillLinearGradientEndPoint={{ x: cx + 120, y: cy + 50 }}
                    fillLinearGradientColorStops={[
                      0,
                      '#FFFFFF',
                      0.35,
                      activeFrostingColor.hex,
                      1,
                      activeFrostingColor.hex
                    ]}
                    stroke={activeFrostingColor.darkHex}
                    strokeWidth={2}
                    shadowColor="#63384B"
                    shadowBlur={10}
                    shadowOpacity={0.14}
                  />
                  {/* Heart Scalloped Rim */}
                  <Path
                    data={`M ${cx} ${cy + 48} C ${cx - 70} ${cy + 18}, ${cx - 138} ${cy - 30}, ${cx - 118} ${cy - 73} C ${cx - 98} ${cy - 118}, ${cx - 30} ${cy - 108}, ${cx} ${cy - 63} C ${cx + 30} ${cy - 108}, ${cx + 98} ${cy - 118}, ${cx + 118} ${cy - 73} C ${cx + 138} ${cy - 30}, ${cx + 70} ${cy + 18}, ${cx} ${cy + 48} Z`}
                    fill="transparent"
                    stroke="#FFFFFF"
                    strokeWidth={cake.icingStyle === 'rosette' ? 6 : 3}
                    dash={cake.icingStyle === 'swirl' ? [8, 6] : undefined}
                  />
                </Group>
              )}

              {cake.shape === 'rectangle' && (
                <Group>
                  {/* Slab Rectangle Perspective Body */}
                  <Line
                    points={[cx - 150, cy - 25, cx - 20, cy + 40, cx - 20, cy + 110, cx - 150, cy + 45]}
                    closed
                    fill={activeFrostingColor.darkHex}
                  />
                  <Line
                    points={[cx - 20, cy + 40, cx + 150, cy - 15, cx + 150, cy + 55, cx - 20, cy + 110]}
                    closed
                    fill={activeFrostingColor.darkHex}
                    opacity={0.8}
                  />
                  {/* Top Slab Face */}
                  <Line
                    points={[cx - 20, cy - 80, cx + 150, cy - 15, cx - 20, cy + 40, cx - 150, cy - 25]}
                    closed
                    fillLinearGradientStartPoint={{ x: cx - 150, y: cy - 80 }}
                    fillLinearGradientEndPoint={{ x: cx + 150, y: cy + 40 }}
                    fillLinearGradientColorStops={[
                      0,
                      '#FFFFFF',
                      0.3,
                      activeFrostingColor.hex,
                      1,
                      activeFrostingColor.hex
                    ]}
                    stroke={activeFrostingColor.darkHex}
                    strokeWidth={2}
                    shadowColor="#63384B"
                    shadowBlur={8}
                    shadowOpacity={0.12}
                  />
                  <Line
                    points={[cx - 20, cy - 80, cx + 150, cy - 15, cx - 20, cy + 40, cx - 150, cy - 25]}
                    closed
                    stroke="#FFFFFF"
                    strokeWidth={cake.icingStyle === 'rosette' ? 7 : 3}
                    dash={cake.icingStyle === 'swirl' ? [10, 8] : undefined}
                  />
                </Group>
              )}

              {/* --- CUSTOM CAKE MESSAGE ON TOP SURFACE --- */}
              {cake.message?.text && (
                <Group
                  x={cake.message.x || cx}
                  y={cake.message.y || cy - 20}
                  draggable
                  onDragEnd={(e) => {
                    // Update message position
                    const node = e.target;
                    updateDecoration('__message__', {}); // hook can listen if needed
                  }}
                >
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
                    shadowColor="#000"
                    shadowBlur={2}
                    shadowOpacity={0.15}
                    shadowOffsetY={1}
                  />
                </Group>
              )}

              {/* --- DECORATIONS LAYER --- */}
              {(cake.decorations || []).map((dec) => (
                <DecorationElement
                  key={dec.instanceId}
                  decoration={dec}
                  isSelected={dec.instanceId === selectedId}
                  onSelect={(id) => setSelectedId(id)}
                  onChange={(id, attrs) => updateDecoration(id, attrs)}
                />
              ))}

              {/* Konva Transformer Handle */}
              <Transformer
                ref={trRef}
                rotateEnabled={true}
                keepRatio={true}
                borderStroke="#E85B91"
                borderStrokeWidth={2}
                borderDash={[4, 4]}
                anchorFill="#FFFFFF"
                anchorStroke="#E85B91"
                anchorCornerRadius={4}
                anchorSize={9}
                boundBoxFunc={(oldBox, newBox) => {
                  // Limit minimum decoration size
                  if (newBox.width < 16 || newBox.height < 16) {
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
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full border border-pink-100 shadow-sm text-[11px] text-cake-muted flex items-center gap-2 pointer-events-none">
          <span>✨ Drag & drop items freely • Click to select, resize & rotate</span>
        </div>
      </div>
    </div>
  );
};
