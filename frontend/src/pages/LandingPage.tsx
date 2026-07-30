import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { fetchIceCreamList } from "../api/iceCreamApi";
import type { IceCreamItem } from "../lib/dummyData";
import { formatIDR } from "../lib/format";

function shuffle<T>(list: T[]): T[] {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function LandingPage() {
    const [featured, setFeatured] = useState<IceCreamItem[]>([]);
    const [selected, setSelected] = useState<IceCreamItem | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetchIceCreamList({ limit: 100 }).then((result) => {
            if (cancelled) return;
            setFeatured(shuffle(result.items).slice(0, 6));
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="px-6 sm:px-10 h-20 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-primary to-primary-linear flex items-center justify-center text-white shadow-glow">
                        <Icon icon="solar:buildings-2-linear" width="18" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900">
                        ES<span className="text-primary font-extrabold">krim</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/auth/login"
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/auth/register"
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity"
                    >
                        Register
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                <section className="px-6 sm:px-10 py-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Es krim rumahan, dipesan online — <span className="text-primary">ESkrim</span>
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Jelajahi berbagai varian es krim buatan sendiri, pesan langsung dari HP kamu, dan
                        pantau pesananmu dari checkout sampai selesai.
                    </p>
                </section>

                <section className="px-6 sm:px-10 pb-16 max-w-4xl mx-auto">
                    {featured.length === 0 ? (
                        <div className="h-80 rounded-2xl bg-slate-100 animate-pulse" />
                    ) : (
                        <Carousel
                            items={featured}
                            renderItem={(item) => (
                                <button
                                    type="button"
                                    onClick={() => setSelected(item)}
                                    className="w-full h-80 rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 p-8 text-white text-left flex flex-col justify-end overflow-hidden relative"
                                >
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover -z-10" />
                                    )}
                                    <span className="text-6xl mb-4">{item.emoji}</span>
                                    <span className="text-2xl font-bold">{item.name}</span>
                                    <span className="text-lg opacity-90">{formatIDR(item.price)}</span>
                                    <span className="text-sm opacity-75 mt-1">Tap for detail</span>
                                </button>
                            )}
                        />
                    )}
                </section>
            </main>

            <Footer />

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

export default LandingPage;
