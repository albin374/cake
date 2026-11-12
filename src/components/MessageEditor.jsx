import React from 'react';
import { FONT_OPTIONS } from '../data/cakePrices';
import { Type, Sparkles } from 'lucide-react';

const MESSAGE_COLORS = [
  { id: 'dark', hex: '#63384B', name: 'Plum Choc' },
  { id: 'pink', hex: '#A02050', name: 'Ruby Pink' },
  { id: 'gold', hex: '#D97706', name: 'Pure Gold' },
  { id: 'white', hex: '#FFFFFF', name: 'Pure White' },
  { id: 'blue', hex: '#1E40AF', name: 'Royal Blue' },
  { id: 'green', hex: '#166534', name: 'Sage Green' }
];

export const MessageEditor = ({ message, onUpdateMessage }) => {
  const currentText = message?.text || '';
  const currentFont = message?.font || 'Dancing Script';
  const currentColor = message?.color || '#63384B';
  const currentSize = message?.size || 26;
  const maxLength = 32;

  const handleTextChange = (e) => {
    const text = e.target.value.slice(0, maxLength);
    onUpdateMessage({ text });
  };

  return (
    <div className="space-y-3 bg-cake-cream/40 p-3.5 rounded-2xl border border-cake-border/70">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-cake-muted flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-cake-primary" />
          <span>7. Top Inscription Message</span>
        </label>
        <span
          className={`text-[11px] font-mono ${
            currentText.length >= maxLength ? 'text-red-500 font-bold' : 'text-cake-muted'
          }`}
        >
          {currentText.length}/{maxLength}
        </span>
      </div>

      {/* Input */}
      <div>
        <input
          type="text"
          value={currentText}
          onChange={handleTextChange}
          placeholder="e.g. Happy 25th Birthday Chloe! 💖"
          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-cake-border/80 focus:outline-none focus:ring-2 focus:ring-cake-primary/40 text-cake-text font-medium"
        />
        <div className="flex justify-between items-center mt-1 px-1 text-[10px] text-cake-muted">
          <span>Complimentary piping for messages &lt; 15 chars</span>
          {currentText && (
            <button
              onClick={() => onUpdateMessage({ text: '' })}
              className="text-cake-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Font Family selector */}
      <div className="grid grid-cols-2 gap-1.5">
        {FONT_OPTIONS.map((f) => {
          const isSelected = currentFont === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onUpdateMessage({ font: f.id })}
              className={`p-2 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-cake-primary text-white border-cake-primary font-bold shadow-sm'
                  : 'bg-white border-cake-border/70 text-cake-text hover:bg-cake-light/50'
              }`}
            >
              <span className={`text-xs block truncate ${f.style}`}>
                {f.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Text Color Swatches & Font Size Slider */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-cake-muted font-medium">Color:</span>
          <div className="flex gap-1">
            {MESSAGE_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onUpdateMessage({ color: c.hex })}
                className={`w-5 h-5 rounded-full border border-black/15 transition-transform ${
                  currentColor === c.hex ? 'scale-125 ring-2 ring-cake-primary shadow-sm' : ''
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Font size control */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[11px] text-cake-muted">Size:</span>
          <input
            type="range"
            min="18"
            max="36"
            value={currentSize}
            onChange={(e) => onUpdateMessage({ size: Number(e.target.value) })}
            className="w-16 accent-cake-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
