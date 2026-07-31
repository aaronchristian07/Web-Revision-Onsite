import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import type { IceCreamResponse } from "../dto/iceDto";
import { formatIDR } from "../lib/format";

interface CarouselProps {
    items: IceCreamResponse[];
    onSelect: (item: IceCreamResponse) => void;
}

function Carousel({ items, onSelect }: CarouselProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;
        const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 4000);
        return () => clearInterval(timer);
    }, [items.length]);

    if (items.length === 0) return null;

    const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
    const goNext = () => setIndex((i) => (i + 1) % items.length);

    return (
        <div className="relative w-full max-w-2xl">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                {items.map((item, i) => (
                    <button
                        key={item.ice_cream_id}
                        type="button"
                        onClick={() => onSelect(item)}
                        className={`absolute inset-0 w-full h-full text-left cursor-pointer transition-opacity duration-700 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                            }`}
                    >
                        {item.image_url ? (
                            <img src={item.image_url} alt={item.ice_cream_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center text-7xl font-bold text-white">
                                {item.ice_cream_name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <p className="text-2xl font-bold">{item.ice_cream_name}</p>
                            <p className="text-sm opacity-80">{formatIDR(item.ice_cream_price)}</p>
                        </div>
                    </button>
                ))}
            </div>

            {items.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-colors"
                    >
                        <Icon icon="solar:alt-arrow-left-linear" width="18" className="text-slate-700" />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next slide"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-colors"
                    >
                        <Icon icon="solar:alt-arrow-right-linear" width="18" className="text-slate-700" />
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        {items.map((item, i) => (
                            <button
                                key={item.ice_cream_id}
                                type="button"
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => setIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Carousel;
