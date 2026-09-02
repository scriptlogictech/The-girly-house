const ColorSelector = ({
  colors = [],
  selectedColor,
  setSelectedColor,
  setSelectedSize,
}) => {
  if (!colors.length) return null;

  const handleSelectColor = (color) => {
    setSelectedColor(color);

    if (color.sizes?.length > 0) {
      setSelectedSize(color.sizes[0]);
    } else {
      setSelectedSize(null);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Select Color
      </h3>

      <div className="flex flex-wrap gap-4">
        {colors.map((color) => {
          const isSelected =
            selectedColor?.name === color.name;

          return (
            <button
              key={color._id || color.name}
              type="button"
              onClick={() => handleSelectColor(color)}
              className={`w-12 h-12 rounded-full border-4 transition-all ${
                isSelected
                  ? "border-[#6B1028] scale-110"
                  : "border-gray-300"
              }`}
              style={{
                backgroundColor: color.colorCode,
              }}
              title={color.name}
            />
          );
        })}
      </div>

      {selectedColor && (
        <p className="mt-3 text-gray-600">
          Selected:
          <span className="ml-2 font-semibold text-[#6B1028]">
            {selectedColor.name}
          </span>
        </p>
      )}
    </div>
  );
};

export default ColorSelector;