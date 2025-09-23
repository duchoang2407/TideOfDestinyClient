import React from "react";

interface PaginationProps {
  total: number; // tổng số trang
  current: number; // trang hiện tại (index)
  onChange: (page: number) => void; // callback khi đổi trang
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Prev */}
      <button
        onClick={() => onChange(current > 0 ? current - 1 : total - 1)}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg"
      >
        Prev
      </button>

      {/* Dots */}
      <div className="flex gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            onClick={() => onChange(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === current ? "bg-red-500 scale-125" : "bg-green-600"
            }`}
          />
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onChange(current < total - 1 ? current + 1 : 0)}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
