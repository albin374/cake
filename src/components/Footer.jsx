import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-cake-border/80 mt-16 text-cake-text relative overflow-hidden">
      {/* Decorative top pink gingham ribbon */}
      <div className="h-3 w-full bg-gingham" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cake-primary flex items-center justify-center text-white text-xl shadow-cake-soft">
                🎂
              </div>
              <span className="font-display text-2xl font-black text-cake-text">
                SweetArt Studio
              </span>
            </div>
            <p className="text-xs text-cake-muted leading-relaxed">
              Handcrafting bespoke luxury celebration cakes with pure French butter, Belgian chocolate, and exquisite visual artistry. Tailored to perfection by you.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cake-primary">
              <Sparkles className="w-4 h-4" />
              <span>100% Fresh Daily Artisanal Baking</span>
            </div>
          </div>

          {/* Quick Studio Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-cake-dark">
              Explore Atelier
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/customize" className="hover:text-cake-primary transition-colors flex items-center gap-1.5">
                  <span>→</span> Interactive 2D Cake Builder
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-cake-primary transition-colors flex items-center gap-1.5">
                  <span>→</span> Predefined Masterpieces
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cake-primary transition-colors flex items-center gap-1.5">
                  <span>→</span> View Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-cake-primary transition-colors flex items-center gap-1.5">
                  <span>→</span> Express UAE Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* UAE Delivery Coverage */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-cake-dark">
              Delivery & Service
            </h4>
            <ul className="space-y-2 text-xs text-cake-muted">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
                <span>Dubai • Abu Dhabi • Sharjah • Ajman (Chilled Vans)</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
                <span>Orders 7 Days a Week: 9:00 AM – 10:00 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
                <span>Guaranteed On-Time Temperature Controlled</span>
              </li>
            </ul>
          </div>

          {/* Contact & Boutique Info */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-cake-dark">
              Atelier Concierge
            </h4>
            <div className="space-y-2 text-xs text-cake-muted">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cake-primary" />
                <span>+971 4 800 CAKES (22537)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cake-primary" />
                <span>concierge@sweetartcakes.ae</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-cake-light text-cake-dark text-[11px] font-semibold border border-pink-200">
                  Custom Orders Accepted 24/7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-cake-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-cake-muted gap-4">
          <p>© {new Date().getFullYear()} SweetArt Cake Customizer & Atelier. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-cake-primary fill-cake-primary" /> for sweet celebrations
          </p>
        </div>
      </div>
    </footer>
  );
};
