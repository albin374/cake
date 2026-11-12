import { useState, useEffect, useCallback, useRef } from 'react';
import { DEFAULT_CAKE_STATE } from '../data/customizationOptions';
import { getStoredBuilderState, setStoredBuilderState } from '../utils/storage';
import { useUndoRedo } from './useUndoRedo';

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
  const updateCakeProperty = useCallback((key, value) => {
    setCake((prev) => ({
      ...prev,
      [key]: value
    }));
  }, [setCake]);

  // Shapes & flavours
  const setShape = useCallback((shape) => updateCakeProperty('shape', shape), [updateCakeProperty]);
  const setSize = useCallback((size) => updateCakeProperty('size', size), [updateCakeProperty]);
  const setFlavour = useCallback((flavour) => updateCakeProperty('flavour', flavour), [updateCakeProperty]);
  const setFrosting = useCallback((frosting) => updateCakeProperty('frosting', frosting), [updateCakeProperty]);
  const setFrostingColor = useCallback((color) => updateCakeProperty('frostingColor', color), [updateCakeProperty]);
  const setIcingStyle = useCallback((style) => updateCakeProperty('icingStyle', style), [updateCakeProperty]);

  // Message customization
  const updateMessage = useCallback((updates) => {
    setCake((prev) => ({
      ...prev,
      message: {
        ...prev.message,
        ...updates
      }
    }));
  }, [setCake]);

  // Add decoration (from drag or click)
  const addDecoration = useCallback((item, position = null) => {
    const newInstanceId = `dec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Default center placement on top surface if position not provided
    const targetX = position?.x ?? Math.round(250 + (Math.random() * 40 - 20));
    const targetY = position?.y ?? Math.round(190 + (Math.random() * 30 - 15));

    const newDeco = {
      instanceId: newInstanceId,
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      x: targetX,
      y: targetY,
      width: item.defaultWidth || 48,
      height: item.defaultHeight || 48,
      rotation: Math.floor(Math.random() * 20 - 10),
      scaleX: 1,
      scaleY: 1
    };

    setCake((prev) => ({
      ...prev,
      decorations: [...(prev.decorations || []), newDeco]
    }));

    setSelectedId(newInstanceId);
    return newInstanceId;
  }, [setCake]);

  // Update existing decoration attributes (e.g., dragged or transformed)
  const updateDecoration = useCallback((instanceId, attrs) => {
    setCake((prev) => ({
      ...prev,
      decorations: (prev.decorations || []).map((dec) => {
        if (dec.instanceId === instanceId) {
          return { ...dec, ...attrs };
        }
        return dec;
      })
    }));
  }, [setCake]);

  // Delete decoration
  const deleteDecoration = useCallback((idToDelete) => {
    const targetId = idToDelete || selectedId;
    if (!targetId) return;

    setCake((prev) => ({
      ...prev,
      decorations: (prev.decorations || []).filter((dec) => dec.instanceId !== targetId)
    }));

    if (selectedId === targetId) {
      setSelectedId(null);
    }
  }, [selectedId, setCake]);

  // Duplicate decoration
  const duplicateDecoration = useCallback((idToDuplicate) => {
    const targetId = idToDuplicate || selectedId;
    if (!targetId) return;

    setCake((prev) => {
      const source = (prev.decorations || []).find((dec) => dec.instanceId === targetId);
      if (!source) return prev;

      const newInstanceId = `dec-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const duplicated = {
        ...source,
        instanceId: newInstanceId,
        x: source.x + 20,
        y: source.y + 20
      };

      setSelectedId(newInstanceId);
      return {
        ...prev,
        decorations: [...prev.decorations, duplicated]
      };
    });
  }, [selectedId, setCake]);

  // Reset to default
  const resetCake = useCallback(() => {
    resetHistory(DEFAULT_CAKE_STATE);
    setSelectedId(null);
    setZoomLevel(1);
  }, [resetHistory]);

  // Load a complete configuration (e.g. from gallery or cart edit)
  const loadCakeConfig = useCallback((newConfig) => {
    if (!newConfig) return;
    resetHistory({
      ...DEFAULT_CAKE_STATE,
      ...newConfig
    });
    setSelectedId(null);
    setZoomLevel(1);
  }, [resetHistory]);

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
