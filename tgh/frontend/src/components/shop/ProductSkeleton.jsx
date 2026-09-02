const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">

      {/* Image */}

      <div className="h-80 bg-gray-200"></div>

      {/* Content */}

      <div className="p-4">

        {/* Category */}

        <div className="h-3 w-20 bg-gray-200 rounded mb-3"></div>

        {/* Product Name */}

        <div className="h-5 bg-gray-200 rounded mb-2"></div>

        <div className="h-5 w-3/4 bg-gray-200 rounded mb-4"></div>

        {/* Rating */}

        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>

        {/* Price */}

        <div className="flex gap-3 mb-4">

          <div className="h-6 w-20 bg-gray-200 rounded"></div>

          <div className="h-6 w-16 bg-gray-200 rounded"></div>

        </div>

        {/* Stock */}

        <div className="h-4 w-24 bg-gray-200 rounded mb-5"></div>

        {/* Button */}

        <div className="h-11 bg-gray-200 rounded-xl"></div>

      </div>

    </div>
  );
};

export default ProductSkeleton;