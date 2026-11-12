import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { formatPrice } from '../utils/priceCalculator';
import { saveOrderRecord } from '../utils/storage';
import {
  ShieldCheck,
  Truck,
  Store,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartSubtotal, clearCart } = useCartContext();

  const [fulfillmentType, setFulfillmentType] = useState('delivery'); // 'delivery' | 'pickup'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    emirate: 'Dubai',
    deliveryDate: '',
    deliveryTime: 'morning',
    specialNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery charge calculation
  const deliveryFee = fulfillmentType === 'pickup' || cartSubtotal >= 350 ? 0 : 30;
  const grandTotal = cartSubtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Contact phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (fulfillmentType === 'delivery' && !formData.address.trim())
      newErrors.address = 'Delivery address is required';
    if (!formData.deliveryDate)
      newErrors.deliveryDate = 'Please select a preferred celebration date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (items.length === 0) {
      alert('Your cart is empty. Please design a cake first!');
      navigate('/customize');
      return;
    }

    setIsSubmitting(true);

    const orderId = `SWT-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: formData,
      fulfillmentType,
      items,
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      status: 'Confirmed & In Kitchen Prep'
    };

    saveOrderRecord(orderRecord);

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/order-confirmation', { state: { order: orderRecord } });
    }, 600);
  };

  // If cart is empty and user lands on checkout
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gingham-soft py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-cake-soft border border-cake-border">
          <h2 className="font-display text-2xl font-bold text-cake-text mb-2">No cakes to checkout</h2>
          <p className="text-xs text-cake-muted mb-6">Please craft or select a cake to proceed with your order.</p>
          <Link
            to="/customize"
            className="px-6 py-3 rounded-2xl bg-cake-primary text-white text-xs font-bold inline-block"
          >
            Go to 2D Cake Studio
          </Link>
        </div>
      </div>
    );
  }

  // Get tomorrow's date for minimum delivery date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gingham-soft py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cake-light border border-pink-200 text-cake-dark text-xs font-bold mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cake-primary" />
            <span>Secure UAE Cake Concierge</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-cake-text">
            Finalize Your Celebration Order
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Input Form (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Delivery or Pickup Choice */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-cake-soft border border-cake-border/80">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cake-muted mb-3 flex items-center gap-2">
                <span>1. Fulfillment Preference</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'bg-cake-light border-cake-primary ring-2 ring-cake-primary/20 shadow-sm'
                      : 'bg-white border-cake-border/80 hover:border-cake-primary/40'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${fulfillmentType === 'delivery' ? 'bg-cake-primary text-white' : 'bg-cake-cream text-cake-primary'}`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cake-text">Chilled Delivery</div>
                    <div className="text-[11px] text-cake-muted">Direct to your venue</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'bg-cake-light border-cake-primary ring-2 ring-cake-primary/20 shadow-sm'
                      : 'bg-white border-cake-border/80 hover:border-cake-primary/40'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${fulfillmentType === 'pickup' ? 'bg-cake-primary text-white' : 'bg-cake-cream text-cake-primary'}`}>
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cake-text">Atelier Pickup</div>
                    <div className="text-[11px] text-cake-muted">Dubai Design District</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Customer & Contact Details */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-cake-soft border border-cake-border/80 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cake-muted flex items-center gap-2">
                <span>2. Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cake-text block mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Layla Al Mansoori"
                      className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border focus:outline-none focus:ring-2 text-cake-text ${
                        errors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-cake-border/80 focus:ring-cake-primary/40'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-cake-text block mb-1">Phone Number (UAE) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border focus:outline-none focus:ring-2 text-cake-text ${
                        errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-cake-border/80 focus:ring-cake-primary/40'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cake-text block mb-1">Email Address (for Receipt) *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="layla@example.com"
                    className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border focus:outline-none focus:ring-2 text-cake-text ${
                      errors.email ? 'border-red-400 focus:ring-red-300' : 'border-cake-border/80 focus:ring-cake-primary/40'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              {fulfillmentType === 'delivery' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="text-xs font-semibold text-cake-text block mb-1">Emirate</label>
                      <select
                        name="emirate"
                        value={formData.emirate}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border border-cake-border/80 focus:outline-none focus:ring-2 focus:ring-cake-primary/40 text-cake-text font-medium"
                      >
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-cake-text block mb-1">Delivery Address *</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Villa / Apt, Street, District"
                          className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border focus:outline-none focus:ring-2 text-cake-text ${
                            errors.address ? 'border-red-400 focus:ring-red-300' : 'border-cake-border/80 focus:ring-cake-primary/40'
                          }`}
                        />
                      </div>
                      {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Date & Time Selection */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-cake-soft border border-cake-border/80 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cake-muted flex items-center gap-2">
                <span>3. Date & Time Scheduling</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cake-text block mb-1">Celebration Date *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      name="deliveryDate"
                      min={minDateStr}
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border focus:outline-none focus:ring-2 text-cake-text ${
                        errors.deliveryDate ? 'border-red-400 focus:ring-red-300' : 'border-cake-border/80 focus:ring-cake-primary/40'
                      }`}
                    />
                  </div>
                  {errors.deliveryDate && <p className="text-[11px] text-red-500 mt-1">{errors.deliveryDate}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-cake-text block mb-1">Preferred Time Window</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-cake-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border border-cake-border/80 focus:outline-none focus:ring-2 focus:ring-cake-primary/40 text-cake-text font-medium"
                    >
                      <option value="morning">Morning (9:00 AM – 1:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                      <option value="evening">Evening (5:00 PM – 9:00 PM)</option>
                      <option value="exact">Specific Time (Note below)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cake-text block mb-1">
                  Baker & Delivery Instructions (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-cake-muted absolute left-3 top-3" />
                  <textarea
                    name="specialNotes"
                    rows={3}
                    value={formData.specialNotes}
                    onChange={handleChange}
                    placeholder="e.g. Please leave at the reception, or ring buzzer 402 upon arrival..."
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-cake-cream/40 border border-cake-border/80 focus:outline-none focus:ring-2 focus:ring-cake-primary/40 text-cake-text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Confirm (Col 8-12) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-cake-soft border border-cake-border/80 sticky top-28 space-y-4">
            <h2 className="font-display text-xl font-bold text-cake-text pb-3 border-b border-cake-border/60">
              Cake Order Review
            </h2>

            {/* List of Ordered Cakes */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.cartId} className="flex items-center gap-3 p-2 rounded-2xl bg-cake-cream/40 border border-cake-border/60">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-1 border border-cake-border/60 flex-shrink-0">
                    {item.previewImage ? (
                      <img src={item.previewImage} alt="cake" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xl">🎂</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-cake-text capitalize truncate">
                      {item.config.shape} Tier ({item.config.size} KG)
                    </h4>
                    <p className="text-[11px] text-cake-muted capitalize truncate">
                      {item.config.flavour} • {item.config.frostingColor} cream
                    </p>
                    {item.config.message?.text && (
                      <p className="text-[10px] text-cake-primary italic truncate">
                        "{item.config.message.text}"
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-cake-dark block">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                    <span className="text-[10px] text-cake-muted">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation */}
            <div className="pt-3 border-t border-cake-border/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-cake-muted">Cakes Subtotal:</span>
                <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cake-muted">Chilled Logistics:</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold uppercase">Free</span> : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-dashed border-cake-border flex items-baseline justify-between text-cake-dark">
                <span className="font-bold text-sm">Total Due (AED):</span>
                <span className="font-display text-2xl font-black">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-cake-primary hover:bg-cake-dark active:scale-[0.98] text-white font-bold text-sm shadow-cake-soft hover:shadow-cake-hover transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming with Kitchen...' : 'Confirm Cake Order'}</span>
            </button>

            <p className="text-center text-[11px] text-cake-muted">
              💳 Payment upon delivery / Pay on pickup accepted. No advance card required.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
