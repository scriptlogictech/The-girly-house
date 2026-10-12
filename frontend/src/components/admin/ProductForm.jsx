
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaBoxOpen } from "react-icons/fa";
import { getAllCategories } from "../../services/categoryService";

const createInitialColor = () => ({
  name: "",
  colorCode: "#000000",
  images: [],
  sizes: [
    {
      size: "M",
      sku: "",
      price: "",
      discountPrice: "",
      stock: "",
      isAvailable: true,
    },
  ],
});

const initialForm = () => ({
  name: "",
  shortDescription: "",
  description: "",
  category: "",
  brand: "The Girly House",
  material: "",
  fabric: "",
  fit: "",
  careInstructions: "",
  tags: [],
  tagInput: "",
  colors: [createInitialColor()],
  isFeatured: false,
  isTrending: false,
  isNewArrival: true,
  isBestSeller: false,
});

const inputClass =
  "mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10 sm:text-base";

const labelClass = "block text-sm font-medium text-gray-700";

const ProductForm = ({
  loading = false,
  initialData = null,
  onSubmit,
}) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialForm(),
        ...initialData,
        tags: initialData.tags || [],
        colors:
          initialData.colors?.length > 0
            ? initialData.colors
            : [createInitialColor()],
        tagInput: "",
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      const list = res?.data?.categories ?? res?.data ?? res;

      setCategories(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Unable to load categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const tag = form.tagInput.trim();

    if (!tag || form.tags.includes(tag)) return;

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
      tagInput: "",
    }));
  };

  const removeTag = (index) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addColor = () => {
    setForm((prev) => ({
      ...prev,
      colors: [...prev.colors, createInitialColor()],
    }));
  };

  const removeColor = (colorIndex) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== colorIndex),
    }));
  };

  const handleColorChange = (colorIndex, field, value) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === colorIndex ? { ...color, [field]: value } : color
      ),
    }));
  };

  const addSize = (colorIndex) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === colorIndex
          ? {
              ...color,
              sizes: [
                ...color.sizes,
                {
                  size: "M",
                  sku: "",
                  price: "",
                  discountPrice: "",
                  stock: "",
                  isAvailable: true,
                },
              ],
            }
          : color
      ),
    }));
  };

  const removeSize = (colorIndex, sizeIndex) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === colorIndex
          ? {
              ...color,
              sizes: color.sizes.filter((_, j) => j !== sizeIndex),
            }
          : color
      ),
    }));
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === colorIndex
          ? {
              ...color,
              sizes: color.sizes.map((size, j) =>
                j === sizeIndex ? { ...size, [field]: value } : size
              ),
            }
          : color
      ),
    }));
  };

  const handleImages = (colorIndex, files) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === colorIndex
          ? { ...color, images: Array.from(files || []) }
          : color
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    [
      "name",
      "shortDescription",
      "description",
      "category",
      "brand",
      "material",
      "fabric",
      "fit",
      "careInstructions",
      "isFeatured",
      "isTrending",
      "isNewArrival",
      "isBestSeller",
    ].forEach((field) => {
      formData.append(field, form[field] ?? "");
    });

    formData.append("tags", JSON.stringify(form.tags));

    const colorsForBackend = form.colors.map((color) => ({
      name: color.name,
      colorCode: color.colorCode,
      sizes: color.sizes,
    }));

    formData.append("colors", JSON.stringify(colorsForBackend));

    form.colors.forEach((color) => {
      color.images.forEach((image) => {
        // Only append newly selected files.
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    });

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-0 space-y-6 overflow-hidden rounded-xl bg-white p-3 shadow-sm sm:space-y-8 sm:p-5 lg:p-6"
    >
      {/* Product Information */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Product Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="min-w-0">
            <label htmlFor="product-name" className={labelClass}>
              Product Name *
            </label>
            <input
              id="product-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="product-category" className={labelClass}>
              Category *
            </label>
            <select
              id="product-category"
              name="category"
              value={form.category?._id ?? form.category ?? ""}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {[
            ["brand", "Brand"],
            ["material", "Material"],
            ["fabric", "Fabric"],
            ["fit", "Fit"],
          ].map(([name, label]) => (
            <div key={name} className="min-w-0">
              <label htmlFor={name} className={labelClass}>
                {label}
              </label>
              <input
                id={name}
                type="text"
                name={name}
                value={form[name] ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="short-description" className={labelClass}>
            Short Description
          </label>
          <textarea
            id="short-description"
            rows={3}
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="care-instructions" className={labelClass}>
            Care Instructions
          </label>
          <textarea
            id="care-instructions"
            rows={3}
            name="careInstructions"
            value={form.careInstructions}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </section>

      {/* Tags */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Product Tags</h2>

        <input
          type="text"
          value={form.tagInput}
          placeholder="Type a tag and press Enter"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, tagInput: e.target.value }))
          }
          onKeyDown={handleTagKeyDown}
          className={inputClass}
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {form.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-pink-100 px-3 py-2 text-sm text-pink-800"
            >
              <span className="break-all">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                aria-label={`Remove ${tag} tag`}
                className="shrink-0 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </section>

      {/* Product Status */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
          Product Status
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["isFeatured", "Featured"],
            ["isTrending", "Trending"],
            ["isNewArrival", "New Arrival"],
            ["isBestSeller", "Best Seller"],
          ].map(([name, label]) => (
            <label
              key={name}
              className="flex min-h-12 items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm font-medium text-gray-700"
            >
              <input
                type="checkbox"
                name={name}
                checked={Boolean(form[name])}
                onChange={handleChange}
                className="h-4 w-4 accent-[#6B1028]"
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {/* Product Variants */}
      <section className="min-w-0">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Product Variants
          </h2>

          <button
            type="button"
            onClick={addColor}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#520b1e] sm:w-auto"
          >
            <FaPlus />
            Add Color
          </button>
        </div>

        <div className="space-y-5">
          {form.colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className="min-w-0 rounded-xl border border-gray-200 p-3 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                  Color #{colorIndex + 1}
                </h3>

                {form.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(colorIndex)}
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <FaTrash />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="min-w-0">
                  <label
                    htmlFor={`color-name-${colorIndex}`}
                    className={labelClass}
                  >
                    Color Name
                  </label>
                  <input
                    id={`color-name-${colorIndex}`}
                    type="text"
                    value={color.name}
                    onChange={(e) =>
                      handleColorChange(colorIndex, "name", e.target.value)
                    }
                    className={inputClass}
                    placeholder="e.g. Wine Red"
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor={`color-code-${colorIndex}`}
                    className={labelClass}
                  >
                    Color Code
                  </label>
                  <div className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-gray-300 px-3">
                    <input
                      id={`color-code-${colorIndex}`}
                      type="color"
                      value={color.colorCode || "#000000"}
                      onChange={(e) =>
                        handleColorChange(
                          colorIndex,
                          "colorCode",
                          e.target.value
                        )
                      }
                      className="h-8 w-12 cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="text-sm text-gray-600">
                      {color.colorCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="mt-6">
                <label
                  htmlFor={`images-${colorIndex}`}
                  className={labelClass}
                >
                  Upload Images
                </label>

                <input
                  id={`images-${colorIndex}`}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImages(colorIndex, e.target.files)}
                  className="mt-2 block w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#6B1028] file:px-3 file:py-2 file:text-white"
                />

                {color.images?.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {color.images.map((image, index) => {
                      const imageUrl =
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : typeof image === "string"
                            ? image
                            : image?.url;

                      return imageUrl ? (
                        <div
                          key={index}
                          className="relative aspect-square min-w-0 overflow-hidden rounded-lg border border-gray-200"
                        >
                          <img
                            src={imageUrl}
                            alt={`${color.name || "Product"} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {/* Sizes and Inventory */}
              <div className="mt-7 min-w-0">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Sizes & Inventory</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Set the size, SKU, pricing and available stock.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => addSize(colorIndex)}
                    className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 sm:w-auto"
                  >
                    <FaPlus />
                    Add Size
                  </button>
                </div>

                <div className="space-y-4">
                  {color.sizes.map((size, sizeIndex) => (
                    <div
                      key={sizeIndex}
                      className="grid min-w-0 grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3 xl:grid-cols-6"
                    >
                      <div className="min-w-0">
                        <label className={labelClass}>Size</label>
                        <input
                          aria-label="Size"
                          placeholder="e.g. M"
                          value={size.size}
                          onChange={(e) =>
                            handleSizeChange(
                              colorIndex,
                              sizeIndex,
                              "size",
                              e.target.value
                            )
                          }
                          className="mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-[#6B1028]"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className={labelClass}>SKU</label>
                        <input
                          aria-label="SKU"
                          placeholder="SKU code"
                          value={size.sku}
                          onChange={(e) =>
                            handleSizeChange(
                              colorIndex,
                              sizeIndex,
                              "sku",
                              e.target.value
                            )
                          }
                          className="mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-[#6B1028]"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className={labelClass}>Price (₹)</label>
                        <input
                          aria-label="Price"
                          type="number"
                          min="0"
                          placeholder="Price"
                          value={size.price}
                          onChange={(e) =>
                            handleSizeChange(
                              colorIndex,
                              sizeIndex,
                              "price",
                              e.target.value
                            )
                          }
                          className="mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-[#6B1028]"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className={labelClass}>Discount Price (₹)</label>
                        <input
                          aria-label="Discount Price"
                          type="number"
                          min="0"
                          placeholder="Discount"
                          value={size.discountPrice}
                          onChange={(e) =>
                            handleSizeChange(
                              colorIndex,
                              sizeIndex,
                              "discountPrice",
                              e.target.value
                            )
                          }
                          className="mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-[#6B1028]"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className={labelClass}>Stock</label>
                        <input
                          aria-label="Stock"
                          type="number"
                          min="0"
                          placeholder="Quantity"
                          value={size.stock}
                          onChange={(e) =>
                            handleSizeChange(
                              colorIndex,
                              sizeIndex,
                              "stock",
                              e.target.value
                            )
                          }
                          className="mt-2 w-full min-w-0 rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-[#6B1028]"
                        />
                      </div>

                      <div className="flex min-w-0 items-end">
                        <button
                          type="button"
                          onClick={() => removeSize(colorIndex, sizeIndex)}
                          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          <FaTrash />
                          Delete Size
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="sticky bottom-0 z-10 -mx-3 flex flex-col-reverse gap-3 border-t border-gray-200 bg-white/95 p-3 backdrop-blur sm:static sm:mx-0 sm:flex-row sm:justify-end sm:border-0 sm:bg-transparent sm:p-0 sm:pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={loading}
          className="min-h-12 w-full rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#6B1028] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#520b1e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <FaBoxOpen />
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;