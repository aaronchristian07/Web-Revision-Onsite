import {
    SAMPLE_TRANSACTIONS,
    type Transaction,
    type TransactionLineItem,
    type TransactionStatus,
} from "../lib/dummyData";

// Mock data layer for transactions. The real backend doesn't have a
// transaction/order API yet (only auth-service and ice-service exist today),
// so these functions model the shape a real one would plausibly take. Once
// that endpoint exists, only the bodies here need to change.

const MOCK_LATENCY_MS = 500;

let mockTransactions: Transaction[] = [...SAMPLE_TRANSACTIONS];
let nextTrxId = 1000 + mockTransactions.length;

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface ListTransactionParams {
    keyword?: string;
    status?: TransactionStatus | "";
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

export interface ListTransactionResult {
    items: Transaction[];
    total: number;
}

export async function fetchTransactions({
    keyword = "",
    status = "",
    dateFrom = "",
    dateTo = "",
    page = 1,
    limit = 25,
}: ListTransactionParams): Promise<ListTransactionResult> {
    const kw = keyword.trim().toLowerCase();
    const filtered = mockTransactions.filter((trx) => {
        if (kw && !`${trx.id} ${trx.username}`.toLowerCase().includes(kw)) return false;
        if (status && trx.status !== status) return false;
        if (dateFrom && trx.date < dateFrom) return false;
        if (dateTo && trx.date > dateTo) return false;
        return true;
    });
    const start = (page - 1) * limit;
    return delay({ items: filtered.slice(start, start + limit), total: filtered.length });
}

export async function fetchTransactionDetail(id: string): Promise<Transaction | null> {
    return delay(mockTransactions.find((trx) => trx.id === id) ?? null);
}

export async function updateTransactionStatus(id: string, status: TransactionStatus): Promise<Transaction | null> {
    mockTransactions = mockTransactions.map((trx) => (trx.id === id ? { ...trx, status } : trx));
    return delay(mockTransactions.find((trx) => trx.id === id) ?? null);
}

export interface CreateTransactionPayload {
    username: string;
    items: TransactionLineItem[];
}

export async function createTransaction({ username, items }: CreateTransactionPayload): Promise<Transaction> {
    const now = new Date();
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const created: Transaction = {
        id: `TRX-${nextTrxId++}`,
        username,
        date: now.toISOString().slice(0, 10),
        time: now.toTimeString().slice(0, 5),
        status: "pending",
        items,
        total,
    };
    mockTransactions = [created, ...mockTransactions];
    return delay(created);
}
