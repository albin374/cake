import React from 'react';
import { FROSTINGS, ICING_STYLES } from '../data/customizationOptions';
import { FROSTING_COLORS } from '../data/cakePrices';
import { formatPrice } from '../utils/priceCalculator';
import { Check } from 'lucide-react';

export const FrostingSelector = ({
  selectedFrosting,
  onSelectFrosting,
  selectedColor,
  onSelectColor,
  selectedStyle,
  onSelectStyle
}) => {
  return (
    <div className="space-y-4">
      {/* Frosting Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-cake-muted block">
          4. Frosting Base
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FROSTINGS.map((frost) => {
            const isSelected = selectedFrosting === frost.id;
            return (
              <button
                key={frost.id}
                type="button"
                onClick={() => onSelectFrosting(frost.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cake-light border-cake-primary ring-2 ring-cake-primary/20 shadow-sm'
                    : 'bg-white border-cake-border/80 hover:border-cake-primary/40'
                }`}
              >
                <div className="text-xs font-semibold text-cake-text truncate">
                  {frost.name}
                </div>
                <div className="text-[11px] text-cake-muted">
                  {frost.surcharge === 0 ? 'Included' : `+${formatPrice(frost.surcharge)}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frosting Colors */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-cake-muted">
            5. Frosting Palette
          </label>
          <span className="text-xs font-medium text-cake-primary">
            {FROSTING_COLORS.find((c) => c.id === selectedColor)?.name}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {FROSTING_COLORS.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onSelectColor(color.id)}
                title={color.name}
                className={`h-10 rounded-xl border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-2 ring-cake-primary shadow-sm scale-105 border-cake-primary'
                    : 'border-cake-border hover:scale-102'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check
                    className="w-4 h-4 stroke-[3]"
                    style={{ color: color.textHex }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Icing Styles */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-cake-muted block">
          6. Artisanal Piping & Icing Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ICING_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onSelectStyle(style.id)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-cake-primary text-white border-cake-primary font-bold shadow-sm'
                    : 'bg-white border-cake-border/80 text-cake-text hover:bg-cake-light/40'
                }`}
              >
                <div className="text-xs font-medium">{style.name}</div>
                <div
                  className={`text-[10px] ${
                    isSelected ? 'text-white/90' : 'text-cake-muted'
                  }`}
                >
                  {style.surcharge === 0 ? 'Complimentary' : `+${formatPrice(style.surcharge)}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
