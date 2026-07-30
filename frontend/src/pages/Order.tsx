import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import { ListMyOrdersApi, UpdateOrderStatusApi } from "../api/transactionApi";
import type { OrderResponse } from "../dto/paymentDto";
import { formatIDR } from "../lib/format";

const PAGE_SIZE = 6;

const NEXT_STATUS: Record<string, string> = {
    pending: "processing",
    processing: "completed",
};

function formatDateTime(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return `${d.toLocaleDateString("id-ID")} ${d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
}

function Order() {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [selected, setSelected] = useState<OrderResponse | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        ListMyOrdersApi({
            req: { page, limit: PAGE_SIZE },
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
    }, [page, refreshKey]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const handlePageChange = (nextPage: number) => {
        setLoading(true);
        setPage(nextPage);
    };

    const changeStatus = async (order: OrderResponse, status: string) => {
        const result = await UpdateOrderStatusApi({ orderId: order.id, status, setError: setFetchError });
        if (result) setRefreshKey((k) => k + 1);
    };

    const currentStatus = selected?.status.toLowerCase() ?? "";
    const nextStatus = NEXT_STATUS[currentStatus];

    return (
        <div className="flex-1 px-10 py-10">
            {fetchError && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">{fetchError}</div>
            )}

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                        <div key={i} className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <p className="py-24 text-center text-slate-500">Belum ada transaksi.</p>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <button
                            type="button"
                            key={order.id}
                            onClick={() => setSelected(order)}
                            className="w-full flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-left hover:border-primary/40 transition-colors"
                        >
                            <div className="flex-1 min-w-40">
                                <p className="font-semibold text-slate-800 dark:text-white">#{order.id.slice(0, 8)}</p>
                                <p className="text-sm text-slate-500">{formatDateTime(order.created_at)}</p>
                            </div>
                            <p className="text-sm text-slate-500 min-w-32">{order.items.length} item</p>
                            <p className="font-semibold text-slate-700 dark:text-slate-200 min-w-32">{formatIDR(order.total_price)}</p>
                            <StatusBadge status={order.status} />
                        </button>
                    ))}
                </div>
            )}

            {!loading && <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />}

            <Modal open={selected !== null} title={selected ? `#${selected.id.slice(0, 8)}` : ""} onClose={() => setSelected(null)}>
                {selected && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">{formatDateTime(selected.created_at)}</p>
                            <StatusBadge status={selected.status} />
                        </div>

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
                            <span className="font-semibold text-slate-800 dark:text-white">Total</span>
                            <span className="font-bold text-primary text-lg">{formatIDR(selected.total_price)}</span>
                        </div>

                        {(currentStatus === "pending" || currentStatus === "processing") && (
                            <div className="flex gap-3 pt-2">
                                {nextStatus && (
                                    <button
                                        type="button"
                                        onClick={() => { void changeStatus(selected, nextStatus); }}
                                        className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
                                    >
                                        Mark as {nextStatus}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => { void changeStatus(selected, "cancelled"); }}
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
