/**
 * Dynamic Pricing Configuration (Currency: AED)
 */

export const CURRENCY = 'AED';

export const BASE_CAKE_PRICES = {
  round: 120,
  square: 135,
  heart: 150,
  rectangle: 165,
};

export const SIZE_PRICES = {
  '0.5': { label: '0.5 KG', multiplier: 0.8, extraFee: 0, serves: '2-4 Guests' },
  '1': { label: '1.0 KG', multiplier: 1.0, extraFee: 0, serves: '6-8 Guests' },
  '1.5': { label: '1.5 KG', multiplier: 1.35, extraFee: 35, serves: '10-12 Guests' },
  '2': { label: '2.0 KG', multiplier: 1.7, extraFee: 65, serves: '14-18 Guests' },
  '3': { label: '3.0 KG', multiplier: 2.3, extraFee: 120, serves: '22-28 Guests' },
};

export const FLAVOUR_PRICES = {
  chocolate: { name: 'Belgian Chocolate Truffle', surcharge: 15, crumbColor: '#4E2B1E', sideColor: '#5D3325' },
  vanilla: { name: 'Madagascar Vanilla Bean', surcharge: 0, crumbColor: '#F5E6D3', sideColor: '#F0DEC8' },
  strawberry: { name: 'Fresh Strawberry Cream', surcharge: 10, crumbColor: '#FFAAA6', sideColor: '#FF8A84' },
  red_velvet: { name: 'Classic Red Velvet', surcharge: 18, crumbColor: '#8C1D2F', sideColor: '#781525' },
  black_forest: { name: 'Black Forest Royale', surcharge: 20, crumbColor: '#361E1B', sideColor: '#2D1714' },
  butterscotch: { name: 'Golden Butterscotch Crunch', surcharge: 12, crumbColor: '#E6A15C', sideColor: '#D89047' },
};

export const FROSTING_PRICES = {
  vanilla: { name: 'Velvety Vanilla Cream', surcharge: 0 },
  chocolate: { name: 'Rich Chocolate Ganache', surcharge: 15 },
  strawberry: { name: 'Silky Strawberry Cream', surcharge: 10 },
  buttercream: { name: 'Swiss Meringue Buttercream', surcharge: 20 },
};

export const ICING_STYLE_PRICES = {
  smooth: { name: 'Sleek Smooth', surcharge: 0 },
  pearl_border: { name: 'White Pearl Border', surcharge: 15 },
  flower_border: { name: 'Buttercream Flower Border', surcharge: 25 },
  rosette: { name: 'Piped Rosette Crown', surcharge: 20 },
  drip: { name: 'Gourmet Chocolate Drip', surcharge: 20 },
  swirl: { name: 'Whimsical Swirls', surcharge: 10 },
  ruffle: { name: 'Vintage Ruffle Petals', surcharge: 15 },
};

export const MESSAGE_CUSTOMIZATION_FEE = 15; // Free if under 15 chars, or standard plate fee

export const FROSTING_COLORS = [
  { id: 'white', name: 'Alabaster White', hex: '#FFFDF9', darkHex: '#EAE5DB', textHex: '#63384B' },
  { id: 'pink', name: 'Pastel Rose Pink', hex: '#FFD6E5', darkHex: '#F4AEC6', textHex: '#A02050' },
  { id: 'red', name: 'Burgundy Crimson', hex: '#C2185B', darkHex: '#880E4F', textHex: '#FFFFFF' },
  { id: 'blue', name: 'Baby Cloud Blue', hex: '#D0EBFF', darkHex: '#A5D8FF', textHex: '#1864AB' },
  { id: 'purple', name: 'Lavender Mist', hex: '#EBD4FF', darkHex: '#D0BFFF', textHex: '#5F3DC4' },
  { id: 'yellow', name: 'Buttercup Lemon', hex: '#FFF3BF', darkHex: '#FFE066', textHex: '#D97706' },
  { id: 'green', name: 'Matcha Sage Green', hex: '#D3F9D8', darkHex: '#B2F2BB', textHex: '#2B8A3E' },
  { id: 'brown', name: 'Rich Cocoa Bronze', hex: '#5C382A', darkHex: '#422419', textHex: '#FFFDF9' },
];

export const FONT_OPTIONS = [
  { id: 'Playfair Display', name: 'Classic Serif', style: 'font-serif' },
  { id: 'Dancing Script', name: 'Romantic Script', style: 'font-script' },
  { id: 'Caveat', name: 'Playful Hand', style: 'font-handwriting' },
  { id: 'Pacifico', name: 'Bold Sweet', style: 'font-sans font-bold' },
];
