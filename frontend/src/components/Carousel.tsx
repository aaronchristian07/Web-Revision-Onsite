import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";

interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T) => ReactNode;
    intervalMs?: number;
}

function Carousel<T>({ items, renderItem, intervalMs = 4000 }: CarouselProps<T>) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || items.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % items.length);
        }, intervalMs);
        return () => clearInterval(timer);
    }, [paused, items.length, intervalMs]);

    if (items.length === 0) return null;

    const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
    const goNext = () => setIndex((i) => (i + 1) % items.length);

    return (
        <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {items.map((item, i) => (
                        <div key={i} className="w-full shrink-0">
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>

            {items.length > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
                    >
                        <Icon icon="solar:alt-arrow-left-linear" width="20" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next slide"
                        onClick={goNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
                    >
                        <Icon icon="solar:alt-arrow-right-linear" width="20" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => setIndex(i)}
                                className={
                                    i === index
                                        ? "w-6 h-2 rounded-full bg-white transition-all"
                                        : "w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-all"
                                }
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Carousel;
