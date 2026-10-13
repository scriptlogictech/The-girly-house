
import { useState } from "react";

const ProductTabs = ({ product }) => {
  const tabs = [
    "Description",
    "Details",
    "Care",
    "Shipping",
  ];

  const [activeTab, setActiveTab] = useState("Description");

  const headingClass =
    "mb-3 text-xl font-semibold text-[#6B1028] sm:mb-4 sm:text-2xl";

  const listClass =
    "list-disc space-y-2 pl-5 text-sm leading-6 sm:pl-6 sm:text-base sm:leading-8";

  return (
    <section className="mt-6 w-full min-w-0 sm:mt-10 lg:mt-12">

      {/* Tabs Navigation */}

      <div
        className="w-full min-w-0 overflow-x-auto border-b border-gray-200"
        role="tablist"
        aria-label="Product information"
      >
        <div className="flex min-w-max gap-2 sm:gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const tabId = `product-tab-${tab.toLowerCase()}`;
            const panelId = `product-panel-${tab.toLowerCase()}`;

            return (
              <button
                key={tab}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 border-b-2 px-3 pb-3 pt-2 text-sm font-medium transition-colors sm:px-4 sm:text-base md:text-lg ${
                  isActive
                    ? "border-[#6B1028] text-[#6B1028]"
                    : "border-transparent text-gray-500 hover:text-[#6B1028]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}

      <div
        id={`product-panel-${activeTab.toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`product-tab-${activeTab.toLowerCase()}`}
        className="mt-4 w-full min-w-0 overflow-wrap-anywhere rounded-xl border border-gray-200 bg-white p-4 text-gray-700 sm:mt-6 sm:p-6 lg:mt-8 lg:p-7"
      >
        {/* Description */}

        {activeTab === "Description" && (
          <div>
            <h3 className={headingClass}>
              Product Description
            </h3>

            <p className="break-words text-sm leading-7 sm:text-base sm:leading-8">
              {product?.description ||
                "No description available for this product."}
            </p>
          </div>
        )}

        {/* Details */}

        {activeTab === "Details" && (
          <div>
            <h3 className={headingClass}>
              Product Details
            </h3>

            <ul className={listClass}>
              <li className="break-words">
                <strong>Category:</strong>{" "}
                {product?.category?.name ||
                  product?.category ||
                  "Women's Fashion"}
              </li>

              <li className="break-words">
                <strong>Brand:</strong>{" "}
                {product?.brand || "The Girly House"}
              </li>

              <li className="break-words">
                <strong>Material:</strong>{" "}
                {product?.material || "Premium Fabric"}
              </li>

              <li className="break-words">
                <strong>Fit:</strong>{" "}
                {product?.fit || "Regular Fit"}
              </li>

              <li className="break-words">
                <strong>SKU:</strong>{" "}
                {product?.sku || product?._id}
              </li>
            </ul>
          </div>
        )}

        {/* Care */}

        {activeTab === "Care" && (
          <div>
            <h3 className={headingClass}>
              Care Instructions
            </h3>

            <ul className={listClass}>
              <li>Machine wash cold.</li>
              <li>Do not bleach.</li>
              <li>Dry in shade.</li>
              <li>Iron at low temperature.</li>
              <li>Do not tumble dry.</li>
            </ul>
          </div>
        )}

        {/* Shipping */}

        {activeTab === "Shipping" && (
          <div>
            <h3 className={headingClass}>
              Shipping &amp; Returns
            </h3>

            <ul className={listClass}>
              <li>Free shipping on orders above ₹999.</li>
              <li>Estimated delivery: 3–7 business days.</li>
              <li>Easy 7-day return &amp; exchange.</li>
              <li>Secure packaging for all products.</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;