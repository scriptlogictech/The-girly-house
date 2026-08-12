import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductBySlug } from "../services/productService";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

import "./ProductDetails.css";


const ProductDetails = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  /* =====================================================
     FETCH PRODUCT
  ===================================================== */

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await getProductBySlug(slug);

      if (!response.success) {
        throw new Error("Product not found");
      }

      const productData = response.data;

      setProduct(productData);

      /* Set default color and size */

      if (productData.colors?.length > 0) {
        const firstColor = productData.colors[0];

        setSelectedColor(firstColor);

        if (firstColor.sizes?.length > 0) {
          setSelectedSize(firstColor.sizes[0]);
        } else {
          setSelectedSize(null);
        }
      } else {
        setSelectedColor(null);
        setSelectedSize(null);
      }

    } catch (error) {
      console.error("Error fetching product:", error);

      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOADING STATE
  ===================================================== */

  if (loading) {
    return (
      <section className="product-details-loading">
        <div className="product-details-loading__spinner"></div>

        <h2>Loading Product...</h2>
      </section>
    );
  }

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  if (!product) {
    return (
      <section className="product-details-error">
        <div className="product-details-error__box">

          <div className="product-details-error__icon">
            !
          </div>

          <h2>Product Not Found</h2>

          <p>
            Sorry, we couldn't find the product you're
            looking for.
          </p>

        </div>
      </section>
    );
  }

  /* =====================================================
     PRODUCT DETAILS
  ===================================================== */

  return (
    <section className="product-details-page">

      <div className="product-details-container">

        {/* ================================================
            MAIN PRODUCT SECTION
        ================================================= */}

        <div className="product-details-main">

          {/* Product Gallery */}

          <div className="product-details-gallery">
            <ProductGallery
              selectedColor={selectedColor}
            />
          </div>

          {/* Product Information */}

          <div className="product-details-info">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

        </div>

        {/* ================================================
            PRODUCT TABS
        ================================================= */}

        <div className="product-details-tabs">
          <ProductTabs
            product={product}
          />
        </div>

        {/* ================================================
            RELATED PRODUCTS
        ================================================= */}

        <div className="product-details-related">
          <RelatedProducts
            product={product}
          />
        </div>

      </div>

    </section>
  );
};

export default ProductDetails;