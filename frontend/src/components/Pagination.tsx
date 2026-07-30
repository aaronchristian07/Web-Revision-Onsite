import { Icon } from "@iconify/react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 py-8">
            <button
                type="button"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <Icon icon="solar:alt-arrow-left-linear" width="18" />
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    type="button"
                    aria-current={p === page ? "page" : undefined}
                    onClick={() => onPageChange(p)}
                    className={
                        p === page
                            ? "w-9 h-9 rounded-lg bg-primary text-white text-sm font-semibold transition-colors"
                            : "w-9 h-9 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    }
                >
                    {p}
                </button>
            ))}

            <button
                type="button"
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <Icon icon="solar:alt-arrow-right-linear" width="18" />
            </button>
        </nav>
    );
}

export default Pagination;
