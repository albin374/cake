import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { formatPrice } from '../utils/priceCalculator';
import { ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, cartSubtotal, cartCount } =
    useCartContext();

  const handleEditCake = (cakeConfig) => {
    navigate('/customize', { state: { cakeConfig } });
  };

  // Free delivery over 350 AED or standard chilled delivery fee
  const deliveryFee = cartSubtotal >= 350 || cartSubtotal === 0 ? 0 : 30;
  const grandTotal = cartSubtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gingham-soft py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cake-light border border-pink-200 text-cake-dark text-xs font-bold mb-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-cake-primary" />
              <span>Shopping Cart</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-cake-text">
              Your Custom Cake Basket
            </h1>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-cake-muted hover:text-red-500 font-semibold self-start sm:self-auto py-2 px-3 rounded-xl hover:bg-red-50 transition-colors"
            >
              Clear Entire Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-8 sm:p-14 text-center shadow-cake-soft border border-cake-border/80 max-w-xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-cake-light mx-auto flex items-center justify-center text-5xl mb-6 shadow-inner">
              🍰
            </div>
            <h2 className="font-display text-2xl font-bold text-cake-text mb-2">
              Your cake basket is empty
            </h2>
            <p className="text-sm text-cake-muted max-w-md mx-auto mb-8">
              You haven't crafted a custom cake yet! Jump into our interactive 2D cake studio or pick a bestseller from our gallery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/customize"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cake-primary hover:bg-cake-dark text-white text-xs font-bold shadow-cake-soft transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Designing Now</span>
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cake-cream hover:bg-cake-light text-cake-text text-xs font-bold border border-cake-border/80 transition-all"
              >
                Browse Cake Gallery
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Items and Order Summary Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List of Custom Cakes (Col 1-8) */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onEdit={handleEditCake}
                />
              ))}

              {/* Continue Shopping Link */}
              <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                <Link
                  to="/customize"
                  className="text-cake-primary hover:text-cake-dark flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Customize Another Cake</span>
                </Link>
                <Link
                  to="/gallery"
                  className="text-cake-muted hover:text-cake-text"
                >
                  Explore Gallery Designs →
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar (Col 9-12) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-cake-soft border border-cake-border/80 sticky top-28">
              <h2 className="font-display text-xl font-bold text-cake-text mb-4 pb-3 border-b border-cake-border/60">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-cake-text mb-5">
                <div className="flex justify-between">
                  <span className="text-cake-muted">Cakes ({cartCount} {cartCount === 1 ? 'item' : 'items'}):</span>
                  <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-cake-muted flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-cake-primary" />
                    Chilled UAE Delivery:
                  </span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">Free</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[11px] text-cake-muted bg-cake-light/70 p-2.5 rounded-xl border border-pink-100">
                    💡 Add {formatPrice(350 - cartSubtotal)} more for <b>Free Temperature-Controlled Delivery</b>!
                  </p>
                )}

                <div className="pt-3 border-t border-dashed border-cake-border flex items-baseline justify-between text-cake-dark">
                  <span className="font-bold text-sm">Estimated Total:</span>
                  <span className="font-display text-2xl font-black">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-2xl bg-cake-primary hover:bg-cake-dark active:scale-[0.98] text-white font-bold text-sm shadow-cake-soft hover:shadow-cake-hover transition-all flex items-center justify-center gap-2 mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 pt-3 border-t border-cake-border/50 text-[11px] text-cake-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cake-primary flex-shrink-0" />
                  <span>Handcrafted fresh on your delivery morning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cake-primary flex-shrink-0" />
                  <span>Chilled delivery vans to preserve every delicate detail</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
