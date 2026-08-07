import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductBySlug } from "../services/productService";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

const ProductDetails = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

      if (productData.colors?.length > 0) {
        setSelectedColor(productData.colors[0]);

        if (productData.colors[0].sizes?.length > 0) {
          setSelectedSize(productData.colors[0].sizes[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Product...
        </h2>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Product not found.
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-[#FFFDFC] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery
            selectedColor={selectedColor}
          />

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

        <div className="mt-16">
          <ProductTabs product={product} />
        </div>

        <div className="mt-20">
          <RelatedProducts product={product} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;