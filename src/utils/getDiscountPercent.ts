export const getDiscountPercent = (oldPrice: number | null, price: number, fallbackDiscount = 0): number => {
  if (oldPrice && oldPrice > price) {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  return fallbackDiscount;
};
