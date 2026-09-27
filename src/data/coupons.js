// Available discount coupons & promotion offers
export const COUPONS = [
  {
    code: 'SHUANA150',
    discount: 150,
    type: 'flat',
    minBooking: 500,
    description: 'Flat ₹150 OFF on first booking',
    tag: '⚡ Popular'
  },
  {
    code: 'FIRSTTRIP',
    discount: 100,
    type: 'flat',
    minBooking: 400,
    description: 'Flat ₹100 OFF on your first ride',
    tag: 'New User'
  },
  {
    code: 'ZING10',
    discount: 10,
    type: 'percent',
    maxDiscount: 250,
    minBooking: 600,
    description: '10% instant discount up to ₹250',
    tag: 'Special'
  },
  {
    code: 'SUPERBUS',
    discount: 200,
    type: 'flat',
    minBooking: 1200,
    description: 'Flat ₹200 OFF on premium luxury sleepers',
    tag: 'Luxury'
  }
];

export function applyCoupon(code, totalAmount) {
  const coupon = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) {
    return { valid: false, message: 'Invalid coupon code. Try SHUANA150' };
  }
  if (totalAmount < coupon.minBooking) {
    return { valid: false, message: `Minimum booking amount for ${coupon.code} is ₹${coupon.minBooking}` };
  }

  let discountAmount = 0;
  if (coupon.type === 'flat') {
    discountAmount = coupon.discount;
  } else if (coupon.type === 'percent') {
    discountAmount = Math.min(Math.round((totalAmount * coupon.discount) / 100), coupon.maxDiscount || 9999);
  }

  return {
    valid: true,
    code: coupon.code,
    discountAmount,
    message: `Applied ${coupon.code}! You saved ₹${discountAmount}`
  };
}
