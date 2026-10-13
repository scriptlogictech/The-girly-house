

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ selectedColor }) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (selectedColor?.images?.length > 0) {
      setSelectedImage(selectedColor.images[0].url);
    } else {
      setSelectedImage("");
    }
  }, [selectedColor]);

  if (!selectedColor) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border bg-gray-100 text-center sm:aspect-[3/4]">
        <p className="text-sm text-gray-500 sm:text-base">
          No Image Available
        </p>
      </div>
    );
  }

  const images = selectedColor.images || [];

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4 lg:flex-row lg:gap-4 xl:gap-5">

      {/* Thumbnail Images */}

      {images.length > 0 && (
        <div className="order-2 flex w-full min-w-0 gap-2 overflow-x-auto pb-1 sm:gap-3 lg:order-1 lg:w-20 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-0 xl:w-24">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image.url)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={selectedImage === image.url}
              className={`h-16 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-16 sm:rounded-xl lg:h-24 lg:w-full xl:h-28 ${
                selectedImage === image.url
                  ? "border-[#6B1028]"
                  : "border-gray-200 hover:border-[#b77b89]"
              }`}
            >
              <img
                src={image.url}
                alt={image.altText || `Product thumbnail ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Product Image */}

      <div className="order-1 w-full min-w-0 flex-1 lg:order-2">
        <motion.div
          key={selectedImage || "no-image"}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white sm:rounded-2xl"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected product"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:aspect-[4/5]"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100 sm:aspect-[3/4] lg:aspect-[4/5]">
              <p className="px-4 text-center text-sm text-gray-500 sm:text-base">
                No Image Available
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductGallery;