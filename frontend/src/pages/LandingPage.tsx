import { useEffect, useState } from "react";
import { Link } from "react-router";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { getIceCreamApi } from "../api/iceCreamApi";
import type { IceCreamResponse } from "../dto/iceDto";
import { formatIDR } from "../lib/format";

function LandingPage() {
    const [items, setItems] = useState<IceCreamResponse[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [selected, setSelected] = useState<IceCreamResponse | null>(null);

    useEffect(() => {
        let cancelled = false;
        getIceCreamApi({
            req: { keyword: "", page: 1, limit: 10 },
            setError: (msg) => { if (!cancelled) setFetchError(msg); },
        }).then((result) => {
            if (cancelled) return;
            if (result) setFetchError(null);
            // shuffle so the carousel shows a different random order each visit
            setItems([...(result?.items ?? [])].sort(() => Math.random() - 0.5));
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="px-6 sm:px-10 py-6 flex items-center justify-between">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                    ES<span className="text-primary font-extrabold">krim</span>
                </span>
                <div className="flex items-center gap-3">
                    <Link
                        to="/auth/login"
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/auth/register"
                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                        Register
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center px-6 py-10 gap-10">
                <div className="text-center max-w-xl">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Handcrafted ice cream, made fresh every day
                    </h1>
                    <p className="text-slate-500">
                        ESkrim is an online ordering platform for our ice cream shop. Browse the menu,
                        add your favorites to cart, and track every order from checkout to pickup.
                    </p>
                </div>

                {fetchError && (
                    <p className="text-sm text-red-600">{fetchError}</p>
                )}

                <Carousel items={items} onSelect={setSelected} />

                <Link
                    to="/auth/register"
                    className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
                >
                    Get Started
                </Link>
            </main>

            <Footer />

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
                        <Link
                            to="/auth/login"
                            className="block w-full py-2.5 rounded-xl bg-primary text-white font-semibold text-center hover:opacity-90 transition-opacity"
                        >
                            Login to Order
                        </Link>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default LandingPage;
