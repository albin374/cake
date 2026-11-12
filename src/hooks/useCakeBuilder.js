import { useState, useEffect, useCallback, useRef } from 'react';
import { DEFAULT_CAKE_STATE } from '../data/customizationOptions';
import { getStoredBuilderState, setStoredBuilderState } from '../utils/storage';
import { useUndoRedo } from './useUndoRedo';
import { clampToCakeSurface, canvas2DTo3D, space3DTo2D } from '../utils/cakeBounds';

export const useCakeBuilder = () => {
  // Try loading from localStorage on first mount, else default
  const initialData = getStoredBuilderState() || DEFAULT_CAKE_STATE;

  const {
    state: cake,
    set: setCake,
    reset: resetHistory,
    undo,
    redo,
    canUndo,
    canRedo
  } = useUndoRedo(initialData);

  const [selectedId, setSelectedId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const stageRef = useRef(null);

  // Sync to localStorage on state changes
  useEffect(() => {
    setStoredBuilderState(cake);
  }, [cake]);

  // Update specific cake properties
  const updateCakeProperty = useCallback(
    (key, value) => {
      setCake((prev) => ({
        ...prev,
        [key]: value
      }));
    },
    [setCake]
  );

  // Shapes & flavours
  const setShape = useCallback(
    (newShape) => {
      setCake((prev) => {
        const clampedDecorations = (prev.decorations || []).map((dec) => {
          const clamped = clampToCakeSurface(dec.x || 250, dec.y || 165, newShape);
          const p3d = canvas2DTo3D(clamped.x, clamped.y);
          return {
            ...dec,
            x: clamped.x,
            y: clamped.y,
            x3d: dec.x3d !== undefined ? p3d.x3d : undefined,
            z3d: dec.z3d !== undefined ? p3d.z3d : undefined
          };
        });

        const clampedMsgCoords = clampToCakeSurface(
          prev.message?.x || 250,
          prev.message?.y || 165,
          newShape
        );

        const clampedMessage = prev.message
          ? {
              ...prev.message,
              x: clampedMsgCoords.x,
              y: clampedMsgCoords.y
            }
          : prev.message;

        return {
          ...prev,
          shape: newShape,
          decorations: clampedDecorations,
          message: clampedMessage
        };
      });
    },
    [setCake]
  );

  const setSize = useCallback((size) => updateCakeProperty('size', size), [updateCakeProperty]);
  const setFlavour = useCallback((flavour) => updateCakeProperty('flavour', flavour), [updateCakeProperty]);
  const setFrosting = useCallback((frosting) => updateCakeProperty('frosting', frosting), [updateCakeProperty]);
  const setFrostingColor = useCallback(
    (color) => updateCakeProperty('frostingColor', color),
    [updateCakeProperty]
  );
  const setIcingStyle = useCallback(
    (style) => updateCakeProperty('icingStyle', style),
    [updateCakeProperty]
  );

  // Message customization
  const updateMessage = useCallback(
    (updates) => {
      setCake((prev) => {
        let x = updates.x !== undefined ? updates.x : prev.message?.x;
        let y = updates.y !== undefined ? updates.y : prev.message?.y;
        let x3d = updates.x3d !== undefined ? updates.x3d : prev.message?.x3d;
        let z3d = updates.z3d !== undefined ? updates.z3d : prev.message?.z3d;

        if (updates.x3d !== undefined && updates.z3d !== undefined) {
          x = Math.round(250 + updates.x3d * 95);
          y = Math.round(165 + updates.z3d * 95);
        } else if (updates.x !== undefined && updates.y !== undefined) {
          x3d = +( (updates.x - 250) / 95 ).toFixed(3);
          z3d = +( (updates.y - 165) / 95 ).toFixed(3);
        }

        return {
          ...prev,
          message: {
            ...prev.message,
            ...updates,
            x,
            y,
            x3d,
            z3d
          }
        };
      });
    },
    [setCake]
  );

  // Add decoration (supports both 3D raycast coordinates and 2D canvas drop)
  const addDecoration = useCallback(
    (item, position = null) => {
      const newInstanceId = `dec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      let targetX3d = position?.x3d;
      let targetY3d = position?.y3d ?? 0.74;
      let targetZ3d = position?.z3d;

      if (targetX3d === undefined || targetZ3d === undefined) {
        if (position?.x !== undefined && position?.y !== undefined) {
          const p3d = canvas2DTo3D(position.x, position.y);
          targetX3d = p3d.x3d;
          targetZ3d = p3d.z3d;
        } else {
          // Place cleanly on top surface avoiding center text overlap
          const angle = Math.random() * Math.PI * 2;
          const dist = 0.35 + Math.random() * 0.42;
          targetX3d = +(Math.cos(angle) * dist).toFixed(3);
          targetZ3d = +(Math.sin(angle) * dist).toFixed(3);
        }
      }

      const { x, y } = space3DTo2D(targetX3d, targetZ3d);

      const newDeco = {
        instanceId: newInstanceId,
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        x,
        y,
        x3d: targetX3d,
        y3d: targetY3d,
        z3d: targetZ3d,
        width: item.defaultWidth || 48,
        height: item.defaultHeight || 48,
        rotation: Math.floor(Math.random() * 30 - 15),
        scale: 1,
        scaleX: 1,
        scaleY: 1
      };

      setCake((prev) => ({
        ...prev,
        decorations: [...(prev.decorations || []), newDeco]
      }));

      setSelectedId(newInstanceId);
      return newInstanceId;
    },
    [setCake]
  );

  // Update existing decoration attributes (e.g., moved, rotated, scaled)
  const updateDecoration = useCallback(
    (instanceId, attrs) => {
      setCake((prev) => ({
        ...prev,
        decorations: (prev.decorations || []).map((dec) => {
          if (dec.instanceId === instanceId) {
            const updated = { ...dec, ...attrs };
            if (attrs.x3d !== undefined && attrs.z3d !== undefined) {
              const p2d = space3DTo2D(attrs.x3d, attrs.z3d);
              updated.x = p2d.x;
              updated.y = p2d.y;
            } else if (attrs.x !== undefined && attrs.y !== undefined) {
              const p3d = canvas2DTo3D(attrs.x, attrs.y);
              updated.x3d = p3d.x3d;
              updated.z3d = p3d.z3d;
            }
            return updated;
          }
          return dec;
        })
      }));
    },
    [setCake]
  );

  // Delete decoration
  const deleteDecoration = useCallback(
    (idToDelete) => {
      const targetId = idToDelete || selectedId;
      if (!targetId) return;

      setCake((prev) => ({
        ...prev,
        decorations: (prev.decorations || []).filter((dec) => dec.instanceId !== targetId)
      }));

      if (selectedId === targetId) {
        setSelectedId(null);
      }
    },
    [selectedId, setCake]
  );

  // Duplicate decoration
  const duplicateDecoration = useCallback(
    (idToDuplicate) => {
      const targetId = idToDuplicate || selectedId;
      if (!targetId) return;

      setCake((prev) => {
        const source = (prev.decorations || []).find((dec) => dec.instanceId === targetId);
        if (!source) return prev;

        const newInstanceId = `dec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const offset3d = (Math.random() - 0.5) * 0.3;
        const duplicated = {
          ...source,
          instanceId: newInstanceId,
          x: source.x + 20,
          y: source.y + 20,
          x3d: (source.x3d ?? 0) + offset3d,
          z3d: (source.z3d ?? 0) + offset3d,
          rotation: (source.rotation || 0) + 15
        };

        setSelectedId(newInstanceId);
        return {
          ...prev,
          decorations: [...prev.decorations, duplicated]
        };
      });
    },
    [selectedId, setCake]
  );

  // Reset to default
  const resetCake = useCallback(() => {
    resetHistory(DEFAULT_CAKE_STATE);
    setSelectedId(null);
    setZoomLevel(1);
  }, [resetHistory]);

  // Load a complete configuration (e.g. from gallery or cart edit)
  const loadCakeConfig = useCallback(
    (newConfig) => {
      if (!newConfig) return;
      resetHistory({
        ...DEFAULT_CAKE_STATE,
        ...newConfig
      });
      setSelectedId(null);
      setZoomLevel(1);
    },
    [resetHistory]
  );

  // Clear only decorations
  const clearDecorations = useCallback(() => {
    setCake((prev) => ({
      ...prev,
      decorations: []
    }));
    setSelectedId(null);
  }, [setCake]);

  // Zoom controls
  const zoomIn = useCallback(() => setZoomLevel((z) => Math.min(1.8, +(z + 0.15).toFixed(2))), []);
  const zoomOut = useCallback(() => setZoomLevel((z) => Math.max(0.65, +(z - 0.15).toFixed(2))), []);
  const resetZoom = useCallback(() => setZoomLevel(1), []);

  return {
    cake,
    stageRef,
    selectedId,
    setSelectedId,
    zoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    setShape,
    setSize,
    setFlavour,
    setFrosting,
    setFrostingColor,
    setIcingStyle,
    updateMessage,
    addDecoration,
    updateDecoration,
    deleteDecoration,
    duplicateDecoration,
    clearDecorations,
    resetCake,
    loadCakeConfig,
    undo,
    redo,
    canUndo,
    canRedo
  };
};
