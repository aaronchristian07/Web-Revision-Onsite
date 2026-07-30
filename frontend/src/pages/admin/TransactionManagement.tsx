import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import StatusBadge from "../../components/StatusBadge";
import { ListAllOrdersApi, UpdateOrderStatusApi } from "../../api/transactionApi";
import type { OrderResponse } from "../../dto/paymentDto";
import { useDebounce } from "../../lib/useDebounce";
import { formatIDR } from "../../lib/format";

const PAGE_SIZE = 25;
const STATUS_OPTIONS = ["pending", "processing", "completed", "cancelled"];

function formatDateTime(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.toLocaleDateString("id-ID")} ${d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
}

function TransactionManagement() {
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 400);
    const [status, setStatus] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [total, setTotal] = useState(0);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [selected, setSelected] = useState<OrderResponse | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // reset to page 1 and re-trigger loading whenever the debounced keyword settles on a new value
    const [settledKeyword, setSettledKeyword] = useState(debouncedKeyword);
    if (debouncedKeyword !== settledKeyword) {
        setSettledKeyword(debouncedKeyword);
        setPage(1);
        setLoading(true);
    }

    useEffect(() => {
        let cancelled = false;
        ListAllOrdersApi({
            req: { keyword: debouncedKeyword, status, date_from: dateFrom, date_to: dateTo, page, limit: PAGE_SIZE },
            setError: (msg) => { if (!cancelled) setFetchError(msg); },
        }).then((result) => {
            if (cancelled) return;
            if (result) setFetchError(null);
            setOrders(result?.items ?? []);
            setTotal(result?.total ?? 0);
            setLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, [debouncedKeyword, status, dateFrom, dateTo, page, refreshKey]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const hasActiveFilter = keyword !== "" || status !== "" || dateFrom !== "" || dateTo !== "";

    const handleResetFilter = () => {
        setKeyword("");
        setStatus("");
        setDateFrom("");
        setDateTo("");
        setLoading(true);
        setPage(1);
    };

    const handleChangeStatus = async (order: OrderResponse, newStatus: string) => {
        const result = await UpdateOrderStatusApi({ orderId: order.id, status: newStatus, setError: setFetchError });
        if (result) setRefreshKey((k) => k + 1);
    };

    return (
        <div className="flex-1 px-10 py-10">
            <div className="flex flex-wrap items-end gap-3 mb-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div>
                    <label htmlFor="tm-keyword" className="block mb-1 text-xs font-medium text-slate-500">
                        Search
                    </label>
                    <input
                        id="tm-keyword"
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="ID or username"
                        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div>
                    <label htmlFor="tm-status" className="block mb-1 text-xs font-medium text-slate-500">
                        Status
                    </label>
                    <select
                        id="tm-status"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value); setLoading(true); setPage(1); }}
                        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    >
                        <option value="">All</option>
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tm-from" className="block mb-1 text-xs font-medium text-slate-500">
                        From
                    </label>
                    <input
                        id="tm-from"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => { setDateFrom(e.target.value); setLoading(true); setPage(1); }}
                        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div>
                    <label htmlFor="tm-to" className="block mb-1 text-xs font-medium text-slate-500">
                        To
                    </label>
                    <input
                        id="tm-to"
                        type="date"
                        value={dateTo}
                        onChange={(e) => { setDateTo(e.target.value); setLoading(true); setPage(1); }}
                        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleResetFilter}
                    disabled={!hasActiveFilter}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Reset Filter
                </button>
            </div>

            {fetchError && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">{fetchError}</div>
            )}

            <p className="text-sm text-slate-500 mb-3">{loading ? "Loading..." : `${total} transaction(s) found`}</p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium">ID</th>
                            <th className="px-4 py-3 font-medium">Username</th>
                            <th className="px-4 py-3 font-medium">Date &amp; Time</th>
                            <th className="px-4 py-3 font-medium">Final Payment</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                                    Loading transactions...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                                    No transactions match the filter.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">#{order.id.slice(0, 8)}</td>
                                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{order.username || "-"}</td>
                                    <td className="px-4 py-3 text-slate-500">{formatDateTime(order.created_at)}</td>
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{formatIDR(order.total_price)}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={() => setSelected(order)}
                                            className="text-primary text-sm font-medium hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {!loading && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}

            <Modal open={selected !== null} title={selected ? `#${selected.id.slice(0, 8)}` : ""} onClose={() => setSelected(null)}>
                {selected && (
                    <div className="space-y-4">
                        <dl className="grid grid-cols-2 gap-y-2 text-sm">
                            <dt className="text-slate-400">Username</dt>
                            <dd className="text-slate-700 dark:text-slate-200 font-medium">{selected.username || "-"}</dd>

                            <dt className="text-slate-400">Date &amp; Time</dt>
                            <dd className="text-slate-700 dark:text-slate-200 font-medium">{formatDateTime(selected.created_at)}</dd>

                            <dt className="text-slate-400">Transaction State</dt>
                            <dd><StatusBadge status={selected.status} /></dd>
                        </dl>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {selected.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-2 text-sm">
                                    <span className="text-slate-700 dark:text-slate-200">
                                        {item.ice_cream_name} x{item.quantity}
                                    </span>
                                    <span className="text-slate-500">{formatIDR(item.subtotal)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                            <span className="font-semibold text-slate-800 dark:text-white">Final Payment Amount</span>
                            <span className="font-bold text-primary text-lg">{formatIDR(selected.total_price)}</span>
                        </div>

                        <div>
                            <label htmlFor="tm-change-status" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                                Change Transaction State
                            </label>
                            <select
                                id="tm-change-status"
                                value={selected.status.toLowerCase()}
                                onChange={(e) => { void handleChangeStatus(selected, e.target.value); }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default TransactionManagement;
