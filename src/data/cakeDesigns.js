export const CAKE_DESIGNS = [
  {
    id: 'design-berry-bliss',
    title: 'Berry Blush Birthday',
    category: 'Birthday Cakes',
    tagline: 'Fresh garden strawberries & wild blueberries on soft velvet cream',
    price: 185,
    rating: 4.9,
    reviewsCount: 42,
    badge: 'Bestseller',
    previewPhoto: '/assets/cakes/cake_round_strawberry.png',
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
        y: 215
      },
      decorations: [
        { instanceId: 'g-1', id: 'strawberry', name: 'Fresh Garden Strawberry', price: 12, x: 200, y: 175, width: 50, height: 60, rotation: -12, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-2', id: 'strawberry', name: 'Fresh Garden Strawberry', price: 12, x: 300, y: 175, width: 50, height: 60, rotation: 15, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-3', id: 'blueberry', name: 'Wild Blueberries Cluster', price: 9, x: 250, y: 160, width: 44, height: 48, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-4', id: 'sugar_pearls', name: 'Lustrous Sugar Pearls', price: 8, x: 250, y: 225, width: 42, height: 42, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'g-5', id: 'candle', name: 'Gold Party Celebration Candle', price: 7, x: 250, y: 135, width: 28, height: 75, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-choc-royale',
    title: 'Belgian Truffle Cascade',
    category: 'Chocolate Cakes',
    tagline: 'Deep dark cocoa with handcrafted chocolate curls and rich ganache drip',
    price: 210,
    rating: 5.0,
    reviewsCount: 58,
    badge: 'Chef Choice',
    previewPhoto: '/assets/cakes/cake_round_chocolate.png',
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
        y: 215
      },
      decorations: [
        { instanceId: 'c-1', id: 'chocolate_curls', name: 'Belgian Chocolate Curls', price: 10, x: 210, y: 175, width: 54, height: 48, rotation: -15, scaleX: 1, scaleY: 1 },
        { instanceId: 'c-2', id: 'chocolate_curls', name: 'Belgian Chocolate Curls', price: 10, x: 290, y: 175, width: 54, height: 48, rotation: 20, scaleX: 1, scaleY: 1 },
        { instanceId: 'c-3', id: 'cherry', name: 'Glossy Twin Cherries', price: 14, x: 250, y: 155, width: 56, height: 64, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'c-4', id: 'macaron', name: 'French Parisian Macaron', price: 16, x: 250, y: 225, width: 50, height: 44, rotation: 5, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-vintage-heart',
    title: 'Vintage Heart of Gold',
    category: 'Anniversary Cakes',
    tagline: 'Romantic sweetheart curves with rose satin bow & red velvet sponge',
    price: 195,
    rating: 4.9,
    reviewsCount: 31,
    badge: 'Popular',
    previewPhoto: '/assets/cakes/cake_heart_strawberry.png',
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
        y: 215
      },
      decorations: [
        { instanceId: 'h-1', id: 'bow', name: 'Pastel Rose Satin Bow', price: 15, x: 250, y: 160, width: 64, height: 54, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'h-2', id: 'buttercream_flower', name: 'Hand-Piped Buttercream Rose', price: 14, x: 195, y: 195, width: 52, height: 52, rotation: -20, scaleX: 1, scaleY: 1 },
        { instanceId: 'h-3', id: 'buttercream_flower', name: 'Hand-Piped Buttercream Rose', price: 14, x: 305, y: 195, width: 52, height: 52, rotation: 20, scaleX: 1, scaleY: 1 },
        { instanceId: 'h-4', id: 'sugar_pearls', name: 'Lustrous Sugar Pearls', price: 8, x: 250, y: 225, width: 44, height: 44, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-royal-wedding',
    title: 'Opulent Pearl Blossom',
    category: 'Wedding Cakes',
    tagline: 'Pristine ivory vanilla tier on white marble platter with edible sugar roses',
    price: 320,
    rating: 5.0,
    reviewsCount: 26,
    badge: 'Luxury',
    previewPhoto: '/assets/cakes/cake_round_vanilla.png',
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
        y: 215
      },
      decorations: [
        { instanceId: 'w-1', id: 'edible_flowers', name: 'Delicate Sugar Blossom', price: 13, x: 205, y: 170, width: 52, height: 52, rotation: -10, scaleX: 1, scaleY: 1 },
        { instanceId: 'w-2', id: 'edible_flowers', name: 'Delicate Sugar Blossom', price: 13, x: 295, y: 170, width: 52, height: 52, rotation: 15, scaleX: 1, scaleY: 1 },
        { instanceId: 'w-3', id: 'sugar_pearls', name: 'Lustrous Sugar Pearls', price: 8, x: 250, y: 155, width: 46, height: 46, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'w-4', id: 'whipped_cream', name: 'Whipped Chantilly Dollop', price: 6, x: 250, y: 225, width: 46, height: 46, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-kids-confetti',
    title: 'Rainbow Sparkle Carnival',
    category: 'Kids Cakes',
    tagline: 'Gourmet rainbow sprinkles, gold party candles & sweet butterscotch',
    price: 175,
    rating: 4.8,
    reviewsCount: 39,
    badge: 'Kids Favorite',
    previewPhoto: '/assets/cakes/cake_round_butterscotch.png',
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
        y: 215
      },
      decorations: [
        { instanceId: 'k-1', id: 'sprinkles', name: 'Gourmet Rainbow Sprinkles', price: 6, x: 205, y: 175, width: 58, height: 58, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 'k-2', id: 'sprinkles', name: 'Gourmet Rainbow Sprinkles', price: 6, x: 295, y: 175, width: 58, height: 58, rotation: 25, scaleX: 1, scaleY: 1 },
        { instanceId: 'k-3', id: 'macaron', name: 'French Parisian Macaron', price: 16, x: 250, y: 155, width: 52, height: 46, rotation: -5, scaleX: 1, scaleY: 1 },
        { instanceId: 'k-4', id: 'candle', name: 'Gold Party Celebration Candle', price: 7, x: 250, y: 135, width: 28, height: 75, rotation: 0, scaleX: 1, scaleY: 1 }
      ]
    }
  },
  {
    id: 'design-emerald-forest',
    title: 'Matcha Forest Royale',
    category: 'Special Occasion Cakes',
    tagline: 'Square modern tier on marble platter with glazed kiwi and twin cherries',
    price: 225,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'New',
    previewPhoto: '/assets/cakes/cake_square_vanilla.png',
    config: {
      shape: 'square',
      size: '1.5',
      flavour: 'black_forest',
      frosting: 'buttercream',
      frostingColor: 'green',
      icingStyle: 'rosette',
      message: {
        text: 'Congratulations Sarah!',
        font: 'Playfair Display',
        color: '#2B8A3E',
        size: 22,
        x: 250,
        y: 215
      },
      decorations: [
        { instanceId: 's-1', id: 'sugar_fruits', name: 'Glazed Kiwi & Citrus', price: 11, x: 215, y: 175, width: 52, height: 52, rotation: 0, scaleX: 1, scaleY: 1 },
        { instanceId: 's-2', id: 'cherry', name: 'Glossy Twin Cherries', price: 14, x: 285, y: 175, width: 56, height: 64, rotation: 10, scaleX: 1, scaleY: 1 },
        { instanceId: 's-3', id: 'buttercream_flower', name: 'Hand-Piped Buttercream Rose', price: 14, x: 250, y: 155, width: 50, height: 50, rotation: -15, scaleX: 1, scaleY: 1 }
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
