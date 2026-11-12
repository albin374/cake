import React from 'react';
import { SHAPES } from '../data/customizationOptions';
import { BASE_CAKE_PRICES } from '../data/cakePrices';
import { formatPrice } from '../utils/priceCalculator';
import { Circle, Square, Heart, RectangleHorizontal } from 'lucide-react';

const shapeIcons = {
  Circle: Circle,
  Square: Square,
  Heart: Heart,
  RectangleHorizontal: RectangleHorizontal
};

export const CakeShapeSelector = ({ selectedShape, onSelectShape }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-cake-muted block">
        1. Select Cake Tier Shape
      </label>
      <div className="grid grid-cols-2 gap-2">
        {SHAPES.map((shape) => {
          const IconComponent = shapeIcons[shape.icon] || Circle;
          const isSelected = selectedShape === shape.id;
          const basePrice = BASE_CAKE_PRICES[shape.id] || 120;

          return (
            <button
              key={shape.id}
              type="button"
              onClick={() => onSelectShape(shape.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-start gap-2.5 ${
                isSelected
                  ? 'bg-cake-light border-cake-primary ring-2 ring-cake-primary/20 shadow-sm'
                  : 'bg-white border-cake-border/80 hover:border-cake-primary/50 hover:bg-cake-cream/30'
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-colors ${
                  isSelected
                    ? 'bg-cake-primary text-white'
                    : 'bg-cake-cream text-cake-primary'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cake-text truncate">
                    {shape.name}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-cake-dark block mt-0.5">
                  from {formatPrice(basePrice)}
                </span>
                <span className="text-[10px] text-cake-muted line-clamp-1 mt-0.5">
                  {shape.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
