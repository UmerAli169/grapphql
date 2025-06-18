import { useState } from "react";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center my-[20px] gap-[10px]">
      <div className="flex items-center gap-2">
        <button className="text-[#383838] text-[14px] font-medium">
          Show More
        </button>
        <img src="/svgs/seemore/arrow.svg" alt="Arrow" />
      </div>

      <div className="flex items-center gap-[20px] mt-2">
        <button
          className="w-[20px] disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="Previous" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
          )
          .map((page, index, array) => (
            <span key={page}>
              {index > 0 && page !== array[index - 1] + 1 && (
                <span className="text-[#383838] text-[16px] font-regular leading-[24px]">
                  ...
                </span>
              )}
              <button
                className={`text-[16px] leading-[24px] ${
                  currentPage === page
                    ? "text-[#000] font-medium"
                    : "text-[#383838] font-regular"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </span>
          ))}

        <button
          className="w-[20px] disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
