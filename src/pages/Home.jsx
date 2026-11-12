import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CAKE_DESIGNS } from '../data/cakeDesigns';
import { formatPrice } from '../utils/priceCalculator';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Palette,
  Truck,
  ShieldCheck,
  Star,
  Award,
  Layers,
  CheckCircle2,
  Smile
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const featuredCakes = CAKE_DESIGNS.slice(0, 3);

  return (
    <div className="min-h-screen bg-gingham-soft">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FFF5F8] border-b border-cake-border/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cake-light border border-pink-200 text-cake-dark text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cake-primary" />
                <span>The UAE's Premier Interactive Cake Atelier</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-cake-text tracking-tight leading-[1.15]">
                Craft Your Dream Cake In Real-Time.
              </h1>

              <p className="text-base sm:text-lg text-cake-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Design custom tiered celebration cakes with our visual 2D builder. Choose luxurious Belgian flavours, delicate frostings, drag-and-drop fresh fruits & satin bows, and watch your creation come alive.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/customize"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cake-primary hover:bg-cake-dark text-white font-bold text-sm shadow-cake-soft hover:shadow-cake-hover active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Palette className="w-4 h-4" />
                  <span>Start Designing Your Cake</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/gallery"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-cake-cream text-cake-text font-bold text-sm border border-cake-border/80 shadow-xs hover:border-cake-primary/40 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Gallery</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-cake-border/60 text-center lg:text-left">
                <div>
                  <div className="font-display text-2xl font-black text-cake-primary">100%</div>
                  <div className="text-[11px] text-cake-muted font-medium">Bespoke By You</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-black text-cake-primary">4.9 ★</div>
                  <div className="text-[11px] text-cake-muted font-medium">Over 2,500 Reviews</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-black text-cake-primary">UAE</div>
                  <div className="text-[11px] text-cake-muted font-medium">Chilled Van Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Preview Display */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative floating badges */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-cake-soft border border-pink-200 text-xs font-bold text-cake-dark flex items-center gap-2 z-20 animate-bounce">
                  <span>🍓</span> Fresh Organic Strawberries
                </div>
                <div className="absolute -bottom-4 -right-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-cake-soft border border-pink-200 text-xs font-bold text-cake-dark flex items-center gap-2 z-20">
                  <span>✨</span> Drag & Drop Real-Time
                </div>

                {/* Cake Card Preview */}
                <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-white/90 bg-gradient-to-b from-[#FFF0F5] to-[#FFF9F3] text-center overflow-hidden">
                  <div className="py-4 flex flex-col items-center">
                    <img
                      src="/assets/cakes/cake_round_strawberry.png"
                      alt="Photorealistic Strawberry Custom Cake"
                      className="max-h-56 max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform"
                    />
                    <span className="font-serif italic font-bold text-lg text-cake-dark bg-white/90 px-4 py-1 rounded-full border border-pink-200 shadow-xs mt-2">
                      "Happy 21st Maya!"
                    </span>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-cake-light text-cake-primary font-bold">
                        Velvet Strawberry
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-cake-light text-cake-primary font-bold">
                        Marble Board
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/customize')}
                    className="w-full py-3.5 rounded-2xl bg-cake-primary hover:bg-cake-dark text-white text-xs font-bold shadow-cake-soft transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Launch Cake Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 SIMPLE STEPS) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cake-light text-cake-dark text-xs font-bold mb-2">
            <span>Seamless Customization</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-cake-text">
            How The 2D Studio Works
          </h2>
          <p className="text-xs sm:text-sm text-cake-muted mt-2">
            From your creative vision to your banquet table in four delicious steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Shape & Size',
              desc: 'Select round, square, heart or rectangle tiers from 0.5 KG up to 3 KG.',
              icon: '📐'
            },
            {
              step: '02',
              title: 'Flavours & Frosting',
              desc: 'Pick sponge bases from Belgian truffle to Red Velvet, plus pastel icing palettes.',
              icon: '🎨'
            },
            {
              step: '03',
              title: 'Drag & Drop Toppings',
              desc: 'Place fresh berries, French macarons, candles, satin ribbons, and custom sugar lettering.',
              icon: '🍓'
            },
            {
              step: '04',
              title: 'Chilled UAE Delivery',
              desc: 'Freshly baked and hand-delivered in temperature-controlled vans directly to your party.',
              icon: '🚚'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-6 shadow-cake-soft border border-cake-border/70 hover:border-cake-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-mono text-sm font-black text-cake-primary bg-cake-light px-2.5 py-1 rounded-xl">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-cake-text mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-cake-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLER GALLERY PREVIEW */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-cake-border/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cake-light text-cake-dark text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cake-primary" />
                <span>Atelier Signatures</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-cake-text">
                Popular Custom Designs
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold text-cake-primary hover:text-cake-dark flex items-center gap-1"
            >
              <span>View All Gallery Masterpieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCakes.map((cake) => (
              <div
                key={cake.id}
                className="bg-cake-cream/40 rounded-3xl overflow-hidden border border-cake-border/80 hover:shadow-cake-hover transition-all flex flex-col"
              >
                <div className="h-52 bg-gradient-to-b from-[#FFF0F5] to-white flex items-center justify-center p-4">
                  <img
                    src={cake.previewPhoto || `/assets/cakes/cake_${cake.config.shape}_${cake.config.flavour}.png`}
                    alt={cake.title}
                    className="max-h-44 max-w-full object-contain filter drop-shadow-md hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-cake-primary uppercase tracking-wider">
                      {cake.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-cake-text mt-1">
                      {cake.title}
                    </h3>
                    <p className="text-xs text-cake-muted mt-1 line-clamp-2">
                      {cake.tagline}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-cake-border/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-cake-muted block">From</span>
                      <span className="font-display font-bold text-lg text-cake-dark">
                        {formatPrice(cake.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/customize', { state: { cakeConfig: cake.config } })}
                      className="px-4 py-2 rounded-xl bg-cake-primary hover:bg-cake-dark text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-cake-primary via-cake-dark to-cake-primary rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Ready to create?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black">
              Bring Your Celebration Vision To Life
            </h2>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto">
              No static stock cakes. Every detail is rendered visually and baked to perfection with gourmet ingredients.
            </p>
            <div className="pt-4">
              <Link
                to="/customize"
                className="px-8 py-4 rounded-2xl bg-white text-cake-primary hover:bg-cake-cream font-bold text-sm shadow-xl inline-flex items-center gap-2 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cake-primary" />
                <span>Open 2D Cake Customizer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
