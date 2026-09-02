const DeleteProductModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold text-red-600">
            Delete Product
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-700">
            Are you sure you want to delete
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {productName}
          </p>

          <p className="mt-4 text-sm text-red-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;