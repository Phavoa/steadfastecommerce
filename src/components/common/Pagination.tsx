import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPageNumbers = () => {
        const pages = [];
 
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${currentPage !== i
                            ? '  text-[#15151570]'
                            : 'bg-[#EDF0F8] text-black hover:bg-gray-200'
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === currentPage - 2 && currentPage > 3) ||
                (i === currentPage + 2 && currentPage < totalPages - 2)
            ) {
                pages.push(
                    <span key={i} className="px-1">
                        ...
                    </span>
                );
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center text-sm justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex gap-2  items-center justify-center px-4 h-10 rounded-lg   text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowLeft size={18} /><span>Previous</span>
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex gap-2  items-center justify-center px-4 h-10 rounded-lg   text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Next</span><ArrowRight size={18} />
            </button>
        </div>
    );
};