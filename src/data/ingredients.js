/**
 * Photorealistic Bakery Ingredients & Decorations
 * High-definition transparent PNG assets with natural studio lighting
 */

export const INGREDIENTS = [
  // --- FRUITS ---
  {
    id: 'strawberry',
    name: 'Fresh Garden Strawberry',
    category: 'fruits',
    price: 12,
    defaultWidth: 54,
    defaultHeight: 64,
    image: '/assets/decorations/strawberry.png',
    desc: 'Plump ripe red strawberry with leafy green calyx'
  },
  {
    id: 'raspberry',
    name: 'Sweet Ruby Raspberry',
    category: 'fruits',
    price: 10,
    defaultWidth: 46,
    defaultHeight: 52,
    image: '/assets/decorations/raspberry.png',
    desc: 'Juicy ruby drupelets with natural frosted bloom'
  },
  {
    id: 'blueberry',
    name: 'Wild Blueberries Cluster',
    category: 'fruits',
    price: 9,
    defaultWidth: 50,
    defaultHeight: 54,
    image: '/assets/decorations/blueberry.png',
    desc: 'Plump deep indigo berries with velvety silver bloom'
  },
  {
    id: 'cherry',
    name: 'Glossy Twin Cherries',
    category: 'fruits',
    price: 14,
    defaultWidth: 62,
    defaultHeight: 70,
    image: '/assets/decorations/cherry.png',
    desc: 'High-shine dark crimson cherries with graceful green stem'
  },
  {
    id: 'sugar_fruits',
    name: 'Glazed Kiwi & Citrus',
    category: 'fruits',
    price: 11,
    defaultWidth: 54,
    defaultHeight: 54,
    image: '/assets/decorations/sugar_fruits.png',
    desc: 'Translucent glazed kiwi slice with radiating seeds'
  },

  // --- DECORATIONS ---
  {
    id: 'sprinkles',
    name: 'Gourmet Rainbow Sprinkles',
    category: 'decorations',
    price: 6,
    defaultWidth: 62,
    defaultHeight: 62,
    image: '/assets/decorations/sprinkles.png',
    desc: 'Glossy artisanal celebration sugar rods'
  },
  {
    id: 'sugar_pearls',
    name: 'Lustrous Sugar Pearls',
    category: 'decorations',
    price: 8,
    defaultWidth: 46,
    defaultHeight: 46,
    image: '/assets/decorations/sugar_pearls.png',
    desc: 'Shimmering opalescent and gold edible dragees'
  },
  {
    id: 'bow',
    name: 'Pastel Rose Satin Bow',
    category: 'decorations',
    price: 15,
    defaultWidth: 66,
    defaultHeight: 56,
    image: '/assets/decorations/bow.png',
    desc: 'Handcrafted luxury satin ribbon bow with natural fabric drape'
  },
  {
    id: 'chocolate_curls',
    name: 'Belgian Chocolate Curls',
    category: 'decorations',
    price: 10,
    defaultWidth: 56,
    defaultHeight: 52,
    image: '/assets/decorations/chocolate_curls.png',
    desc: 'Delicate rolled shavings of rich 70% dark chocolate'
  },
  {
    id: 'macaron',
    name: 'French Parisian Macaron',
    category: 'decorations',
    price: 16,
    defaultWidth: 56,
    defaultHeight: 50,
    image: '/assets/decorations/macaron.png',
    desc: 'Classic almond meringue shell with ruffled foot and creamy ganache'
  },
  {
    id: 'candle',
    name: 'Gold Party Celebration Candle',
    category: 'decorations',
    price: 7,
    defaultWidth: 32,
    defaultHeight: 88,
    image: '/assets/decorations/candle.png',
    desc: 'Slender metallic gold candle with warm glowing wick flame'
  },
  {
    id: 'edible_flowers',
    name: 'Delicate Sugar Blossom',
    category: 'decorations',
    price: 13,
    defaultWidth: 54,
    defaultHeight: 52,
    image: '/assets/decorations/edible_flowers.png',
    desc: 'Hand-sculpted pastel sugar flower petals'
  },

  // --- CREAM DECORATIONS ---
  {
    id: 'buttercream_flower',
    name: 'Hand-Piped Buttercream Rose',
    category: 'cream',
    price: 14,
    defaultWidth: 60,
    defaultHeight: 60,
    image: '/assets/decorations/buttercream_flower.png',
    desc: 'Multi-tiered piped Swiss buttercream floral rose'
  },
  {
    id: 'piping_rosette',
    name: 'Piped Cream Rosette',
    category: 'cream',
    price: 8,
    defaultWidth: 52,
    defaultHeight: 52,
    image: '/assets/decorations/piping_rosette.png',
    desc: 'Star-tip swirl of velvety whipped vanilla buttercream'
  },
  {
    id: 'whipped_cream',
    name: 'Whipped Chantilly Dollop',
    category: 'cream',
    price: 6,
    defaultWidth: 48,
    defaultHeight: 48,
    image: '/assets/decorations/whipped_cream.png',
    desc: 'Airy peak of fresh Chantilly cream'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Sparkles' },
  { id: 'fruits', name: 'Fresh Fruits', icon: 'Cherry' },
  { id: 'decorations', name: 'Decorations', icon: 'Cake' },
  { id: 'cream', name: 'Cream & Piping', icon: 'Heart' },
];
