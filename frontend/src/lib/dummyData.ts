export interface IceCreamItem {
    id: string;
    name: string;
    flavor: string;
    price: number;
    description: string;
    emoji: string;
    image?: string;
}

export const SAMPLE_ICE_CREAMS: IceCreamItem[] = [
    { id: "ic-1", name: "Caramel Pecan", flavor: "Caramel", price: 28000, emoji: "🌰", description: "Buttered pecans swirled into rich caramel ice cream." },
    { id: "ic-2", name: "Matcha Dream", flavor: "Matcha", price: 30000, emoji: "🍵", description: "Earthy matcha with a hint of white chocolate." },
    { id: "ic-3", name: "Strawberry Swirl", flavor: "Strawberry", price: 26000, emoji: "🍓", description: "Fresh strawberry ribbons in a creamy vanilla base." },
    { id: "ic-4", name: "Choco Lava", flavor: "Chocolate", price: 29000, emoji: "🍫", description: "Dark chocolate ice cream with a molten fudge center." },
    { id: "ic-5", name: "Mango Tango", flavor: "Mango", price: 27000, emoji: "🥭", description: "Tropical mango sorbet with a citrus twist." },
    { id: "ic-6", name: "Blueberry Bliss", flavor: "Blueberry", price: 31000, emoji: "🫐", description: "Wild blueberries blended into smooth cheesecake ice cream." },
    { id: "ic-7", name: "Mint Choco Chip", flavor: "Mint", price: 27000, emoji: "🌿", description: "Cool mint ice cream loaded with chocolate chips." },
    { id: "ic-8", name: "Vanilla Bean", flavor: "Vanilla", price: 24000, emoji: "🌼", description: "Classic Madagascar vanilla bean, simple and rich." },
    { id: "ic-9", name: "Coconut Cloud", flavor: "Coconut", price: 28000, emoji: "🥥", description: "Toasted coconut flakes in a light coconut-milk base." },
    { id: "ic-10", name: "Red Velvet Swirl", flavor: "Red Velvet", price: 32000, emoji: "❤️", description: "Cream cheese ice cream swirled with red velvet cake bits." },
    { id: "ic-11", name: "Pistachio Rose", flavor: "Pistachio", price: 33000, emoji: "🌸", description: "Roasted pistachio ice cream with a delicate rose finish." },
    { id: "ic-12", name: "Salted Caramel", flavor: "Caramel", price: 29000, emoji: "🧂", description: "Buttery caramel ice cream with a touch of sea salt." },
    { id: "ic-13", name: "Cookies & Cream", flavor: "Chocolate", price: 28000, emoji: "🍪", description: "Crushed chocolate cookies folded into vanilla ice cream." },
    { id: "ic-14", name: "Lychee Sorbet", flavor: "Lychee", price: 26000, emoji: "🍈", description: "Refreshing lychee sorbet, light and fragrant." },
];

export type TransactionStatus = "pending" | "processing" | "completed" | "cancelled";

export interface TransactionLineItem {
    iceCreamName: string;
    qty: number;
    price: number;
}

export interface Transaction {
    id: string;
    username: string;
    date: string;
    time: string;
    status: TransactionStatus;
    items: TransactionLineItem[];
    total: number;
}

const USERNAMES = ["alia_putri", "budi_santoso", "citra_dewi", "dimas_aditya", "eka_wulandari"];
const STATUSES: TransactionStatus[] = ["pending", "processing", "completed", "cancelled"];

function buildDummyTransactions(count: number): Transaction[] {
    const transactions: Transaction[] = [];
    for (let i = 0; i < count; i++) {
        const item1 = SAMPLE_ICE_CREAMS[i % SAMPLE_ICE_CREAMS.length];
        const item2 = SAMPLE_ICE_CREAMS[(i + 3) % SAMPLE_ICE_CREAMS.length];
        const qty1 = (i % 3) + 1;
        const qty2 = (i % 2) + 1;
        const items: TransactionLineItem[] = [
            { iceCreamName: item1.name, qty: qty1, price: item1.price },
            { iceCreamName: item2.name, qty: qty2, price: item2.price },
        ];
        const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
        const day = String((i % 27) + 1).padStart(2, "0");
        const hour = String((i * 3) % 24).padStart(2, "0");
        const minute = String((i * 7) % 60).padStart(2, "0");

        transactions.push({
            id: `TRX-${String(1000 + i)}`,
            username: USERNAMES[i % USERNAMES.length],
            date: `2026-0${(i % 7) + 1}-${day}`,
            time: `${hour}:${minute}`,
            status: STATUSES[i % STATUSES.length],
            items,
            total,
        });
    }
    return transactions;
}

export const SAMPLE_TRANSACTIONS: Transaction[] = buildDummyTransactions(42);
