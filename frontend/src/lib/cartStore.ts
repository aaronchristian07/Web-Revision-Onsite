import { create } from "zustand";

export interface CartItem {
    id: string;
    name: string;
    emoji: string;
    price: number;
    qty: number;
    selected: boolean;
}

interface CartState {
    items: CartItem[];
    addItem: (item: { id: string; name: string; emoji: string; price: number }) => void;
    removeItem: (id: string) => void;
    setQty: (id: string, qty: number) => void;
    toggleSelected: (id: string) => void;
    setAllSelected: (selected: boolean) => void;
    clearSelected: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],

    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { ...item, qty: 1, selected: true }] };
        }),

    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

    setQty: (id, qty) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, qty: Math.max(1, qty) } : i
            ),
        })),

    toggleSelected: (id) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, selected: !i.selected } : i
            ),
        })),

    setAllSelected: (selected) =>
        set((state) => ({ items: state.items.map((i) => ({ ...i, selected })) })),

    clearSelected: () =>
        set((state) => ({ items: state.items.filter((i) => !i.selected) })),
}));
