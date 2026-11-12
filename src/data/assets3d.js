/**
 * 3D Asset Configuration & Registry
 * Maps topping IDs to optional GLB models or procedural 3D fallbacks
 */

export const MODEL_REGISTRY = {
  // Toppings & Fruits
  strawberry: {
    name: 'Fresh Garden Strawberry',
    modelPath: '/assets/models/toppings/strawberry.glb',
    scale: 0.35,
    proceduralType: 'strawberry'
  },
  raspberry: {
    name: 'Sweet Ruby Raspberry',
    modelPath: '/assets/models/toppings/raspberry.glb',
    scale: 0.3,
    proceduralType: 'raspberry'
  },
  blueberry: {
    name: 'Wild Blueberries Cluster',
    modelPath: '/assets/models/toppings/blueberry.glb',
    scale: 0.3,
    proceduralType: 'blueberry'
  },
  cherry: {
    name: 'Glossy Twin Cherries',
    modelPath: '/assets/models/toppings/cherry.glb',
    scale: 0.38,
    proceduralType: 'cherry'
  },
  sugar_fruits: {
    name: 'Glazed Kiwi Slice',
    modelPath: '/assets/models/toppings/kiwi.glb',
    scale: 0.35,
    proceduralType: 'sugar_fruits'
  },
  macaron: {
    name: 'French Parisian Macaron',
    modelPath: '/assets/models/toppings/macaron.glb',
    scale: 0.38,
    proceduralType: 'macaron'
  },
  candle: {
    name: 'Gold Party Celebration Candle',
    modelPath: '/assets/models/decorations/candle.glb',
    scale: 0.45,
    proceduralType: 'candle'
  },
  chocolate_curls: {
    name: 'Belgian Chocolate Curls',
    modelPath: '/assets/models/decorations/chocolate_curl.glb',
    scale: 0.35,
    proceduralType: 'chocolate_curls'
  },
  buttercream_flower: {
    name: 'Hand-Piped Buttercream Rose',
    modelPath: '/assets/models/decorations/buttercream_rose.glb',
    scale: 0.4,
    proceduralType: 'buttercream_flower'
  },
  bow: {
    name: 'Pastel Rose Satin Bow',
    modelPath: '/assets/models/decorations/bow.glb',
    scale: 0.4,
    proceduralType: 'bow'
  },
  sugar_pearls: {
    name: 'Lustrous Sugar Pearls',
    modelPath: '/assets/models/decorations/pearls.glb',
    scale: 0.3,
    proceduralType: 'sugar_pearls'
  },
  sprinkles: {
    name: 'Gourmet Rainbow Sprinkles',
    modelPath: '/assets/models/decorations/sprinkles.glb',
    scale: 0.35,
    proceduralType: 'sprinkles'
  },
  piping_rosette: {
    name: 'Piped Cream Rosette',
    modelPath: '/assets/models/decorations/piping_rosette.glb',
    scale: 0.35,
    proceduralType: 'piping_rosette'
  },
  whipped_cream: {
    name: 'Whipped Chantilly Dollop',
    modelPath: '/assets/models/decorations/whipped_cream.glb',
    scale: 0.35,
    proceduralType: 'whipped_cream'
  }
};

/**
 * Checks if a remote/local file exists without breaking rendering
 */
export const checkAssetAvailability = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (e) {
    return false;
  }
};
