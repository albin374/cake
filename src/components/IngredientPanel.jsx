import React, { useState, useMemo } from 'react';
import { INGREDIENTS, CATEGORIES } from '../data/ingredients';
import { formatPrice } from '../utils/priceCalculator';
import { Search, Sparkles, Plus } from 'lucide-react';

export const IngredientPanel = ({ onAddDecoration }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return INGREDIENTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-cake-soft border border-cake-border/80 flex flex-col h-full max-h-[85vh]">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-xl font-bold text-cake-text flex items-center gap-2">
            <span>Toppings & Treats</span>
            <span className="text-xs font-normal font-sans bg-cake-light text-cake-dark px-2.5 py-0.5 rounded-full border border-pink-200">
              {filteredItems.length} items
            </span>
          </h2>
        </div>
        <p className="text-xs text-cake-muted">
          Drag onto the cake or tap + to place immediately
        </p>

        {/* Search Input */}
        <div className="relative mt-2.5">
          <Search className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search strawberries, bows, candles..."
            className="w-full pl-9 pr-7 py-2 text-xs rounded-xl bg-cake-cream/80 border border-cake-border/80 focus:outline-none focus:ring-2 focus:ring-cake-primary/40 focus:bg-white text-cake-text placeholder:text-cake-muted/70 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-cake-muted hover:text-cake-dark"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs: Clean 2x2 Grid with zero overlapping / scrollbar bugs */}
      <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-cake-cream/70 rounded-2xl mb-3 border border-cake-border/70">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 text-center truncate ${
                isActive
                  ? 'bg-cake-primary text-white shadow-sm ring-1 ring-cake-primary font-bold'
                  : 'bg-white/80 text-cake-text hover:bg-white hover:text-cake-dark'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grid of Ingredient Cards: pr-3 prevents scrollbar from clipping cards */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2.5 grid grid-cols-2 gap-2.5 min-h-[300px]">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center text-center p-6 text-cake-muted">
            <Sparkles className="w-8 h-8 text-pink-300 mb-2" />
            <p className="text-sm font-medium">No toppings found</p>
            <p className="text-xs text-cake-muted/80 mt-1">Try another search term</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={() => onAddDecoration(item)}
              className="group relative bg-cake-cream/30 hover:bg-white p-2.5 rounded-2xl border border-cake-border/80 hover:border-cake-primary/50 shadow-xs hover:shadow-cake-soft transition-all duration-200 cursor-grab active:cursor-grabbing flex flex-col items-center text-center"
            >
              {/* Asset Image */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-1.5 p-1 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                />
              </div>

              {/* Title: 2 lines allowed with neat flex centering */}
              <span className="text-[11px] font-semibold text-cake-text group-hover:text-cake-primary transition-colors line-clamp-2 h-7 flex items-center justify-center leading-tight">
                {item.name}
              </span>

              {/* Bottom Price & Add Action */}
              <div className="w-full flex items-center justify-between mt-1 pt-1 border-t border-cake-border/40">
                <span className="text-[11px] font-bold text-cake-dark">
                  +{formatPrice(item.price)}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddDecoration(item);
                  }}
                  className="w-5 h-5 rounded-full bg-cake-light hover:bg-cake-primary hover:text-white text-cake-primary flex items-center justify-center transition-colors shadow-xs"
                  title="Add to cake"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-2.5 border-t border-cake-border/50 text-center text-[11px] text-cake-muted flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cake-primary" />
        <span>Tap any treat or drag onto cake!</span>
      </div>
    </div>
  );
};
