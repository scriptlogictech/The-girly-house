import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ selectedColor }) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    console.log("Selected Color:", selectedColor);
    console.log("Images:", selectedColor?.images);

    if (selectedColor?.images?.length > 0) {
      setSelectedImage(selectedColor.images[0].url);
    } else {
      setSelectedImage("");
    }
  }, [selectedColor]);

  if (!selectedColor) {
    return (
      <div className="flex items-center justify-center h-[500px] border rounded-xl bg-gray-100">
        <p className="text-gray-500">
          No Image Available
        </p>
      </div>
    );
  }

  const images = selectedColor.images || [];

  return (
    <div className="flex flex-col lg:flex-row gap-5">

      {/* Thumbnails */}

      <div className="flex lg:flex-col gap-3 order-2 lg:order-1">

        {images.map((image, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedImage(image.url)
            }
            className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
              selectedImage === image.url
                ? "border-[#6B1028]"
                : "border-gray-200"
            }`}
          >
            <img
              src={image.url}
              alt={image.altText || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

      </div>

      {/* Main Image */}

      <div className="flex-1 order-1 lg:order-2">

        <motion.div
          key={selectedImage}
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="rounded-2xl overflow-hidden border bg-white"
        >

          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-[600px] object-cover"
            />
          ) : (
            <div className="h-[600px] flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">
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