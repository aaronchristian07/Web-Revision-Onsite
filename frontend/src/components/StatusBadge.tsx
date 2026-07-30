import type { TransactionStatus } from "../lib/dummyData";

const STATUS_STYLES: Record<TransactionStatus, string> = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    cancelled: "Cancelled",
};

function StatusBadge({ status }: { status: TransactionStatus }) {
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[status]}`}>
            {STATUS_LABELS[status]}
        </span>
    );
}

export default StatusBadge;
