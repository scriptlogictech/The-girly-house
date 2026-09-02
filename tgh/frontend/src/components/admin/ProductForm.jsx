import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";

const initialColor = {
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
};

const ProductForm = ({
  loading = false,
  initialData = null,
  onSubmit,
}) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
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

    colors: [initialColor],

    isFeatured: false,
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tagInput: "",
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();

      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (!form.tagInput.trim()) return;

    if (form.tags.includes(form.tagInput.trim())) return;

    setForm((prev) => ({
      ...prev,
      tags: [
        ...prev.tags,
        prev.tagInput.trim(),
      ],
      tagInput: "",
    }));
  };

  const removeTag = (index) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addColor = () => {
    setForm((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          ...initialColor,
        },
      ],
    }));
  };

  const removeColor = (colorIndex) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter(
        (_, i) => i !== colorIndex
      ),
    }));
  };

  const handleColorChange = (
    colorIndex,
    field,
    value
  ) => {
    const updatedColors = [...form.colors];

    updatedColors[colorIndex][field] =
      value;

    setForm({
      ...form,
      colors: updatedColors,
    });
  };

  const addSize = (colorIndex) => {
    const updatedColors = [...form.colors];

    updatedColors[colorIndex].sizes.push({
      size: "M",
      sku: "",
      price: "",
      discountPrice: "",
      stock: "",
      isAvailable: true,
    });

    setForm({
      ...form,
      colors: updatedColors,
    });
  };

  const removeSize = (
    colorIndex,
    sizeIndex
  ) => {
    const updatedColors = [...form.colors];

    updatedColors[colorIndex].sizes =
      updatedColors[colorIndex].sizes.filter(
        (_, i) => i !== sizeIndex
      );

    setForm({
      ...form,
      colors: updatedColors,
    });
  };

  const handleSizeChange = (
    colorIndex,
    sizeIndex,
    field,
    value
  ) => {
    const updatedColors = [...form.colors];

    updatedColors[colorIndex].sizes[
      sizeIndex
    ][field] = value;

    setForm({
      ...form,
      colors: updatedColors,
    });
  };

  const handleImages = (
    colorIndex,
    files
  ) => {
    const updatedColors = [...form.colors];

    updatedColors[colorIndex].images =
      Array.from(files);

    setForm({
      ...form,
      colors: updatedColors,
    });
  };



