const PRODUCT_IMAGE_PLACEHOLDER = "/images/product-placeholder.svg";

const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

export const getProductImageSrc = (image: string | null | undefined): string => {
  const normalizedImage = image?.trim();

  if (!normalizedImage) {
    return PRODUCT_IMAGE_PLACEHOLDER;
  }

  if (
    normalizedImage.startsWith("/") ||
    normalizedImage.startsWith("data:") ||
    ABSOLUTE_URL_PATTERN.test(normalizedImage)
  ) {
    return normalizedImage;
  }

  return `/images/products/${normalizedImage}`;
};

export { PRODUCT_IMAGE_PLACEHOLDER };
