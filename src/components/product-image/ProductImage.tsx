import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { getProductImageSrc, PRODUCT_IMAGE_PLACEHOLDER } from "../../utils/getProductImageSrc";

type ProductImageProps = Omit<ComponentPropsWithoutRef<"img">, "src"> & {
  src?: string | null;
};

export const ProductImage = ({ src, onError, ...props }: ProductImageProps) => {
  const resolvedSrc = getProductImageSrc(src);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== PRODUCT_IMAGE_PLACEHOLDER) {
          setCurrentSrc(PRODUCT_IMAGE_PLACEHOLDER);
        }

        onError?.(event);
      }}
    />
  );
};
