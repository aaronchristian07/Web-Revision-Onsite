import { useState } from "react";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import { SAMPLE_TRANSACTIONS, type Transaction, type TransactionStatus } from "../lib/dummyData";
import { formatIDR } from "../lib/format";

const PAGE_SIZE = 6;

const NEXT_STATUS: Partial<Record<TransactionStatus, TransactionStatus>> = {
    pending: "processing",
    processing: "completed",
};

function Order() {
    const [transactions, setTransactions] = useState<Transaction[]>(() => SAMPLE_TRANSACTIONS.slice(0, 18));
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Transaction | null>(null);

    const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
    const pageItems = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleAdvanceStatus = (trx: Transaction) => {
        const next = NEXT_STATUS[trx.status];
        if (!next) return;
        setTransactions((prev) => prev.map((t) => (t.id === trx.id ? { ...t, status: next } : t)));
        setSelected((prev) => (prev && prev.id === trx.id ? { ...prev, status: next } : prev));
    };

    const handleCancel = (trx: Transaction) => {
        setTransactions((prev) => prev.map((t) => (t.id === trx.id ? { ...t, status: "cancelled" } : t)));
        setSelected((prev) => (prev && prev.id === trx.id ? { ...prev, status: "cancelled" } : prev));
    };

    if (transactions.length === 0) {
        return <p className="flex-1 px-10 py-24 text-center text-slate-500">Belum ada transaksi.</p>;
    }

    return (
        <div className="flex-1 px-10 py-10">
            <div className="space-y-3">
                {pageItems.map((trx) => (
                    <button
                        type="button"
                        key={trx.id}
                        onClick={() => setSelected(trx)}
                        className="w-full flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-left hover:border-primary/40 transition-colors"
                    >
                        <div className="flex-1 min-w-40">
                            <p className="font-semibold text-slate-800 dark:text-white">{trx.id}</p>
                            <p className="text-sm text-slate-500">{trx.date} {trx.time}</p>
                        </div>
                        <p className="text-sm text-slate-500 min-w-32">{trx.items.length} item</p>
                        <p className="font-semibold text-slate-700 dark:text-slate-200 min-w-32">{formatIDR(trx.total)}</p>
                        <StatusBadge status={trx.status} />
                    </button>
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

            <Modal open={selected !== null} title={selected?.id ?? ""} onClose={() => setSelected(null)}>
                {selected && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">{selected.date} {selected.time}</p>
                            <StatusBadge status={selected.status} />
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {selected.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-2 text-sm">
                                    <span className="text-slate-700 dark:text-slate-200">
                                        {item.iceCreamName} x{item.qty}
                                    </span>
                                    <span className="text-slate-500">{formatIDR(item.price * item.qty)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                            <span className="font-semibold text-slate-800 dark:text-white">Total</span>
                            <span className="font-bold text-primary text-lg">{formatIDR(selected.total)}</span>
                        </div>

                        {(selected.status === "pending" || selected.status === "processing") && (
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => handleAdvanceStatus(selected)}
                                    className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Mark as {NEXT_STATUS[selected.status]}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCancel(selected)}
                                    className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Order;
