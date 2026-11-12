import React from 'react';
import { formatPrice } from '../utils/priceCalculator';
import { Trash2, Edit3, Plus, Minus, Cake as CakeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartItem = ({ item, onUpdateQuantity, onRemove, onEdit }) => {
  const navigate = useNavigate();
  const { config, previewImage, unitPrice, quantity, cartId } = item;

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(config);
    } else {
      navigate('/customize');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-cake-soft border border-cake-border/70 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-cake-primary/40">
      {/* Thumbnail Preview */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cake-cream/70 border border-cake-border/70 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Custom cake preview"
            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
          />
        ) : (
          <CakeIcon className="w-10 h-10 text-cake-primary/60" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-cake-text capitalize">
              {config.shape} Tier Custom Cake ({config.size} KG)
            </h3>
            <p className="text-xs text-cake-muted mt-0.5">
              <span className="font-semibold text-cake-text capitalize">{config.flavour}</span> sponge •{' '}
              <span className="capitalize">{config.frostingColor}</span> {config.frosting} ({config.icingStyle})
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(cartId)}
            className="text-cake-muted hover:text-red-500 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Message preview pill */}
        {config.message?.text && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cake-light border border-pink-200 text-xs text-cake-dark font-medium">
            <span>💌 Inscription:</span>
            <span className="font-serif italic font-semibold">"{config.message.text}"</span>
          </div>
        )}

        {/* Decorations summary */}
        {config.decorations && config.decorations.length > 0 && (
          <p className="text-[11px] text-cake-muted mt-1.5 line-clamp-1">
            Toppings ({config.decorations.length}):{' '}
            {config.decorations.map((d) => d.name).join(', ')}
          </p>
        )}

        {/* Actions & Pricing Row */}
        <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-cake-border/50">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-cake-cream border border-cake-border rounded-xl p-1">
              <button
                type="button"
                onClick={() => onUpdateQuantity(cartId, quantity - 1)}
                className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-cake-text hover:bg-cake-light transition-colors"
                title="Decrease"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-3 text-xs font-bold text-cake-text font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(cartId, quantity + 1)}
                className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-cake-text hover:bg-cake-light transition-colors"
                title="Increase"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleEditClick}
              className="text-xs text-cake-primary hover:text-cake-dark font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-cake-light transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Modify</span>
            </button>
          </div>

          {/* Item Price */}
          <div className="text-right">
            <div className="text-[11px] text-cake-muted">
              {formatPrice(unitPrice)} each
            </div>
            <div className="text-base sm:text-lg font-bold text-cake-dark font-display">
              {formatPrice(unitPrice * quantity)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
