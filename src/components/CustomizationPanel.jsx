import React, { useState } from 'react';
import { CakeShapeSelector } from './CakeShapeSelector';
import { FlavourSelector } from './FlavourSelector';
import { FrostingSelector } from './FrostingSelector';
import { MessageEditor } from './MessageEditor';
import { PriceSummary } from './PriceSummary';
import { SlidersHorizontal, Layers, Palette, MessageSquare } from 'lucide-react';

export const CustomizationPanel = ({
  cake,
  setShape,
  setSize,
  setFlavour,
  setFrosting,
  setFrostingColor,
  setIcingStyle,
  updateMessage,
  onAddToCart,
  onDownloadImage,
  onResetCake,
  isAdding
}) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Options', icon: SlidersHorizontal },
    { id: 'base', label: 'Shape & Size', icon: Layers },
    { id: 'frosting', label: 'Frosting & Look', icon: Palette },
    { id: 'message', label: 'Inscription', icon: MessageSquare }
  ];

  return (
    <div className="flex flex-col h-full max-h-[85vh] space-y-4">
      {/* Scrollable Customization Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-cake-soft border border-cake-border/60 flex-1 overflow-y-auto">
        <div className="mb-4">
          <h2 className="font-display text-xl font-bold text-cake-text">
            Customization Studio
          </h2>
          <p className="text-xs text-cake-muted mt-0.5">
            Personalize tier, flavours, colors & artisan lettering
          </p>

          {/* Quick Filter Sub-Tabs for mobile/compact viewing */}
          <div className="flex gap-1 mt-3 p-1 bg-cake-light/70 rounded-2xl overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 flex-1 justify-center ${
                    isActive
                      ? 'bg-cake-primary text-white shadow-sm font-semibold'
                      : 'text-cake-text hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content sections based on active tab */}
        <div className="space-y-5">
          {(activeTab === 'all' || activeTab === 'base') && (
            <>
              <CakeShapeSelector
                selectedShape={cake.shape}
                onSelectShape={setShape}
              />
              <FlavourSelector
                selectedFlavour={cake.flavour}
                onSelectFlavour={setFlavour}
                selectedSize={cake.size}
                onSelectSize={setSize}
              />
            </>
          )}

          {(activeTab === 'all' || activeTab === 'frosting') && (
            <FrostingSelector
              selectedFrosting={cake.frosting}
              onSelectFrosting={setFrosting}
              selectedColor={cake.frostingColor}
              onSelectColor={setFrostingColor}
              selectedStyle={cake.icingStyle}
              onSelectStyle={setIcingStyle}
            />
          )}

          {(activeTab === 'all' || activeTab === 'message') && (
            <MessageEditor
              message={cake.message}
              onUpdateMessage={updateMessage}
            />
          )}
        </div>
      </div>

      {/* Dynamic Price Summary and CTA */}
      <PriceSummary
        cake={cake}
        onAddToCart={onAddToCart}
        onDownloadImage={onDownloadImage}
        onResetCake={onResetCake}
        isAdding={isAdding}
      />
    </div>
  );
};
