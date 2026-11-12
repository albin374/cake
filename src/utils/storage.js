const CART_STORAGE_KEY = 'sweetart_cake_cart_v1';
const BUILDER_STORAGE_KEY = 'sweetart_cake_builder_empty_v3';
const RECENT_ORDERS_KEY = 'sweetart_recent_orders_v1';

export const getStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load cart from storage', e);
    return [];
  }
};

export const setStoredCart = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to storage', e);
  }
};

export const getStoredBuilderState = () => {
  try {
    const raw = localStorage.getItem(BUILDER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load saved builder state', e);
    return null;
  }
};

export const setStoredBuilderState = (cakeState) => {
  try {
    localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(cakeState));
  } catch (e) {
    console.error('Failed to save builder state', e);
  }
};

export const clearStoredBuilderState = () => {
  try {
    localStorage.removeItem(BUILDER_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear builder state', e);
  }
};

export const saveOrderRecord = (order) => {
  try {
    const existing = getRecentOrders();
    existing.unshift(order);
    localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(existing.slice(0, 20)));
  } catch (e) {
    console.error('Failed to save order record', e);
  }
};

export const getRecentOrders = () => {
  try {
    const raw = localStorage.getItem(RECENT_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};