const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("shortDescription", form.shortDescription);
  formData.append("description", form.description);
  formData.append("category", form.category);
  formData.append("brand", form.brand);
  formData.append("material", form.material);
  formData.append("fabric", form.fabric);
  formData.append("fit", form.fit);
  formData.append("careInstructions", form.careInstructions);

  formData.append("isFeatured", form.isFeatured);
  formData.append("isTrending", form.isTrending);
  formData.append("isNewArrival", form.isNewArrival);
  formData.append("isBestSeller", form.isBestSeller);

  formData.append("tags", JSON.stringify(form.tags));

  const colorsForBackend = form.colors.map((color) => ({
    name: color.name,
    colorCode: color.colorCode,
    sizes: color.sizes,
  }));

  formData.append("colors", JSON.stringify(colorsForBackend));

  form.colors.forEach((color) => {
    color.images.forEach((img) => {
      formData.append("images", img);
    });
  });

  // ===== DEBUG =====
  // console.log("FORM COLORS:", form.colors);

  // console.log("===== FormData =====");
  // for (const pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

  onSubmit(formData);
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold">
        Product Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="font-medium">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
            required
          >
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Material
          </label>

          <input
            type="text"
            name="material"
            value={form.material}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Fabric
          </label>

          <input
            type="text"
            name="fabric"
            value={form.fabric}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Fit
          </label>

          <input
            type="text"
            name="fit"
            value={form.fit}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

      </div>

      <div>

        <label className="font-medium">
          Short Description
        </label>

        <textarea
          rows={3}
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2"
        />

      </div>

      <div>

        <label className="font-medium">
          Description
        </label>

        <textarea
          rows={6}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2"
        />

      </div>

      <div>

        <label className="font-medium">
          Care Instructions
        </label>

        <textarea
          rows={3}
          name="careInstructions"
          value={form.careInstructions}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2"
        />

      </div>

      <div>

        <label className="font-medium">
          Tags
        </label>

        <input
          type="text"
          value={form.tagInput}
          placeholder="Press Enter after each tag"
          onChange={(e) =>
            setForm({
              ...form,
              tagInput: e.target.value,
            })
          }
          onKeyDown={handleTagKeyDown}
          className="w-full border rounded-lg p-3 mt-2"
        />

        <div className="flex flex-wrap gap-2 mt-4">

          {form.tags.map((tag, index) => (

            <span
              key={index}
              className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}

              <button
                type="button"
                onClick={() =>
                  removeTag(index)
                }
              >
                ×
              </button>

            </span>

          ))}

        </div>

      </div>

      <div>

        <h2 className="text-xl font-bold mb-4">
          Product Status
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            <span className="ml-2">
              Featured
            </span>
          </label>

          <label>
            <input
              type="checkbox"
              name="isTrending"
              checked={form.isTrending}
              onChange={handleChange}
            />
            <span className="ml-2">
              Trending
            </span>
          </label>

          <label>
            <input
              type="checkbox"
              name="isNewArrival"
              checked={form.isNewArrival}
              onChange={handleChange}
            />
            <span className="ml-2">
              New Arrival
            </span>
          </label>

          <label>
            <input
              type="checkbox"
              name="isBestSeller"
              checked={form.isBestSeller}
              onChange={handleChange}
            />
            <span className="ml-2">
              Best Seller
            </span>
          </label>

        </div>

      </div>




            {/* ================= COLORS ================= */}

      <div>

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold">
            Product Variants
          </h2>

          <button
            type="button"
            onClick={addColor}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Color
          </button>

        </div>

        {form.colors.map((color, colorIndex) => (

          <div
            key={colorIndex}
            className="border rounded-xl p-5 mb-8"
          >

            <div className="flex justify-between items-center mb-5">

              <h3 className="font-bold text-lg">
                Color #{colorIndex + 1}
              </h3>

              {form.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeColor(colorIndex)
                  }
                  className="text-red-600"
                >
                  Remove
                </button>
              )}

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label>Color Name</label>

                <input
                  type="text"
                  value={color.name}
                  onChange={(e) =>
                    handleColorChange(
                      colorIndex,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                />

              </div>

              <div>

                <label>Color Code</label>

                <input
                  type="color"
                  value={color.colorCode}
                  onChange={(e) =>
                    handleColorChange(
                      colorIndex,
                      "colorCode",
                      e.target.value
                    )
                  }
                  className="w-full h-12 mt-2"
                />

              </div>

            </div>

            <div className="mt-6">

              <label className="font-medium">
                Upload Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  handleImages(
                    colorIndex,
                    e.target.files
                  )
                }
                className="block mt-3"
              />

              {color.images.length > 0 && (

                <div className="grid grid-cols-4 gap-4 mt-5">

                  {color.images.map((img, index) => (

                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="w-28 h-28 rounded-lg object-cover border"
                    />

                  ))}

                </div>

              )}

            </div>

            <div className="mt-8">

              <div className="flex justify-between items-center">

                <h4 className="font-bold text-lg">
                  Sizes
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    addSize(colorIndex)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  + Add Size
                </button>

              </div>

              {color.sizes.map(
                (size, sizeIndex) => (

                  <div
                    key={sizeIndex}
                    className="grid md:grid-cols-6 gap-3 mt-5 border rounded-lg p-4"
                  >

                    <input
                      placeholder="Size"
                      value={size.size}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "size",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />

                    <input
                      placeholder="SKU"
                      value={size.sku}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "sku",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />

                    <input
                      type="number"
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
                      className="border p-2 rounded"
                    />

                    <input
                      type="number"
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
                      className="border p-2 rounded"
                    />

                    <input
                      type="number"
                      placeholder="Stock"
                      value={size.stock}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "stock",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSize(
                          colorIndex,
                          sizeIndex
                        )
                      }
                      className="bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        ))}

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg"
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </button>

      </div>

    </form>
  );
};

export default ProductForm;