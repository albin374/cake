import React, { useMemo } from 'react';
import { calculateCakePrice, formatPrice } from '../utils/priceCalculator';
import { ShoppingBag, Download, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export const PriceSummary = ({
  cake,
  onAddToCart,
  onDownloadImage,
  onResetCake,
  isAdding = false
}) => {
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const pricing = useMemo(() => calculateCakePrice(cake), [cake]);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-cake-soft border border-cake-border/60">
      {/* Price Header */}
      <div className="flex items-end justify-between mb-3 pb-3 border-b border-cake-border/60">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-cake-muted block">
            Estimated Total
          </span>
          <div className="font-display text-2xl sm:text-3xl font-bold text-cake-dark">
            {formatPrice(pricing.total)}
          </div>
        </div>

        {/* Toggle Breakdown */}
        <button
          type="button"
          onClick={() => setShowBreakdown((prev) => !prev)}
          className="text-xs text-cake-primary hover:text-cake-dark font-medium flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-cake-light transition-colors"
        >
          <span>{showBreakdown ? 'Hide details' : 'View breakdown'}</span>
          {showBreakdown ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Itemized Breakdown (Accordion) */}
      {showBreakdown && (
        <div className="space-y-1.5 py-2 mb-3 text-xs border-b border-cake-border/50 text-cake-text animate-fade-in">
          <div className="flex justify-between py-0.5">
            <span className="text-cake-muted">Base Tier ({cake.shape}):</span>
            <span className="font-medium">{formatPrice(pricing.basePrice)}</span>
          </div>

          {pricing.sizeSurcharge > 0 && (
            <div className="flex justify-between py-0.5">
              <span className="text-cake-muted">Size Upgrade ({cake.size} KG):</span>
              <span className="font-medium">+{formatPrice(pricing.sizeSurcharge)}</span>
            </div>
          )}

          {pricing.customizationCharges > 0 && (
            <div className="flex justify-between py-0.5">
              <span className="text-cake-muted">Flavour & Frosting Styling:</span>
              <span className="font-medium">+{formatPrice(pricing.customizationCharges)}</span>
            </div>
          )}

          <div className="flex justify-between py-0.5">
            <span className="text-cake-muted">
              Toppings & Accents ({pricing.itemCount} items):
            </span>
            <span className="font-medium">+{formatPrice(pricing.decorationsCharge)}</span>
          </div>

          <div className="flex justify-between pt-1 border-t border-dashed border-cake-border text-cake-dark font-semibold">
            <span>Subtotal (AED):</span>
            <span>{formatPrice(pricing.total)}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={isAdding}
          className="w-full py-3.5 px-4 rounded-2xl bg-cake-primary hover:bg-cake-dark active:scale-[0.98] text-white font-bold text-sm shadow-cake-soft hover:shadow-cake-hover transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isAdding ? 'Adding to Cart...' : 'Add Customized Cake to Cart'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onDownloadImage}
            className="py-2.5 px-3 rounded-xl border border-cake-border/80 hover:border-cake-primary bg-cake-cream/40 hover:bg-white text-xs font-semibold text-cake-text flex items-center justify-center gap-1.5 transition-colors"
            title="Download PNG snapshot of your cake"
          >
            <Download className="w-3.5 h-3.5 text-cake-primary" />
            <span>Save Image</span>
          </button>

          <button
            type="button"
            onClick={onResetCake}
            className="py-2.5 px-3 rounded-xl border border-cake-border/80 hover:border-red-300 bg-cake-cream/40 hover:bg-red-50 text-xs font-semibold text-cake-muted hover:text-red-600 flex items-center justify-center gap-1.5 transition-colors"
            title="Reset to blank standard cake"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Cake</span>
          </button>
        </div>
      </div>
    </div>
  );
};
