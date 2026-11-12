# SweetArt | Interactive Cake Customizer & Online Ordering Studio

An artisan, fully interactive 2D cake customization and online ordering platform built with **React**, **Vite**, **Tailwind CSS**, and **React-Konva**.

![SweetArt Studio Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple)
![Konva](https://img.shields.io/badge/React--Konva-18.2.10-pink)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.16-cyan)

---

## ✨ Features & Architecture

### 🎂 1. Three-Column Interactive 2D Cake Studio (`/customize`)
- **Left Panel (Decorations & Ingredients)**:
  - Categorized into **Fresh Fruits** (Strawberries, Raspberries, Wild Blueberries, Glossy Cherries, Glazed Kiwi & Citrus), **Decorations** (Rainbow Sprinkles, Sugar Pearls, Satin Bows, Dark Chocolate Curls, French Macarons, Gold Party Candles, Edible Blossom Petals), and **Cream & Piping** (Pink Buttercream Roses, Piped Rosettes, Whipped Cream Dollops).
  - Search filter + category tabs.
  - Native **drag-and-drop** directly onto the cake canvas or single-tap quick addition.
  - Transparent vector SVG assets that never blur or pixelate.
  - Allows multiple copies of any treat.

- **Center Panel (React-Konva 2D Cake Canvas)**:
  - Realistic 2.5D layered rendering with top surface, side depth, shadows, plate stand, and decorative icing rims.
  - Full support for **4 Cake Shapes**: Round Cylinder, Square Geometric, Romantic Heart, and Slab Rectangle.
  - **Interactive Transformer**: Move freely, rotate with rotation handle, resize with bounding anchors.
  - **Quick Floating Actions**: Select item, delete (or hit `Delete`/`Backspace`), duplicate item with offset.
  - **History Stack**: Undo (`Ctrl+Z`), Redo, and live history depth.
  - **Zoom Controls**: Zoom in, zoom out, reset view with live percentage indicator.
  - **Cake Inscription**: Custom message piped onto the top surface with custom typography, color, size, and draggable coordinates.
  - **Export PNG**: Snapshot the current design at high resolution (up to 3x pixel ratio) for sharing or cart thumbnail.

- **Right Panel (Customization Settings & Live Price Summary)**:
  - **Shape**: Round Tier, Square Modern, Romantic Heart, Sheet Rectangle.
  - **Size / Weight**: 0.5 KG, 1.0 KG, 1.5 KG, 2.0 KG, 3.0 KG (with serving guidelines & realistic canvas scaling).
  - **Artisan Sponge Flavours**: Belgian Chocolate Truffle, Madagascar Vanilla Bean, Fresh Strawberry Cream, Classic Red Velvet, Black Forest Royale, Golden Butterscotch Crunch.
  - **Frosting Base**: Vanilla Cream, Chocolate Ganache, Strawberry Cream, Swiss Buttercream.
  - **Frosting Palette**: 8 curated colors (Alabaster White, Pastel Rose Pink, Burgundy Crimson, Baby Cloud Blue, Lavender Mist, Buttercup Lemon, Matcha Sage Green, Rich Cocoa Bronze).
  - **Artisanal Piping Styles**: Sleek Smooth, Whimsical Swirls, Vintage Ruffle Petals, Gourmet Artisanal Drip, Piped Rosette Crown.
  - **Live Dynamic Pricing (AED)**: Immediate recalculation breakdown (Base + Size upgrade + Customization charges + Topping fees).

---

### 🎨 2. Curated Predefined Design Gallery (`/gallery`)
- Filter by categories: **Birthday Cakes**, **Wedding Cakes**, **Anniversary Cakes**, **Kids Cakes**, **Chocolate Cakes**, **Special Occasion Cakes**.
- Search cakes by title, flavour, or occasion.
- **"Customize This Cake"** button: seamlessly loads the entire template configuration into the 2D Studio workspace for personalized editing!

---

### 🛍️ 3. Persistent Shopping Cart (`/cart`)
- Retains full cake configuration, toppings list, custom message, unit price, and a high-resolution preview image.
- Quantity adjustment (`+` / `-`), item removal, and full cart clearing.
- **"Modify"** action: reopens the saved cake inside the interactive 2D Studio.
- Backed by `LocalStorage` persistence.

---

### 🚚 4. UAE Checkout & Scheduling (`/checkout`)
- Delivery vs. Atelier Pickup selector (Dubai, Abu Dhabi, Sharjah, Ajman, RAK).
- Date picker with minimum advance preparation threshold.
- Time window selection (Morning, Afternoon, Evening, or Custom).
- Baker instructions and special venue notes.

---

### 🎉 5. Order Confirmation & Receipt (`/order-confirmation`)
- Instant unique Order Reference ID (`#SWT-XXXXXX`).
- Celebration confetti explosion powered by `canvas-confetti`.
- Printable itemized order receipt (`window.print()`).
- Direct navigation to design another cake or return home.

---

## 📁 Project Structure

```
src/
├── assets/                  # Graphics & assets
├── components/              # Reusable UI & builder modules
│   ├── CakeCanvas.jsx       # React-Konva 2D interactive editor
│   ├── IngredientPanel.jsx  # Left panel with toppings and drag-and-drop
│   ├── CustomizationPanel.jsx# Right panel assembling settings & pricing
│   ├── CakeShapeSelector.jsx# Shape tier picker
│   ├── FlavourSelector.jsx  # Size & flavour options
│   ├── FrostingSelector.jsx # Frosting bases, colors & piping styles
│   ├── MessageEditor.jsx    # Custom inscription typography & controls
│   ├── PriceSummary.jsx     # Dynamic price breakdown & CTAs
│   ├── CartItem.jsx         # Cart row with image, edit & quantity
│   ├── Navbar.jsx           # Global header with live cart badge
│   └── Footer.jsx           # Atelier concierge & delivery info
├── context/
│   └── CartContext.jsx      # Global cart state provider
├── data/
│   ├── cakePrices.js        # Dynamic pricing rules & color constants (AED)
│   ├── ingredients.js       # Vector SVG topping items & categories
│   ├── cakeDesigns.js       # Gallery templates & configs
│   └── customizationOptions.js # Initial builder states & metadata
├── hooks/
│   ├── useCakeBuilder.js    # Master builder state, transform & drag logic
│   ├── useCart.js           # Cart management & calculations
│   └── useUndoRedo.js       # History undo / redo stack
├── pages/
│   ├── Home.jsx             # Studio landing page & hero
│   ├── CakeBuilder.jsx      # 3-column interactive customizer workspace
│   ├── Gallery.jsx          # Filterable predefined masterpieces
│   ├── Cart.jsx             # Shopping basket with previews & subtotal
│   ├── Checkout.jsx         # UAE delivery scheduling & contact details
│   └── OrderConfirmation.jsx# Celebration screen with confetti & receipt
├── utils/
│   ├── canvasExport.js      # Konva snapshot & PNG download utilities
│   ├── priceCalculator.js   # Dynamic itemized pricing calculations
│   └── storage.js           # LocalStorage helpers
├── App.jsx                  # React Router routes & providers
├── index.css                # Tailwind directives & pink gingham patterns
└── main.jsx                 # Application entry point
```

---

## 🚀 Running the Project Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```
