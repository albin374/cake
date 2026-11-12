import {
  BASE_CAKE_PRICES,
  SIZE_PRICES,
  FLAVOUR_PRICES,
  FROSTING_PRICES,
  ICING_STYLE_PRICES,
  MESSAGE_CUSTOMIZATION_FEE,
  CURRENCY
} from '../data/cakePrices';

/**
 * Calculates itemized breakdown and total for a cake configuration
 * @param {Object} cake - The cake state object
 * @returns {Object} Price breakdown and total in AED
 */
export const calculateCakePrice = (cake) => {
  if (!cake) return { total: 0, currency: CURRENCY };

  const shape = cake.shape || 'round';
  const size = cake.size || '1';
  const flavour = cake.flavour || 'vanilla';
  const frosting = cake.frosting || 'vanilla';
  const icingStyle = cake.icingStyle || 'smooth';
  const decorations = cake.decorations || [];
  const message = cake.message?.text?.trim() || '';

  // Base price for shape
  const basePrice = BASE_CAKE_PRICES[shape] || 120;

  // Size calculation: multiplier applies to base price, plus any tier extraFee
  const sizeConfig = SIZE_PRICES[size] || { multiplier: 1.0, extraFee: 0 };
  const sizeBaseAdjusted = Math.round(basePrice * sizeConfig.multiplier);
  const sizeSurcharge = (sizeBaseAdjusted - basePrice) + (sizeConfig.extraFee || 0);

  // Flavour surcharge
  const flavourConfig = FLAVOUR_PRICES[flavour] || { surcharge: 0 };
  const flavourSurcharge = flavourConfig.surcharge || 0;

  // Frosting surcharge
  const frostingConfig = FROSTING_PRICES[frosting] || { surcharge: 0 };
  const frostingSurcharge = frostingConfig.surcharge || 0;

  // Icing style surcharge
  const icingConfig = ICING_STYLE_PRICES[icingStyle] || { surcharge: 0 };
  const icingSurcharge = icingConfig.surcharge || 0;

  // Decorations charge
  const decorationsCharge = decorations.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  // Message customization charge (complimentary if short, else standard artisanal lettering fee)
  const messageFee = message.length > 0 ? (message.length > 15 ? MESSAGE_CUSTOMIZATION_FEE : 0) : 0;

  // Total Customization Charges
  const customizationCharges = flavourSurcharge + frostingSurcharge + icingSurcharge + messageFee;

  // Grand Total
  const total = basePrice + sizeSurcharge + customizationCharges + decorationsCharge;

  return {
    basePrice,
    sizeSurcharge,
    flavourSurcharge,
    frostingSurcharge,
    icingSurcharge,
    messageFee,
    customizationCharges,
    decorationsCharge,
    total,
    currency: CURRENCY,
    itemCount: decorations.length
  };
};

export const formatPrice = (amount) => {
  return `${CURRENCY} ${Number(amount || 0).toLocaleString()}`;
};
