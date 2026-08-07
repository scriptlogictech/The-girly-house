const DeleteCategoryModal = ({
  open,
  category,
  onClose,
  onConfirm,
}) => {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}

        <div className="border-b px-6 py-4">

          <h2 className="text-xl font-semibold text-red-600">
            Delete Category
          </h2>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-gray-700">
            Are you sure you want to delete
          </p>

          <h3 className="text-lg font-bold mt-2">
            "{category.name}"
          </h3>

          <p className="text-sm text-gray-500 mt-3">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 px-6 py-4 border-t">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteCategoryModal;