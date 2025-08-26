export function formatPrice(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatPriceRange(
  min: number,
  max: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  if (min === max) {
    return formatPrice(min, currency, locale);
  }
  
  return `${formatPrice(min, currency, locale)} - ${formatPrice(max, currency, locale)}`;
}
