import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import IceCreamCard from "../../components/IceCreamCard";
import IceCreamCardSkeleton from "../../components/IceCreamCardSkeleton";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import { getIceCreamApi } from "../../api/iceCreamApi";
import type { IceCreamResponse } from "../../dto/iceDto";
// NOTE: payment-service has no "list orders" endpoint yet, so these
// analytics stay on local sample data until that's added on the backend.
import { SAMPLE_TRANSACTIONS } from "../../lib/dummyData";
import { useDebounce } from "../../lib/useDebounce";
import { formatIDR } from "../../lib/format";

const PAGE_SIZE = 8;

function AdminDashboard() {
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 400);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<IceCreamResponse[]>([]);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState<IceCreamResponse | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // reset to page 1 and re-trigger the loading state whenever the (debounced) search changes
    const [settledKeyword, setSettledKeyword] = useState(debouncedKeyword);
    if (debouncedKeyword !== settledKeyword) {
        setSettledKeyword(debouncedKeyword);
        setPage(1);
        setLoading(true);
    }

    useEffect(() => {
        let cancelled = false;
        getIceCreamApi({
            req: { keyword: debouncedKeyword, page, limit: PAGE_SIZE },
            setError: (msg) => { if (!cancelled) setFetchError(msg); },
        }).then((result) => {
            if (cancelled) return;
            if (result) setFetchError(null);
            setItems(result?.items ?? []);
            setTotal(result?.total ?? 0);
            setLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, [debouncedKeyword, page]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const handlePageChange = (nextPage: number) => {
        setLoading(true);
        setPage(nextPage);
    };

    const totalRevenue = SAMPLE_TRANSACTIONS.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.total, 0);
    const pendingCount = SAMPLE_TRANSACTIONS.filter((t) => t.status === "pending").length;

    const stats = [
        { label: "Transaction Analytics — Revenue", value: formatIDR(totalRevenue), icon: "solar:wallet-money-linear" },
        { label: "Transaction Analytics — Total", value: SAMPLE_TRANSACTIONS.length, icon: "solar:bill-list-linear" },
        { label: "Ice Cream Variants", value: total, icon: "solar:widget-add-linear" },
        { label: "Pending Orders", value: pendingCount, icon: "solar:hourglass-linear" },
    ];

    return (
        <div className="flex-1 px-10 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                            <Icon icon={stat.icon} width="20" />
                        </div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>
            <p className="text-xs text-slate-400 -mt-6 mb-8">
                Transaction Analytics &amp; Pending Orders are sample data — payment-service doesn&apos;t expose an order-listing endpoint yet.
            </p>

            <div className="relative max-w-md mb-8">
                <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="18" />
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search flavor or name..."
                    aria-label="Search ice cream"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
            </div>

            {fetchError && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">{fetchError}</div>
            )}

            {!loading && !fetchError && items.length === 0 && (
                <p className="text-slate-500 py-16 text-center">No ice cream matches &quot;{debouncedKeyword}&quot;.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array.from({ length: PAGE_SIZE }).map((_, i) => <IceCreamCardSkeleton key={i} />)
                    : items.map((item) => (
                          <IceCreamCard
                              key={item.ice_cream_id}
                              name={item.ice_cream_name}
                              description={item.ice_cream_desc}
                              price={item.ice_cream_price}
                              image={item.image_url || undefined}
                              onViewDetail={() => setSelected(item)}
                          />
                      ))}
            </div>

            {!loading && <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />}

            <Modal open={selected !== null} title={selected?.ice_cream_name ?? ""} onClose={() => setSelected(null)}>
                {selected && (
                    <div className="space-y-4">
                        {selected.image_url ? (
                            <img src={selected.image_url} alt={selected.ice_cream_name} className="w-full h-48 object-cover rounded-xl" />
                        ) : (
                            <div className="w-full h-48 rounded-xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl">
                                🍦
                            </div>
                        )}
                        <p className="text-slate-600 dark:text-slate-300">{selected.ice_cream_desc}</p>
                        <p className="text-sm text-slate-400">Flavor: {selected.ice_cream_flavor}</p>
                        <p className="text-xl font-bold text-primary">{formatIDR(selected.ice_cream_price)}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AdminDashboard;
