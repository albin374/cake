import { BASE_CAKE_PRICES, SIZE_PRICES, FLAVOUR_PRICES, FROSTING_PRICES, ICING_STYLE_PRICES, FROSTING_COLORS, FONT_OPTIONS } from './cakePrices';

export const SHAPES = [
  { id: 'round', name: 'Round Tier', icon: 'Circle', desc: 'Timeless, balanced & beloved' },
  { id: 'square', name: 'Square Modern', icon: 'Square', desc: 'Chic geometric elegance' },
  { id: 'heart', name: 'Romantic Heart', icon: 'Heart', desc: 'Sweetheart anniversary special' },
  { id: 'rectangle', name: 'Sheet Rectangle', icon: 'RectangleHorizontal', desc: 'Grand party & celebration cut' },
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
    y: 245,
  },
  decorations: [
    {
      instanceId: 'dec-1',
      id: 'strawberry',
      name: 'Fresh Strawberry',
      price: 12,
      x: 215,
      y: 195,
      width: 48,
      height: 58,
      rotation: -10,
      scaleX: 1,
      scaleY: 1,
      category: 'fruits'
    },
    {
      instanceId: 'dec-2',
      id: 'strawberry',
      name: 'Fresh Strawberry',
      price: 12,
      x: 280,
      y: 195,
      width: 48,
      height: 58,
      rotation: 12,
      scaleX: 1,
      scaleY: 1,
      category: 'fruits'
    },
    {
      instanceId: 'dec-3',
      id: 'piping_rosette',
      name: 'Piped Cream Rosette',
      price: 8,
      x: 248,
      y: 170,
      width: 44,
      height: 44,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      category: 'cream'
    }
  ]
};
