import { BASE_CAKE_PRICES, SIZE_PRICES, FLAVOUR_PRICES, FROSTING_PRICES, ICING_STYLE_PRICES, FROSTING_COLORS, FONT_OPTIONS } from './cakePrices';

export const SHAPES = [
  { id: 'round', name: 'Round Tier', icon: 'Circle', desc: 'Timeless studio cylinder on marble board' },
  { id: 'square', name: 'Square Modern', icon: 'Square', desc: 'Chic geometric cube with crisp edges' },
  { id: 'heart', name: 'Romantic Heart', icon: 'Heart', desc: 'Sweetheart sculpted curves' },
  { id: 'rectangle', name: 'Sheet Rectangle', icon: 'RectangleHorizontal', desc: 'Grand celebratory slab cut' },
];

export const FLAVOURS = Object.entries(FLAVOUR_PRICES).map(([id, item]) => ({
  id,
  name: item.name,
  surcharge: item.surcharge,
  crumbColor: item.crumbColor,
  sideColor: item.sideColor,
}));

export const SIZES = Object.entries(SIZE_PRICES).map(([id, item]) => ({
  id,
  label: item.label,
  serves: item.serves,
  extraFee: item.extraFee,
  multiplier: item.multiplier,
}));

export const FROSTINGS = Object.entries(FROSTING_PRICES).map(([id, item]) => ({
  id,
  name: item.name,
  surcharge: item.surcharge,
}));

export const ICING_STYLES = Object.entries(ICING_STYLE_PRICES).map(([id, item]) => ({
  id,
  name: item.name,
  surcharge: item.surcharge,
}));

export const DEFAULT_CAKE_STATE = {
  shape: 'round',
  size: '1',
  flavour: 'vanilla',
  frosting: 'vanilla',
  frostingColor: 'pink',
  icingStyle: 'smooth',
  message: {
    text: 'Happy Birthday!',
    font: 'Dancing Script',
    color: '#63384B',
    size: 26,
    x: 250,
    y: 200,
    rotation: 0
  },
  decorations: [
    {
      instanceId: 'dec-1',
      id: 'strawberry',
      name: 'Fresh Garden Strawberry',
      price: 12,
      x: 220,
      y: 185,
      width: 52,
      height: 62,
      rotation: -10,
      scaleX: 1,
      scaleY: 1,
      category: 'fruits'
    },
    {
      instanceId: 'dec-2',
      id: 'strawberry',
      name: 'Fresh Garden Strawberry',
      price: 12,
      x: 280,
      y: 185,
      width: 52,
      height: 62,
      rotation: 12,
      scaleX: 1,
      scaleY: 1,
      category: 'fruits'
    },
    {
      instanceId: 'dec-3',
      id: 'blueberry',
      name: 'Wild Blueberries Cluster',
      price: 9,
      x: 250,
      y: 165,
      width: 44,
      height: 48,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      category: 'fruits'
    }
  ]
};
