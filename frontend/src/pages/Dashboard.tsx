import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import IceCreamCard from "../components/IceCreamCard";
import IceCreamCardSkeleton from "../components/IceCreamCardSkeleton";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { fetchIceCreamList } from "../api/iceCreamApi";
import type { IceCreamItem } from "../lib/dummyData";
import { useDebounce } from "../lib/useDebounce";
import { useCartStore } from "../lib/cartStore";
import { formatIDR } from "../lib/format";

const PAGE_SIZE = 8;

function Dashboard() {
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 400);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<IceCreamItem[]>([]);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState<IceCreamItem | null>(null);
    const addItem = useCartStore((state) => state.addItem);

    // reset to page 1 and re-trigger the loading state whenever the (debounced) search changes
    const [settledKeyword, setSettledKeyword] = useState(debouncedKeyword);
    if (debouncedKeyword !== settledKeyword) {
        setSettledKeyword(debouncedKeyword);
        setPage(1);
        setLoading(true);
    }

    useEffect(() => {
        let cancelled = false;
        fetchIceCreamList({ keyword: debouncedKeyword, page, limit: PAGE_SIZE }).then((result) => {
            if (cancelled) return;
            setItems(result.items);
            setTotal(result.total);
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

    return (
        <div className="flex-1 px-10 py-10">
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

            {!loading && items.length === 0 && (
                <p className="text-slate-500 py-16 text-center">No ice cream matches &quot;{debouncedKeyword}&quot;.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array.from({ length: PAGE_SIZE }).map((_, i) => <IceCreamCardSkeleton key={i} />)
                    : items.map((item) => (
                          <IceCreamCard
                              key={item.id}
                              name={item.name}
                              description={item.description}
                              price={item.price}
                              emoji={item.emoji}
                              image={item.image}
                              onViewDetail={() => setSelected(item)}
                              onAddToCart={() => addItem(item)}
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
                        <button
                            type="button"
                            onClick={() => {
                                addItem(selected);
                                setSelected(null);
                            }}
                            className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Dashboard;
