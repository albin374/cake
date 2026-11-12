// SVG Helper to generate data URIs for crystal clear transparent bakery assets
const createSvgDataUri = (svgContent) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
};

export const INGREDIENTS = [
  // --- FRUITS ---
  {
    id: 'strawberry',
    name: 'Fresh Strawberry',
    category: 'fruits',
    price: 12,
    defaultWidth: 46,
    defaultHeight: 56,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100" height="120">
        <defs>
          <radialGradient id="berryGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FF4D6D" />
            <stop offset="70%" stop-color="#D90429" />
            <stop offset="100%" stop-color="#900C1F" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Strawberry Body -->
        <path d="M50 115 C20 90, 8 60, 10 38 C12 20, 32 15, 50 25 C68 15, 88 20, 90 38 C92 60, 80 90, 50 115 Z" fill="url(#berryGrad)" filter="url(#shadow)"/>
        <!-- Seeds -->
        <g fill="#FFE57F" opacity="0.9">
          <ellipse cx="32" cy="38" rx="2" ry="3.5" transform="rotate(-10 32 38)"/>
          <ellipse cx="48" cy="36" rx="2" ry="3.5"/>
          <ellipse cx="66" cy="40" rx="2" ry="3.5" transform="rotate(12 66 40)"/>
          <ellipse cx="24" cy="54" rx="2" ry="3.5" transform="rotate(-15 24 54)"/>
          <ellipse cx="42" cy="55" rx="2.2" ry="4"/>
          <ellipse cx="60" cy="56" rx="2" ry="3.5" transform="rotate(10 60 56)"/>
          <ellipse cx="76" cy="58" rx="2" ry="3.5" transform="rotate(20 76 58)"/>
          <ellipse cx="35" cy="74" rx="2" ry="3.5" transform="rotate(-8 35 74)"/>
          <ellipse cx="52" cy="76" rx="2" ry="3.5"/>
          <ellipse cx="68" cy="74" rx="1.8" ry="3.2" transform="rotate(15 68 74)"/>
          <ellipse cx="44" cy="94" rx="1.6" ry="3"/>
          <ellipse cx="56" cy="93" rx="1.6" ry="3"/>
        </g>
        <!-- Calyx / Leaves -->
        <g fill="#2D6A4F">
          <path d="M50 22 C48 8, 40 4, 32 10 C38 18, 44 22, 50 22 Z"/>
          <path d="M50 22 C56 6, 68 8, 72 14 C66 20, 58 22, 50 22 Z"/>
          <path d="M50 22 C45 16, 20 18, 14 26 C26 28, 40 26, 50 22 Z"/>
          <path d="M50 22 C55 16, 78 18, 86 26 C74 28, 60 26, 50 22 Z"/>
          <path d="M50 22 C48 12, 52 12, 50 2 C48 10, 48 14, 50 22 Z" fill="#52B788"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'raspberry',
    name: 'Sweet Raspberry',
    category: 'fruits',
    price: 10,
    defaultWidth: 42,
    defaultHeight: 46,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" width="100" height="110">
        <defs>
          <radialGradient id="raspGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FF3377" />
            <stop offset="60%" stop-color="#C2185B" />
            <stop offset="100%" stop-color="#69002C" />
          </radialGradient>
        </defs>
        <!-- Drupelets -->
        <g fill="url(#raspGrad)">
          <!-- Top row -->
          <circle cx="34" cy="28" r="14" />
          <circle cx="50" cy="22" r="15" />
          <circle cx="66" cy="28" r="14" />
          <!-- Mid row 1 -->
          <circle cx="24" cy="45" r="14" />
          <circle cx="42" cy="42" r="15" />
          <circle cx="58" cy="42" r="15" />
          <circle cx="76" cy="45" r="14" />
          <!-- Mid row 2 -->
          <circle cx="28" cy="64" r="14" />
          <circle cx="46" cy="62" r="15" />
          <circle cx="64" cy="64" r="14" />
          <circle cx="74" cy="63" r="13" />
          <!-- Lower row -->
          <circle cx="38" cy="80" r="13" />
          <circle cx="54" cy="81" r="14" />
          <circle cx="68" cy="80" r="12" />
          <!-- Bottom tip -->
          <circle cx="50" cy="94" r="12" />
        </g>
        <path d="M47 8 Q50 2, 53 8 Q58 14, 50 16 Q42 14, 47 8 Z" fill="#4CAF50"/>
      </svg>
    `)
  },
  {
    id: 'blueberry',
    name: 'Wild Blueberries',
    category: 'fruits',
    price: 9,
    defaultWidth: 44,
    defaultHeight: 44,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <radialGradient id="blueGrad1" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#5C7CFA" />
            <stop offset="50%" stop-color="#2B3A8C" />
            <stop offset="100%" stop-color="#141B4D" />
          </radialGradient>
          <radialGradient id="blueGrad2" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#748FFC" />
            <stop offset="55%" stop-color="#364FC7" />
            <stop offset="100%" stop-color="#182260" />
          </radialGradient>
        </defs>
        <!-- Back berry -->
        <circle cx="65" cy="42" r="28" fill="url(#blueGrad1)"/>
        <path d="M63 20 L66 23 L70 21 L69 25 L73 27 L69 29 L69 33 L65 31 L62 34 L62 30 L58 28 L62 26 Z" fill="#141B4D" opacity="0.8"/>
        <!-- Front berry -->
        <circle cx="38" cy="58" r="32" fill="url(#blueGrad2)"/>
        <!-- Calyx star on front berry -->
        <path d="M36 34 L40 38 L45 35 L43 41 L48 44 L42 46 L42 52 L37 48 L33 52 L33 46 L28 44 L33 41 Z" fill="#141B4D"/>
        <ellipse cx="38" cy="44" rx="4" ry="3" fill="#0D1338"/>
      </svg>
    `)
  },
  {
    id: 'cherry',
    name: 'Glossy Twin Cherries',
    category: 'fruits',
    price: 14,
    defaultWidth: 55,
    defaultHeight: 65,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 130" width="120" height="130">
        <defs>
          <radialGradient id="cherryG" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FF5252" />
            <stop offset="50%" stop-color="#B71C1C" />
            <stop offset="100%" stop-color="#4A0007" />
          </radialGradient>
        </defs>
        <!-- Stems -->
        <path d="M68 15 C60 40, 40 60, 36 82" stroke="#4A7C20" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M68 15 C75 45, 80 65, 84 85" stroke="#4A7C20" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="68" cy="15" rx="5" ry="3" fill="#2E4F14"/>
        <!-- Left Cherry -->
        <circle cx="36" cy="92" r="26" fill="url(#cherryG)"/>
        <ellipse cx="27" cy="80" rx="8" ry="4" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 27 80)"/>
        <!-- Right Cherry -->
        <circle cx="84" cy="94" r="26" fill="url(#cherryG)"/>
        <ellipse cx="75" cy="82" rx="8" ry="4" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 75 82)"/>
      </svg>
    `)
  },
  {
    id: 'sugar_fruits',
    name: 'Glazed Kiwi & Citrus',
    category: 'fruits',
    price: 11,
    defaultWidth: 50,
    defaultHeight: 50,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <radialGradient id="kiwiGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF9C4" />
            <stop offset="35%" stop-color="#AEEA00" />
            <stop offset="85%" stop-color="#7CB342" />
            <stop offset="100%" stop-color="#558B2F" />
          </radialGradient>
        </defs>
        <!-- Kiwi Slice -->
        <circle cx="50" cy="50" r="44" fill="#8D6E63" stroke="#D7CCC8" stroke-width="3"/>
        <circle cx="50" cy="50" r="40" fill="url(#kiwiGrad)"/>
        <ellipse cx="50" cy="50" rx="14" ry="12" fill="#FFFFD0"/>
        <!-- Seeds ring -->
        <g fill="#212121">
          <circle cx="50" cy="30" r="1.8"/>
          <circle cx="62" cy="34" r="1.8"/>
          <circle cx="69" cy="44" r="1.8"/>
          <circle cx="68" cy="56" r="1.8"/>
          <circle cx="60" cy="66" r="1.8"/>
          <circle cx="50" cy="70" r="1.8"/>
          <circle cx="39" cy="66" r="1.8"/>
          <circle cx="32" cy="56" r="1.8"/>
          <circle cx="31" cy="44" r="1.8"/>
          <circle cx="38" cy="34" r="1.8"/>
        </g>
      </svg>
    `)
  },

  // --- DECORATIONS ---
  {
    id: 'sprinkles',
    name: 'Rainbow Sprinkles',
    category: 'decorations',
    price: 6,
    defaultWidth: 55,
    defaultHeight: 55,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <!-- Confetti & sprinkle rods -->
        <rect x="20" y="25" width="22" height="6" rx="3" fill="#E85B91" transform="rotate(25 20 25)"/>
        <rect x="55" y="18" width="20" height="6" rx="3" fill="#3B82F6" transform="rotate(-35 55 18)"/>
        <rect x="30" y="55" width="24" height="6" rx="3" fill="#F59E0B" transform="rotate(70 30 55)"/>
        <rect x="65" y="48" width="22" height="6" rx="3" fill="#10B981" transform="rotate(15 65 48)"/>
        <rect x="45" y="75" width="20" height="6" rx="3" fill="#EC4899" transform="rotate(-20 45 75)"/>
        <circle cx="22" cy="75" r="4" fill="#8B5CF6"/>
        <circle cx="80" cy="30" r="4.5" fill="#EF4444"/>
        <circle cx="48" cy="38" r="4" fill="#FBBF24"/>
        <circle cx="78" cy="78" r="4" fill="#06B6D4"/>
      </svg>
    `)
  },
  {
    id: 'sugar_pearls',
    name: 'Glistening Sugar Pearls',
    category: 'decorations',
    price: 8,
    defaultWidth: 48,
    defaultHeight: 48,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <radialGradient id="pearl1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="60%" stop-color="#FCE7F3" />
            <stop offset="100%" stop-color="#F472B6" />
          </radialGradient>
          <radialGradient id="pearl2" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="70%" stop-color="#FEF3C7" />
            <stop offset="100%" stop-color="#F59E0B" />
          </radialGradient>
        </defs>
        <!-- Cluster of 4 lustrous pearls -->
        <circle cx="35" cy="40" r="18" fill="url(#pearl1)"/>
        <circle cx="68" cy="42" r="16" fill="url(#pearl2)"/>
        <circle cx="48" cy="68" r="20" fill="url(#pearl1)"/>
        <circle cx="70" cy="72" r="13" fill="url(#pearl2)"/>
      </svg>
    `)
  },
  {
    id: 'bow',
    name: 'Chic Satin Bow',
    category: 'decorations',
    price: 15,
    defaultWidth: 62,
    defaultHeight: 52,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="120" height="100">
        <defs>
          <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF75A0" />
            <stop offset="50%" stop-color="#E85B91" />
            <stop offset="100%" stop-color="#C83E73" />
          </linearGradient>
        </defs>
        <!-- Left loop -->
        <path d="M55 45 C35 20, 10 20, 12 45 C14 65, 38 55, 55 48 Z" fill="url(#bowGrad)"/>
        <!-- Right loop -->
        <path d="M65 45 C85 20, 110 20, 108 45 C106 65, 82 55, 65 48 Z" fill="url(#bowGrad)"/>
        <!-- Ribbon tails -->
        <path d="M52 52 C45 68, 30 82, 22 92 L34 94 C46 82, 55 70, 58 54 Z" fill="#C83E73"/>
        <path d="M68 52 C75 68, 90 82, 98 92 L86 94 C74 82, 65 70, 62 54 Z" fill="#C83E73"/>
        <!-- Knot -->
        <ellipse cx="60" cy="47" rx="9" ry="11" fill="#FF85AB" stroke="#A02050" stroke-width="1.5"/>
      </svg>
    `)
  },
  {
    id: 'chocolate_curls',
    name: 'Artisan Chocolate Curls',
    category: 'decorations',
    price: 10,
    defaultWidth: 50,
    defaultHeight: 45,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 90" width="100" height="90">
        <defs>
          <linearGradient id="chocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8D5B4C"/>
            <stop offset="50%" stop-color="#4E2B1E"/>
            <stop offset="100%" stop-color="#2D150D"/>
          </linearGradient>
        </defs>
        <!-- Swirling roll 1 -->
        <path d="M20 50 C25 25, 65 20, 75 45 C80 60, 50 75, 35 60 C25 50, 40 40, 52 45" fill="none" stroke="url(#chocGrad)" stroke-width="12" stroke-linecap="round"/>
        <!-- Swirling roll 2 (white/milk accent) -->
        <path d="M40 25 C50 15, 75 18, 82 32 C86 42, 70 52, 60 44" fill="none" stroke="#D7CCC8" stroke-width="7" stroke-linecap="round"/>
      </svg>
    `)
  },
  {
    id: 'macaron',
    name: 'French Macaron',
    category: 'decorations',
    price: 16,
    defaultWidth: 52,
    defaultHeight: 46,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" width="100" height="80">
        <defs>
          <linearGradient id="macGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FF9BBB"/>
            <stop offset="100%" stop-color="#E85B91"/>
          </linearGradient>
        </defs>
        <!-- Top Shell -->
        <path d="M15 35 C15 15, 85 15, 85 35 Z" fill="url(#macGrad)"/>
        <path d="M15 35 Q50 38 85 35" stroke="#C83E73" stroke-width="3" stroke-dasharray="2 3"/>
        <!-- Filling -->
        <rect x="18" y="36" width="64" height="10" rx="4" fill="#FFF9F3" stroke="#FDE68A" stroke-width="1.5"/>
        <!-- Bottom Shell -->
        <path d="M15 48 C15 65, 85 65, 85 48 Z" fill="url(#macGrad)"/>
        <path d="M15 48 Q50 45 85 48" stroke="#C83E73" stroke-width="3" stroke-dasharray="2 3"/>
      </svg>
    `)
  },
  {
    id: 'candle',
    name: 'Gold Party Candle',
    category: 'decorations',
    price: 7,
    defaultWidth: 32,
    defaultHeight: 68,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 120" width="60" height="120">
        <defs>
          <linearGradient id="goldCandle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F59E0B"/>
            <stop offset="50%" stop-color="#FEF3C7"/>
            <stop offset="100%" stop-color="#D97706"/>
          </linearGradient>
          <radialGradient id="flameGrad" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#FBBF24"/>
            <stop offset="90%" stop-color="#EF4444"/>
          </radialGradient>
        </defs>
        <!-- Flame -->
        <path d="M30 5 C38 18, 42 26, 30 40 C18 26, 22 18, 30 5 Z" fill="url(#flameGrad)"/>
        <!-- Wick -->
        <line x1="30" y1="40" x2="30" y2="48" stroke="#333" stroke-width="2.5"/>
        <!-- Candle stick -->
        <rect x="22" y="48" width="16" height="68" rx="3" fill="url(#goldCandle)"/>
        <!-- Stripes -->
        <path d="M22 62 L38 56 M22 80 L38 74 M22 98 L38 92" stroke="#FFF" stroke-width="2.5" opacity="0.6"/>
      </svg>
    `)
  },
  {
    id: 'edible_flowers',
    name: 'Edible Blossom Petals',
    category: 'decorations',
    price: 13,
    defaultWidth: 50,
    defaultHeight: 50,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <!-- 5-petal flower -->
        <g fill="#F472B6" opacity="0.95">
          <circle cx="50" cy="28" r="16"/>
          <circle cx="71" cy="43" r="16"/>
          <circle cx="63" cy="68" r="16"/>
          <circle cx="37" cy="68" r="16"/>
          <circle cx="29" cy="43" r="16"/>
        </g>
        <!-- Flower Center -->
        <circle cx="50" cy="50" r="12" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
        <circle cx="50" cy="50" r="5" fill="#FFFBEB"/>
      </svg>
    `)
  },

  // --- CREAM DECORATIONS ---
  {
    id: 'buttercream_flower',
    name: 'Pink Buttercream Rose',
    category: 'cream',
    price: 14,
    defaultWidth: 54,
    defaultHeight: 54,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <radialGradient id="roseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFE4E6"/>
            <stop offset="60%" stop-color="#FB7185"/>
            <stop offset="100%" stop-color="#BE123C"/>
          </radialGradient>
        </defs>
        <!-- Outer petals -->
        <circle cx="50" cy="50" r="45" fill="url(#roseGrad)"/>
        <!-- Inner petal spirals -->
        <path d="M35 35 C45 20, 70 25, 75 45 C80 65, 55 75, 38 65 C25 55, 35 38, 48 40 C58 42, 60 52, 54 56 C48 60, 44 54, 46 50" fill="none" stroke="#FFF1F2" stroke-width="5" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="10" fill="#E11D48"/>
      </svg>
    `)
  },
  {
    id: 'piping_rosette',
    name: 'Piped Cream Rosette',
    category: 'cream',
    price: 8,
    defaultWidth: 48,
    defaultHeight: 48,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <radialGradient id="pipingGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="60%" stop-color="#FFF5F7"/>
            <stop offset="100%" stop-color="#E2D4D8"/>
          </radialGradient>
        </defs>
        <!-- Star tip rosette -->
        <g fill="url(#pipingGrad)" stroke="#DEC5CE" stroke-width="1.5">
          <path d="M50 15 C58 35, 65 35, 85 50 C65 58, 65 65, 50 85 C35 65, 35 58, 15 50 C35 35, 42 35, 50 15 Z"/>
          <circle cx="50" cy="50" r="16" fill="#FFF"/>
          <path d="M50 42 C54 42, 58 46, 56 52 C54 56, 48 56, 46 52 Z" fill="#F472B6"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'whipped_cream',
    name: 'Whipped Cream Dollop',
    category: 'cream',
    price: 6,
    defaultWidth: 46,
    defaultHeight: 46,
    image: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FFF8FA"/>
            <stop offset="100%" stop-color="#F2DCE4"/>
          </linearGradient>
        </defs>
        <!-- Swirled peak -->
        <path d="M50 10 C56 25, 78 35, 82 55 C86 75, 70 88, 50 88 C30 88, 14 75, 18 55 C22 35, 44 25, 50 10 Z" fill="url(#creamGrad)" stroke="#ECD1DC" stroke-width="2"/>
        <path d="M48 10 Q58 30 46 60 Q40 75 50 85" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>
    `)
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Sparkles' },
  { id: 'fruits', name: 'Fresh Fruits', icon: 'Cherry' },
  { id: 'decorations', name: 'Decorations', icon: 'Cake' },
  { id: 'cream', name: 'Cream & Piping', icon: 'Heart' },
];
