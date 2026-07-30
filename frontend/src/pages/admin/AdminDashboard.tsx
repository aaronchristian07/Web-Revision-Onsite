import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import IceCreamCard from "../../components/IceCreamCard";
import IceCreamCardSkeleton from "../../components/IceCreamCardSkeleton";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import { SAMPLE_ICE_CREAMS, SAMPLE_TRANSACTIONS, type IceCreamItem } from "../../lib/dummyData";
import { useDebounce } from "../../lib/useDebounce";
import { formatIDR } from "../../lib/format";

const PAGE_SIZE = 8;

function AdminDashboard() {
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 400);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<IceCreamItem | null>(null);

    // reset to page 1 and re-trigger the loading skeleton whenever the (debounced) search changes
    const [settledKeyword, setSettledKeyword] = useState(debouncedKeyword);
    if (debouncedKeyword !== settledKeyword) {
        setSettledKeyword(debouncedKeyword);
        setPage(1);
        setLoading(true);
    }

    const filtered = useMemo(() => {
        const kw = debouncedKeyword.trim().toLowerCase();
        if (!kw) return SAMPLE_ICE_CREAMS;
        return SAMPLE_ICE_CREAMS.filter(
            (item) => item.name.toLowerCase().includes(kw) || item.flavor.toLowerCase().includes(kw)
        );
    }, [debouncedKeyword]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, [debouncedKeyword, page]);

    const handlePageChange = (nextPage: number) => {
        setLoading(true);
        setPage(nextPage);
    };

    const totalRevenue = SAMPLE_TRANSACTIONS.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.total, 0);
    const pendingCount = SAMPLE_TRANSACTIONS.filter((t) => t.status === "pending").length;

    const stats = [
        { label: "Transaction Analytics — Revenue", value: formatIDR(totalRevenue), icon: "solar:wallet-money-linear" },
        { label: "Transaction Analytics — Total", value: SAMPLE_TRANSACTIONS.length, icon: "solar:bill-list-linear" },
        { label: "Ice Cream Variants", value: SAMPLE_ICE_CREAMS.length, icon: "solar:widget-add-linear" },
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

            {!loading && pageItems.length === 0 && (
                <p className="text-slate-500 py-16 text-center">No ice cream matches &quot;{debouncedKeyword}&quot;.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array.from({ length: PAGE_SIZE }).map((_, i) => <IceCreamCardSkeleton key={i} />)
                    : pageItems.map((item) => (
                          <IceCreamCard
                              key={item.id}
                              name={item.name}
                              description={item.description}
                              price={item.price}
                              emoji={item.emoji}
                              image={item.image}
                              onViewDetail={() => setSelected(item)}
                          />
                      ))}
            </div>

            {!loading && <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />}

            <Modal open={selected !== null} title={selected?.name ?? ""} onClose={() => setSelected(null)}>
                {selected && (
                    <div className="space-y-4">
                        {selected.image ? (
                            <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover rounded-xl" />
                        ) : (
                            <div className="w-full h-48 rounded-xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl">
                                {selected.emoji}
                            </div>
                        )}
                        <p className="text-slate-600 dark:text-slate-300">{selected.description}</p>
                        <p className="text-sm text-slate-400">Flavor: {selected.flavor}</p>
                        <p className="text-xl font-bold text-primary">{formatIDR(selected.price)}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AdminDashboard;
