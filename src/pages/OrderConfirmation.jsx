import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { formatPrice } from '../utils/priceCalculator';
import { CheckCircle2, Sparkles, Printer, ArrowRight, Heart, Calendar, Clock, MapPin, Phone } from 'lucide-react';

export const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    // Launch delightful confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#E85B91', '#FFD6E5', '#FEF08A']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#E85B91', '#C83E73', '#FFFFFF']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#E85B91', '#8B5CF6', '#10B981']
    });
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gingham-soft py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-cake-soft border border-cake-border">
          <h2 className="font-display text-2xl font-bold text-cake-text mb-2">No Active Order</h2>
          <p className="text-xs text-cake-muted mb-6">Looks like no recent order was found in this session.</p>
          <Link
            to="/customize"
            className="px-6 py-3 rounded-2xl bg-cake-primary text-white text-xs font-bold inline-block"
          >
            Design a New Cake
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gingham-soft py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-cake-soft border border-cake-border/80 text-center relative overflow-hidden mb-8">
          {/* Decorative ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cake-primary via-cake-accent to-cake-primary" />

          <div className="w-20 h-20 rounded-full bg-cake-light mx-auto flex items-center justify-center text-4xl mb-4 border border-pink-200 shadow-inner">
            🎉
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Order Confirmed & Sent to Bakery</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-black text-cake-text mb-2">
            Thank You, {order.customer?.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-cake-muted max-w-lg mx-auto">
            Your customized cake design has been safely received by our pastry team. We will handcraft every detail fresh for your celebration.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-cake-cream/70 border border-cake-border/70 inline-block text-left">
            <span className="text-[11px] font-bold text-cake-muted uppercase tracking-wider block">
              Order Reference Number
            </span>
            <span className="font-mono text-xl font-black text-cake-primary">
              #{order.orderId}
            </span>
          </div>
        </div>

        {/* Detailed Receipt Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-cake-soft border border-cake-border/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-cake-border/60">
            <h2 className="font-display text-xl font-bold text-cake-text">
              Celebration Details
            </h2>
            <button
              onClick={handlePrint}
              className="text-xs text-cake-primary hover:text-cake-dark font-semibold flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-cake-light transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order Receipt</span>
            </button>
          </div>

          {/* Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-cake-cream/40 border border-cake-border/60 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cake-text block">Delivery / Pickup Date</span>
                <span className="text-cake-muted">{order.customer?.deliveryDate}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cake-cream/40 border border-cake-border/60 flex items-start gap-3">
              <Clock className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cake-text block">Preferred Window</span>
                <span className="text-cake-muted capitalize">{order.customer?.deliveryTime}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cake-cream/40 border border-cake-border/60 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cake-text block">
                  {order.fulfillmentType === 'delivery' ? 'Delivery Venue' : 'Pickup Atelier'}
                </span>
                <span className="text-cake-muted">
                  {order.fulfillmentType === 'delivery'
                    ? `${order.customer?.address}, ${order.customer?.emirate}`
                    : 'SweetArt Atelier, Dubai Design District (d3), Bldg 4'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cake-cream/40 border border-cake-border/60 flex items-start gap-3">
              <Phone className="w-4 h-4 text-cake-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cake-text block">Contact Direct</span>
                <span className="text-cake-muted">{order.customer?.phone}</span>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cake-muted">
              Cakes in Preparation
            </h3>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-cake-cream/30 border border-cake-border/60 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1 border border-pink-100 flex-shrink-0">
                    {item.previewImage ? (
                      <img src={item.previewImage} alt="cake" className="w-full h-full object-contain" />
                    ) : (
                      <span>🎂</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-cake-text capitalize">
                      {item.config?.shape} Tier ({item.config?.size} KG)
                    </h4>
                    <p className="text-[11px] text-cake-muted capitalize">
                      {item.config?.flavour} sponge • {item.config?.frostingColor} {item.config?.frosting}
                    </p>
                    {item.config?.message?.text && (
                      <p className="text-[11px] text-cake-primary italic font-serif">
                        "{item.config.message.text}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-cake-dark block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  <span className="text-[10px] text-cake-muted">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-cake-border/60 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-cake-muted">Subtotal:</span>
              <span className="font-semibold">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cake-muted">Chilled Logistics:</span>
              <span className="font-semibold">
                {order.deliveryFee === 0 ? <span className="text-emerald-600 font-bold uppercase">Free</span> : formatPrice(order.deliveryFee)}
              </span>
            </div>
            <div className="pt-3 border-t border-dashed border-cake-border flex items-baseline justify-between text-cake-dark">
              <span className="font-bold text-sm">Total Paid / Due:</span>
              <span className="font-display text-2xl font-black">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Return Home & Design Next Button */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/customize')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cake-primary hover:bg-cake-dark text-white text-xs font-bold shadow-cake-soft flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Design Another Cake</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cake-cream hover:bg-cake-light text-cake-text text-xs font-bold border border-cake-border/80 transition-all"
            >
              Back to Atelier Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
