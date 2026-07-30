import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router";
import { createTransaction } from "../api/transactionApi";
import { useCartStore } from "../lib/cartStore";
import { formatIDR } from "../lib/format";

function Cart() {
    const items = useCartStore((state) => state.items);
    const setQty = useCartStore((state) => state.setQty);
    const removeItem = useCartStore((state) => state.removeItem);
    const toggleSelected = useCartStore((state) => state.toggleSelected);
    const setAllSelected = useCartStore((state) => state.setAllSelected);
    const clearSelected = useCartStore((state) => state.clearSelected);

    const [confirmation, setConfirmation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [checkingOut, setCheckingOut] = useState(false);

    const selectedItems = items.filter((item) => item.selected);
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const allSelected = items.length > 0 && items.every((item) => item.selected);

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            setError("Pilih minimal satu item sebelum checkout.");
            setConfirmation(null);
            return;
        }
        setError(null);
        setCheckingOut(true);
        try {
            // TODO: pakai username dari authStore begitu login beneran kepasang (Fase 2)
            const created = await createTransaction({
                username: "guest_customer",
                items: selectedItems.map((item) => ({ iceCreamName: item.name, qty: item.qty, price: item.price })),
            });
            setConfirmation(
                `Checkout berhasil (${created.id}) untuk ${selectedItems.length} item (${formatIDR(created.total)}). Transaksi ini bisa dicek di halaman Order — masih data mock, belum backend asli.`
            );
            clearSelected();
        } finally {
            setCheckingOut(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center px-10 py-24 text-center">
                {confirmation && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm max-w-md">
                        {confirmation}
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
                    onChange={(e) => setAllSelected(e.target.checked)}
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
                            onChange={() => toggleSelected(item.id)}
                            className="w-4 h-4 accent-primary"
                            aria-label={`Select ${item.name}`}
                        />
                        <div className="text-3xl">{item.emoji}</div>
                        <div className="flex-1 min-w-32">
                            <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                            <p className="text-sm text-slate-500">{formatIDR(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty - 1)}
                                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                aria-label={`Decrease ${item.name} quantity`}
                            >
                                -
                            </button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                aria-label={`Increase ${item.name} quantity`}
                            >
                                +
                            </button>
                        </div>
                        <p className="w-28 text-right font-semibold text-slate-700 dark:text-slate-200">
                            {formatIDR(item.price * item.qty)}
                        </p>
                        <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.name}`}
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
