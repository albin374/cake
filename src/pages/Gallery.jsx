import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAKE_DESIGNS, GALLERY_CATEGORIES } from '../data/cakeDesigns';
import { formatPrice } from '../utils/priceCalculator';
import { Sparkles, Star, ArrowRight, Heart, Filter, Search } from 'lucide-react';

export const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDesigns = useMemo(() => {
    return CAKE_DESIGNS.filter((design) => {
      const matchCategory =
        selectedCategory === 'All' || design.category === selectedCategory;
      const matchSearch =
        design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCustomizeDesign = (design) => {
    navigate('/customize', { state: { cakeConfig: design.config } });
  };

  return (
    <div className="min-h-screen bg-gingham-soft py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cake-light border border-pink-200 text-cake-dark text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cake-primary" />
            <span>Curated Artisan Collection</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-cake-text">
            Predefined Cake Gallery
          </h1>
          <p className="text-sm sm:text-base text-cake-muted mt-3">
            Explore our master pastry chef creations. Select any masterpiece to open in our 2D Cake Studio and customize every single layer, topping, and inscription.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-cake-soft border border-cake-border/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cake-primary text-white shadow-sm'
                      : 'bg-cake-cream/70 text-cake-text hover:bg-cake-light'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cake-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes or themes..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl bg-cake-cream/50 border border-cake-border/80 focus:outline-none focus:ring-2 focus:ring-cake-primary/40 text-cake-text"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDesigns.map((cake) => (
            <div
              key={cake.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-cake-soft hover:shadow-cake-hover border border-cake-border/70 hover:border-cake-primary/50 transition-all duration-300 flex flex-col"
            >
              {/* Visual Card Top Header */}
              <div className="relative h-56 bg-gradient-to-b from-[#FFF0F5] to-[#FFF9F3] flex items-center justify-center p-6 border-b border-cake-border/50 overflow-hidden">
                {/* Badge */}
                {cake.badge && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-cake-primary border border-pink-200 shadow-sm z-10">
                    {cake.badge}
                  </span>
                )}

                {/* Star Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-cake-text border border-pink-200 shadow-sm flex items-center gap-1 z-10">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{cake.rating}</span>
                  <span className="text-cake-muted text-[10px]">({cake.reviewsCount})</span>
                </div>

                {/* Artistic 2D Cake Graphic Representation */}
                <div className="relative flex flex-col items-center group-hover:scale-108 transition-transform duration-300">
                  <div className="text-6xl drop-shadow-md select-none">
                    {cake.config.flavour === 'chocolate' ? '🍫' : cake.config.shape === 'heart' ? '💖' : '🎂'}
                  </div>
                  <div className="mt-2 text-xs font-serif font-bold text-cake-dark tracking-wide bg-white/70 px-3 py-0.5 rounded-full border border-pink-100">
                    "{cake.config.message.text}"
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cake-primary mb-1">
                    {cake.category}
                  </div>
                  <h3 className="font-display text-xl font-bold text-cake-text group-hover:text-cake-primary transition-colors">
                    {cake.title}
                  </h3>
                  <p className="text-xs text-cake-muted mt-1.5 leading-relaxed">
                    {cake.tagline}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-cake-cream border border-cake-border/70 text-cake-text font-medium capitalize">
                      {cake.config.shape} Tier
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cake-cream border border-cake-border/70 text-cake-text font-medium capitalize">
                      {cake.config.flavour}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cake-cream border border-cake-border/70 text-cake-text font-medium capitalize">
                      {cake.config.frostingColor} Cream
                    </span>
                  </div>
                </div>

                {/* Price and Customize Button */}
                <div className="mt-6 pt-4 border-t border-cake-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-cake-muted block">Starting from</span>
                    <span className="font-display text-xl font-bold text-cake-dark">
                      {formatPrice(cake.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCustomizeDesign(cake)}
                    className="px-4 py-2.5 rounded-2xl bg-cake-primary hover:bg-cake-dark active:scale-95 text-white text-xs font-bold shadow-cake-soft flex items-center gap-1.5 transition-all"
                  >
                    <span>Customize This Cake</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
