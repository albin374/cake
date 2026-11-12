import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCakeBuilder } from '../hooks/useCakeBuilder';
import { useCartContext } from '../context/CartContext';
import { CakeCanvas } from '../components/CakeCanvas';
import { IngredientPanel } from '../components/IngredientPanel';
import { CustomizationPanel } from '../components/CustomizationPanel';
import { exportStageToDataUrl, downloadCakeImage } from '../utils/canvasExport';
import { calculateCakePrice } from '../utils/priceCalculator';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Trash2,
  Download,
  ShoppingBag,
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';

export const CakeBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  const {
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
  } = useCakeBuilder();

  const [activeMobileView, setActiveMobileView] = useState('canvas'); // 'canvas' | 'decorations' | 'settings'
  const [toastMessage, setToastMessage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // If redirected with a specific template from Gallery or Cart
  useEffect(() => {
    if (location.state?.cakeConfig) {
      loadCakeConfig(location.state.cakeConfig);
      // clean state
      window.history.replaceState({}, document.title);
      showToast('Loaded cake design into your studio!');
    }
  }, [location.state, loadCakeConfig]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    // Take a snapshot from the Konva stage
    const previewDataUrl = exportStageToDataUrl(stageRef, 1.5);
    const pricing = calculateCakePrice(cake);

    setTimeout(() => {
      addToCart(cake, previewDataUrl, pricing, 1);
      setIsAdding(false);
      showToast('🎉 Your custom cake was added to your cart!');
    }, 250);
  };

  const handleDownloadSnapshot = () => {
    const success = downloadCakeImage(
      stageRef,
      `sweetart-${cake.shape}-cake-${cake.flavour}.png`
    );
    if (success) {
      showToast('📸 High-resolution cake image downloaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gingham-soft py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-cake-dark text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto">
        {/* Studio Top Banner / Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 mb-5 shadow-cake-soft border border-cake-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cake-primary bg-cake-light px-2.5 py-0.5 rounded-full border border-pink-200">
                Studio Workspace
              </span>
              <span className="text-xs text-cake-muted hidden sm:inline">
                Interactive 2D Real-Time Atelier
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-cake-text mt-1">
              Design Your Signature Cake
            </h1>
          </div>

          {/* Quick Canvas Controls & Action bar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {/* Undo / Redo */}
            <div className="flex items-center bg-cake-cream rounded-2xl border border-cake-border/80 p-1">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="p-2 rounded-xl hover:bg-white text-cake-text disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="p-2 rounded-xl hover:bg-white text-cake-text disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-cake-cream rounded-2xl border border-cake-border/80 p-1">
              <button
                type="button"
                onClick={zoomOut}
                className="p-2 rounded-xl hover:bg-white text-cake-text transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="px-2 text-xs font-mono font-bold text-cake-muted hover:text-cake-text"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="p-2 rounded-xl hover:bg-white text-cake-text transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Selected item actions */}
            {selectedId && (
              <div className="flex items-center bg-cake-light rounded-2xl border border-pink-200 p-1">
                <button
                  type="button"
                  onClick={() => duplicateDecoration(selectedId)}
                  className="p-2 rounded-xl hover:bg-white text-cake-primary transition-colors"
                  title="Duplicate selected item"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteDecoration(selectedId)}
                  className="p-2 rounded-xl hover:bg-white text-red-500 transition-colors"
                  title="Delete selected item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Export Snapshot */}
            <button
              type="button"
              onClick={handleDownloadSnapshot}
              className="p-2.5 rounded-2xl bg-white hover:bg-cake-cream border border-cake-border text-cake-text transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
              title="Download PNG Snapshot"
            >
              <Download className="w-4 h-4 text-cake-primary" />
              <span className="hidden sm:inline">Export PNG</span>
            </button>

            {/* Fast Cart CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="py-2.5 px-4 rounded-2xl bg-cake-primary hover:bg-cake-dark active:scale-95 text-white text-xs font-bold shadow-cake-soft flex items-center gap-1.5 transition-all ml-auto md:ml-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>

        {/* Mobile View Toggle Switcher (Visible only on < lg screens) */}
        <div className="lg:hidden flex bg-white p-1 rounded-2xl border border-cake-border mb-4 shadow-sm">
          <button
            onClick={() => setActiveMobileView('decorations')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeMobileView === 'decorations'
                ? 'bg-cake-primary text-white shadow-xs'
                : 'text-cake-text'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Toppings</span>
          </button>
          <button
            onClick={() => setActiveMobileView('canvas')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeMobileView === 'canvas'
                ? 'bg-cake-primary text-white shadow-xs'
                : 'text-cake-text'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cake Canvas</span>
          </button>
          <button
            onClick={() => setActiveMobileView('settings')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeMobileView === 'settings'
                ? 'bg-cake-primary text-white shadow-xs'
                : 'text-cake-text'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Options & Price</span>
          </button>
        </div>

        {/* THREE-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT PANEL: Decorations & Ingredients (Col 1-3) */}
          <div
            className={`lg:col-span-3 lg:block ${
              activeMobileView === 'decorations' ? 'block' : 'hidden'
            }`}
          >
            <IngredientPanel onAddDecoration={addDecoration} />
          </div>

          {/* CENTER PANEL: Interactive Cake Canvas (Col 4-8) */}
          <div
            className={`lg:col-span-5 lg:block ${
              activeMobileView === 'canvas' ? 'block' : 'hidden'
            }`}
          >
            <div className="flex flex-col items-center">
              <CakeCanvas
                cake={cake}
                stageRef={stageRef}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                zoomLevel={zoomLevel}
                updateDecoration={updateDecoration}
                deleteDecoration={deleteDecoration}
                onDropItem={addDecoration}
              />
            </div>
          </div>

          {/* RIGHT PANEL: Customization Options & Dynamic Price (Col 9-12) */}
          <div
            className={`lg:col-span-4 lg:block ${
              activeMobileView === 'settings' ? 'block' : 'hidden'
            }`}
          >
            <CustomizationPanel
              cake={cake}
              setShape={setShape}
              setSize={setSize}
              setFlavour={setFlavour}
              setFrosting={setFrosting}
              setFrostingColor={setFrostingColor}
              setIcingStyle={setIcingStyle}
              updateMessage={updateMessage}
              onAddToCart={handleAddToCart}
              onDownloadImage={handleDownloadSnapshot}
              onResetCake={resetCake}
              isAdding={isAdding}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
