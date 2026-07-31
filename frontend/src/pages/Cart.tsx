import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CheckoutCartApi, EmptyCartApi, GetCartApi, UpdateCartItemApi } from "../api/transactionApi";
import type { CartItemResponse } from "../dto/paymentDto";
import { formatIDR } from "../lib/format";

function Cart() {
    const [items, setItems] = useState<CartItemResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [confirmation, setConfirmation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [checkingOut, setCheckingOut] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        GetCartApi({ req: { page: 1, limit: 100 }, setError: (msg) => { if (!cancelled) setFetchError(msg); } }).then((result) => {
            if (cancelled) return;
            if (result) setFetchError(null);
            setItems(result?.items ?? []);
            setLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    const refresh = () => setRefreshKey((key) => key + 1);

    const selectedItems = items.filter((item) => item.selected);
    const total = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const allSelected = items.length > 0 && items.every((item) => item.selected);

    const handleSetQty = async (item: CartItemResponse, qty: number) => {
        if (qty < 1) return;
        setError(null);
        const updated = await UpdateCartItemApi({
            req: { cart_item_id: item.id, quantity: qty, selected: item.selected },
            setError,
        });
        if (updated) refresh();
    };

    const handleToggleSelected = async (item: CartItemResponse) => {
        setError(null);
        const updated = await UpdateCartItemApi({
            req: { cart_item_id: item.id, quantity: item.quantity, selected: !item.selected },
            setError,
        });
        if (updated) refresh();
    };

    const handleSetAllSelected = async (selected: boolean) => {
        setError(null);
        await Promise.all(
            items.map((item) =>
                UpdateCartItemApi({ req: { cart_item_id: item.id, quantity: item.quantity, selected }, setError })
            )
        );
        refresh();
    };

    const handleRemove = async (item: CartItemResponse) => {
        setError(null);
        const result = await EmptyCartApi({ req: { cart_item_id: item.id }, setError });
        if (result) refresh();
    };

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            setError("Pilih minimal satu item sebelum checkout.");
            setConfirmation(null);
            return;
        }
        setError(null);
        setCheckingOut(true);
        try {
            const result = await CheckoutCartApi({
                req: { cart_item_ids: selectedItems.map((item) => item.id) },
                setError,
            });
            if (result) {
                setConfirmation(
                    `Checkout berhasil (${result.order_id}) untuk ${selectedItems.length} item (${formatIDR(result.total_price)}).`
                );
                refresh();
            }
        } finally {
            setCheckingOut(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 px-10 py-10">
                <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center px-10 py-24 text-center">
                {confirmation && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm max-w-md">
                        {confirmation}
                    </div>
                )}
                {fetchError && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm max-w-md">
                        {fetchError}
                    </div>
                )}
                <Icon icon="solar:bag-cross-linear" width="56" className="text-slate-300 mb-4" />
                <p className="text-slate-500 mb-4">Keranjang kamu masih kosong.</p>
                <Link
                    to="/dashboard"
                    className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
                >
                    Mulai belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="flex-1 px-10 py-10">
            {confirmation && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
                    {confirmation}
                </div>
            )}
            {error && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm">
                    {error}
                </div>
            )}

            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => { void handleSetAllSelected(e.target.checked); }}
                    className="w-4 h-4 accent-primary"
                />
                Select all
            </label>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => { void handleToggleSelected(item); }}
                            className="w-4 h-4 accent-primary"
                            aria-label={`Select ${item.ice_cream_name}`}
                        />
                        <div className="text-3xl">🍦</div>
                        <div className="flex-1 min-w-32">
                            <p className="font-semibold text-slate-800 dark:text-white">{item.ice_cream_name}</p>
                            <p className="text-sm text-slate-500">{formatIDR(item.ice_cream_price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => { void handleSetQty(item, item.quantity - 1); }}
                                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                aria-label={`Decrease ${item.ice_cream_name} quantity`}
                            >
                                -
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                                type="button"
                                onClick={() => { void handleSetQty(item, item.quantity + 1); }}
                                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                aria-label={`Increase ${item.ice_cream_name} quantity`}
                            >
                                +
                            </button>
                        </div>
                        <p className="w-28 text-right font-semibold text-slate-700 dark:text-slate-200">
                            {formatIDR(item.subtotal)}
                        </p>
                        <button
                            type="button"
                            onClick={() => { void handleRemove(item); }}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.ice_cream_name}`}
                        >
                            <Icon icon="solar:trash-bin-trash-linear" width="20" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div>
                    <p className="text-sm text-slate-500">{selectedItems.length} item selected</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{formatIDR(total)}</p>
                </div>
                <button
                    type="button"
                    onClick={() => { void handleCheckout(); }}
                    disabled={checkingOut}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                    {checkingOut ? "Processing..." : "Checkout Selected"}
                </button>
            </div>
        </div>
    );
}

export default Cart;
