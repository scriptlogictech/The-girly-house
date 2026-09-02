import { useState } from "react";

const ProductTabs = ({ product }) => {
  const tabs = [
    "Description",
    "Details",
    "Care",
    "Shipping",
  ];

  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-lg font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-[#6B1028] text-[#6B1028]"
                : "text-gray-500 hover:text-[#6B1028]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 leading-8 text-gray-700">

        {activeTab === "Description" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#6B1028]">
              Product Description
            </h3>

            <p>
              {product?.description ||
                "No description available for this product."}
            </p>
          </div>
        )}

        {activeTab === "Details" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#6B1028]">
              Product Details
            </h3>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Category:</strong>{" "}
                {product?.category?.name || product?.category || "Women's Fashion"}
              </li>

              <li>
                <strong>Brand:</strong>{" "}
                {product?.brand || "The Girly House"}
              </li>

              <li>
                <strong>Material:</strong>{" "}
                {product?.material || "Premium Fabric"}
              </li>

              <li>
                <strong>Fit:</strong>{" "}
                {product?.fit || "Regular Fit"}
              </li>

              <li>
                <strong>SKU:</strong>{" "}
                {product?.sku || product?._id}
              </li>
            </ul>
          </div>
        )}

        {activeTab === "Care" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#6B1028]">
              Care Instructions
            </h3>

            <ul className="list-disc ml-6 space-y-2">
              <li>Machine wash cold.</li>
              <li>Do not bleach.</li>
              <li>Dry in shade.</li>
              <li>Iron at low temperature.</li>
              <li>Do not tumble dry.</li>
            </ul>
          </div>
        )}

        {activeTab === "Shipping" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-[#6B1028]">
              Shipping & Returns
            </h3>

            <ul className="list-disc ml-6 space-y-2">
              <li>Free shipping on orders above ₹999.</li>
              <li>Estimated delivery: 3–7 business days.</li>
              <li>Easy 7-day return & exchange.</li>
              <li>Secure packaging for all products.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;