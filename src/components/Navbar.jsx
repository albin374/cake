import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { ShoppingBag, Sparkles, Menu, X, Heart, Palette } from 'lucide-react';

export const Navbar = () => {
  const { cartCount } = useCartContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Customize Cake', path: '/customize', highlight: true },
    { name: 'Design Gallery', path: '/gallery' },
    { name: 'My Cart', path: '/cart' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cake-border/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cake-primary to-cake-accent flex items-center justify-center text-white text-2xl shadow-cake-soft group-hover:scale-105 transition-transform duration-200">
              🎂
            </div>
            <div>
              <span className="font-display text-2xl font-black text-cake-text tracking-tight flex items-center gap-1.5">
                SweetArt
                <span className="text-cake-primary text-xs font-sans uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cake-light border border-pink-200">
                  Studio
                </span>
              </span>
              <span className="text-[11px] text-cake-muted tracking-wide block font-medium">
                Artisan Custom Cake Atelier • UAE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-2xl text-xs lg:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cake-light text-cake-primary font-bold shadow-xs'
                      : 'text-cake-text hover:text-cake-primary hover:bg-cake-cream/50'
                  } ${link.highlight ? 'border border-cake-primary/20' : ''}`
                }
              >
                {link.highlight && <Palette className="w-3.5 h-3.5 text-cake-primary" />}
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-cake-cream hover:bg-cake-light text-cake-text border border-cake-border/80 transition-all flex items-center gap-2"
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-cake-primary" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-cake-primary text-white text-[11px] font-black flex items-center justify-center animate-bounce shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Design Now CTA */}
            <button
              onClick={() => navigate('/customize')}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cake-primary hover:bg-cake-dark active:scale-95 text-white text-xs font-bold shadow-cake-soft hover:shadow-cake-hover transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Design Your Cake</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-cake-cream text-cake-text border border-cake-border/80"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cake-border px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cake-primary text-white'
                    : 'text-cake-text hover:bg-cake-cream'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/customize');
              }}
              className="w-full py-3 rounded-xl bg-cake-primary text-white font-bold text-sm shadow-cake-soft flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Interactive Builder</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
