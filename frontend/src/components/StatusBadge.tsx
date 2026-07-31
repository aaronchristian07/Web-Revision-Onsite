const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    processing: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

function StatusBadge({ status }: { status: string }) {
    const key = status.toLowerCase();
    const style = STATUS_STYLES[key] ?? "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
    const label = key.charAt(0).toUpperCase() + key.slice(1);

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
            {label}
        </span>
    );
}

export default StatusBadge;
