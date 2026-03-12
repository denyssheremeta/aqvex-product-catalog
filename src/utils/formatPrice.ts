export const formatPrice = (value: number, currency = "грн"): string => {
  return `${value} ${currency}`;
};
