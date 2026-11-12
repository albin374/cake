import { useState, useEffect, useCallback } from 'react';
import { getStoredCart, setStoredCart } from '../utils/storage';

export const useCart = () => {
  const [items, setItems] = useState(() => getStoredCart());

  useEffect(() => {
    setStoredCart(items);
  }, [items]);

  const addToCart = useCallback((cakeConfig, previewImage, priceBreakdown, quantity = 1) => {
    const newItem = {
      cartId: `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      config: cakeConfig,
      previewImage,
      priceBreakdown,
      quantity: Math.max(1, quantity),
      unitPrice: priceBreakdown.total,
    };

    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const updateQuantity = useCallback((cartId, newQty) => {
    if (newQty <= 0) {
      setItems((prev) => prev.filter((item) => item.cartId !== cartId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQty } : item
      )
    );
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
    cartSubtotal,
  };
};
