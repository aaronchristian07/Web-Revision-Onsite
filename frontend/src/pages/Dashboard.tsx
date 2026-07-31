import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import IceCreamCard from "../components/IceCreamCard";
import IceCreamCardSkeleton from "../components/IceCreamCardSkeleton";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { getIceCreamApi } from "../api/iceCreamApi";
import { AddToCartApi } from "../api/transactionApi";
import type { IceCreamResponse } from "../dto/iceDto";
import { useDebounce } from "../lib/useDebounce";
import { useCartStore } from "../lib/cartStore";
import { formatIDR } from "../lib/format";

const PAGE_SIZE = 8;

function Dashboard() {
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 400);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<IceCreamResponse[]>([]);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState<IceCreamResponse | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [cartError, setCartError] = useState<string | null>(null);
    const addLocalItem = useCartStore((state) => state.addItem);

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

    const handleAddToCart = async (item: IceCreamResponse) => {
        setCartError(null);
        const result = await AddToCartApi({
            req: {
                ice_cream_id: item.ice_cream_id,
                ice_cream_name: item.ice_cream_name,
                ice_cream_price: item.ice_cream_price,
                quantity: 1,
            },
            setError: setCartError,
        });
        if (result) {
            // optimistic local badge count - Cart page fetches the real total separately
            addLocalItem({ id: item.ice_cream_id, name: item.ice_cream_name, price: item.ice_cream_price });
        }
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

            {fetchError && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">{fetchError}</div>
            )}
            {cartError && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">{cartError}</div>
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
                              onAddToCart={() => { void handleAddToCart(item); }}
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
                            <div className="w-full h-48 rounded-xl bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl font-bold text-white">
                                {selected.ice_cream_name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <p className="text-slate-600 dark:text-slate-300">{selected.ice_cream_desc}</p>
                        <p className="text-sm text-slate-400">Flavor: {selected.ice_cream_flavor}</p>
                        <p className="text-xl font-bold text-primary">{formatIDR(selected.ice_cream_price)}</p>
                        <button
                            type="button"
                            onClick={() => {
                                void handleAddToCart(selected);
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
