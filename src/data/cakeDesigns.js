export const CAKE_DESIGNS = [
  {
    id: 'design-berry-bliss',
    title: 'Berry Blush Birthday',
    category: 'Birthday Cakes',
    tagline: 'Fresh mountain berries on soft velvet cream',
    price: 185,
    rating: 4.9,
    reviewsCount: 42,
    badge: 'Bestseller',
    config: {
      shape: 'round',
      size: '1',
      flavour: 'strawberry',
      frosting: 'strawberry',
      frostingColor: 'pink',
      icingStyle: 'rosette',
      message: {
        text: 'Happy 21st Maya!',
        font: 'Dancing Script',
        color: '#A02050',
        size: 26,
        x: 250,
        y: 245
      },
      decorations: [
        { instanceId: 'g-1', id: 'strawberry', name: 'Fresh Strawberry', price: 12, x: 200, y: 180, width: 48, height: 58, rotation: -12, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-2', id: 'strawberry', name: 'Fresh Strawberry', price: 12, x: 300, y: 180, width: 48, height: 58, rotation: 15, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-3', id: 'blueberry', name: 'Wild Blueberries', price: 9, x: 250, y: 170, width: 44, height: 44, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-4', id: 'sugar_pearls', name: 'Glistening Sugar Pearls', price: 8, x: 250, y: 295, width: 42, height: 42, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-5', id: 'candle', name: 'Gold Party Candle', price: 7, x: 250, y: 135, width: 28, height: 60, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-choc-royale',
    title: 'Belgian Truffle Cascade',
    category: 'Chocolate Cakes',
    tagline: 'Deep dark cocoa with handcrafted chocolate curls',
    price: 210,
    rating: 5.0,
    reviewsCount: 58,
    badge: 'Chef Choice',
    config: {
      shape: 'round',
      size: '1.5',
      flavour: 'chocolate',
      frosting: 'chocolate',
      frostingColor: 'brown',
      icingStyle: 'drip',
      message: {
        text: 'Pure Indulgence',
        font: 'Playfair Display',
        color: '#FFFDF9',
        size: 24,
        x: 250,
        y: 250
      },
      decorations: [
        { instanceId: 'c-1', id: 'chocolate_curls', name: 'Artisan Chocolate Curls', price: 10, x: 220, y: 180, width: 52, height: 46, rotation: -15, scaleX: 1, scaleY: 1 },
        { instanceId: 'c-2', id: 'chocolate_curls', name: 'Artisan Chocolate Curls', price: 10, x: 280, y: 180, width: 52, height: 46, rotation: 20, scaleX: 1, scaleY: 1 },
        { instanceId: 'c-3', id: 'cherry', name: 'Glossy Twin Cherries', price: 14, x: 250, y: 165, width: 54, height: 62, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'c-4', id: 'macaron', name: 'French Macaron', price: 16, x: 250, y: 300, width: 50, height: 44, rotation: 5, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-vintage-heart',
    title: 'Vintage Heart of Gold',
    category: 'Anniversary Cakes',
    tagline: 'Romantic piped shell borders with a pink satin bow',
    price: 195,
    rating: 4.9,
    reviewsCount: 31,
    badge: 'Popular',
    config: {
      shape: 'heart',
      size: '1',
      flavour: 'red_velvet',
      frosting: 'buttercream',
      frostingColor: 'pink',
      icingStyle: 'ruffle',
      message: {
        text: 'Forever & Always',
        font: 'Dancing Script',
        color: '#A02050',
        size: 26,
        x: 250,
        y: 250
      },
      decorations: [
        { instanceId: 'h-1', id: 'bow', name: 'Chic Satin Bow', price: 15, x: 250, y: 170, width: 62, height: 52, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'h-2', id: 'buttercream_flower', name: 'Pink Buttercream Rose', price: 14, x: 190, y: 220, width: 50, height: 50, rotation: -20, scaleX: 1, scaleY: 1 },
        { instanceId: 'h-3', id: 'buttercream_flower', name: 'Pink Buttercream Rose', price: 14, x: 310, y: 220, width: 50, height: 50, rotation: 20, scaleX: 1, scaleY: 1 },
        { instanceId: 'h-4', id: 'sugar_pearls', name: 'Glistening Sugar Pearls', price: 8, x: 250, y: 310, width: 44, height: 44, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-royal-wedding',
    title: 'Opulent Pearl Blossom',
    category: 'Wedding Cakes',
    tagline: 'Pristine white tiers, edible flowers and delicate pearls',
    price: 320,
    rating: 5.0,
    reviewsCount: 26,
    badge: 'Luxury',
    config: {
      shape: 'round',
      size: '2',
      flavour: 'vanilla',
      frosting: 'buttercream',
      frostingColor: 'white',
      icingStyle: 'swirl',
      message: {
        text: 'Just Married',
        font: 'Playfair Display',
        color: '#63384B',
        size: 28,
        x: 250,
        y: 255
      },
      decorations: [
        { instanceId: 'w-1', id: 'edible_flowers', name: 'Edible Blossom Petals', price: 13, x: 210, y: 180, width: 52, height: 52, rotation: -10, scaleX: 1, scaleY: 1 },
        { instanceId: 'w-2', id: 'edible_flowers', name: 'Edible Blossom Petals', price: 13, x: 290, y: 180, width: 52, height: 52, rotation: 15, scaleX: 1, scaleY: 1 },
        { instanceId: 'w-3', id: 'sugar_pearls', name: 'Glistening Sugar Pearls', price: 8, x: 250, y: 165, width: 46, height: 46, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'w-4', id: 'whipped_cream', name: 'Whipped Cream Dollop', price: 6, x: 250, y: 320, width: 46, height: 46, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-kids-confetti',
    title: 'Rainbow Sparkle Carnival',
    category: 'Kids Cakes',
    tagline: 'Bright carnival sprinkles, French macarons and celebration vibes',
    price: 175,
    rating: 4.8,
    reviewsCount: 39,
    badge: 'Kids Favorite',
    config: {
      shape: 'round',
      size: '1',
      flavour: 'butterscotch',
      frosting: 'vanilla',
      frostingColor: 'yellow',
      icingStyle: 'smooth',
      message: {
        text: 'Happy 5th Leo!',
        font: 'Pacifico',
        color: '#D97706',
        size: 26,
        x: 250,
        y: 245
      },
      decorations: [
        { instanceId: 'k-1', id: 'sprinkles', name: 'Rainbow Sprinkles', price: 6, x: 210, y: 180, width: 56, height: 56, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'k-2', id: 'sprinkles', name: 'Rainbow Sprinkles', price: 6, x: 290, y: 180, width: 56, height: 56, rotation: 25, scaleX: 1, scaleY: 1 },
        { instanceId: 'k-3', id: 'macaron', name: 'French Macaron', price: 16, x: 250, y: 160, width: 50, height: 44, rotation: -5, scaleX: 1, scaleY: 1 },
        { instanceId: 'k-4', id: 'candle', name: 'Gold Party Candle', price: 7, x: 250, y: 300, width: 28, height: 60, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-emerald-forest',
    title: 'Matcha Forest Royale',
    category: 'Special Occasion Cakes',
    tagline: 'Artisanal matcha green tea cream with glazed fruit medley',
    price: 225,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'New',
    config: {
      shape: 'square',
      size: '1.5',
      flavour: 'black_forest',
      frosting: 'buttercream',
      frostingColor: 'green',
      icingStyle: 'rosette',
      message: {
        text: 'Congratulations Dr. Sarah!',
        font: 'Playfair Display',
        color: '#2B8A3E',
        size: 22,
        x: 250,
        y: 250
      },
      decorations: [
        { instanceId: 's-1', id: 'sugar_fruits', name: 'Glazed Kiwi & Citrus', price: 11, x: 220, y: 180, width: 50, height: 50, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 's-2', id: 'cherry', name: 'Glossy Twin Cherries', price: 14, x: 280, y: 180, width: 54, height: 62, rotation: 10, scaleX: 1, scaleY: 1 },
        { instanceId: 's-3', id: 'edible_flowers', name: 'Edible Blossom Petals', price: 13, x: 250, y: 165, width: 48, height: 48, rotation: -15, scaleX: 1, scaleY: 1 }
      ]
    }
  }
];

export const GALLERY_CATEGORIES = [
  'All',
  'Birthday Cakes',
  'Wedding Cakes',
  'Anniversary Cakes',
  'Kids Cakes',
  'Chocolate Cakes',
  'Special Occasion Cakes'
];
