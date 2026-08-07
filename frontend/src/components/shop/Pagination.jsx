import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  page,
  pages,
  setPage,
}) => {
  // Don't show pagination if only one page exists
  if (pages <= 1) return null;

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

      {/* Previous */}

      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition ${
          page === 1
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "bg-white hover:bg-[#6B1028] hover:text-white"
        }`}
      >
        <FaChevronLeft />
      </button>

      {/* Page Numbers */}

      {getPageNumbers().map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`w-10 h-10 rounded-xl border transition ${
            page === number
              ? "bg-[#6B1028] text-white border-[#6B1028]"
              : "bg-white hover:bg-[#6B1028] hover:text-white"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next */}

      <button
        onClick={handleNext}
        disabled={page === pages}
        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition ${
          page === pages
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "bg-white hover:bg-[#6B1028] hover:text-white"
        }`}
      >
        <FaChevronRight />
      </button>

    </div>
  );
};

export default Pagination;