
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteCategoryModal = ({
  open,
  category,
  onClose,
  onConfirm,
}) => {
  if (!open || !category) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        aria-describedby="delete-category-description"
        className="my-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FaExclamationTriangle />
            </div>

            <h2
              id="delete-category-title"
              className="text-lg font-semibold text-gray-800 sm:text-xl"
            >
              Delete Category
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close delete confirmation"
            className="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <p
            id="delete-category-description"
            className="text-sm leading-6 text-gray-600 sm:text-base"
          >
            Are you sure you want to delete this category?
          </p>

          <div className="mt-3 break-words rounded-lg border border-red-100 bg-red-50 p-3">
            <h3 className="font-semibold text-red-800">
              {category.name}
            </h3>
          </div>

          <p className="mt-3 text-xs leading-5 text-gray-500 sm:text-sm">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t bg-gray-50 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 w-full rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 w-full rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 sm:w-auto"
          >
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;