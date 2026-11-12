import React from 'react';
import { FLAVOURS, SIZES } from '../data/customizationOptions';
import { formatPrice } from '../utils/priceCalculator';
import { Users, Award } from 'lucide-react';

export const FlavourSelector = ({
  selectedFlavour,
  onSelectFlavour,
  selectedSize,
  onSelectSize
}) => {
  return (
    <div className="space-y-4">
      {/* Cake Size Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-cake-muted">
            2. Cake Size & Weight
          </label>
          <span className="text-[11px] text-cake-primary font-medium flex items-center gap-1">
            <Users className="w-3 h-3" />
            {SIZES.find((s) => s.id === selectedSize)?.serves}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = selectedSize === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => onSelectSize(size.id)}
                className={`py-2 px-1 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-cake-primary text-white border-cake-primary font-bold shadow-sm'
                    : 'bg-white border-cake-border/80 text-cake-text hover:bg-cake-light/50'
                }`}
              >
                <div className="text-xs">{size.label}</div>
                {size.extraFee > 0 && (
                  <div className={`text-[10px] ${isSelected ? 'text-white/90' : 'text-cake-muted'}`}>
                    +{size.extraFee}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sponge Flavour Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-cake-muted block">
          3. Artisan Sponge Flavour
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FLAVOURS.map((flavour) => {
            const isSelected = selectedFlavour === flavour.id;
            return (
              <button
                key={flavour.id}
                type="button"
                onClick={() => onSelectFlavour(flavour.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-cake-light border-cake-primary ring-2 ring-cake-primary/20 shadow-sm'
                    : 'bg-white border-cake-border/80 hover:border-cake-primary/40'
                }`}
              >
                {/* Crumb Color Swatch */}
                <div
                  className="w-5 h-5 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                  style={{ backgroundColor: flavour.crumbColor }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-cake-text truncate">
                    {flavour.name}
                  </div>
                  <div className="text-[11px] text-cake-muted">
                    {flavour.surcharge === 0 ? 'Included' : `+${formatPrice(flavour.surcharge)}`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
