import { SAMPLE_ICE_CREAMS, type IceCreamItem } from "../lib/dummyData";

// Mock data layer — matches the shape of the real ice-service endpoints
// (GET/POST/PUT/DELETE /ice-cream, POST /ice-cream/image) so that swapping
// the body of these functions for real axios calls later doesn't require
// touching any page that calls them.

const MOCK_LATENCY_MS = 500;

let mockIceCreams: IceCreamItem[] = [...SAMPLE_ICE_CREAMS];
let nextId = mockIceCreams.length + 1;

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface ListIceCreamParams {
    keyword?: string;
    page?: number;
    limit?: number;
}

export interface ListIceCreamResult {
    items: IceCreamItem[];
    total: number;
}

export async function fetchIceCreamList({ keyword = "", page = 1, limit = 8 }: ListIceCreamParams): Promise<ListIceCreamResult> {
    const kw = keyword.trim().toLowerCase();
    const filtered = kw
        ? mockIceCreams.filter((item) => item.name.toLowerCase().includes(kw) || item.flavor.toLowerCase().includes(kw))
        : mockIceCreams;
    const start = (page - 1) * limit;
    return delay({ items: filtered.slice(start, start + limit), total: filtered.length });
}

export async function fetchIceCreamDetail(id: string): Promise<IceCreamItem | null> {
    return delay(mockIceCreams.find((item) => item.id === id) ?? null);
}

export type CreateIceCreamPayload = Omit<IceCreamItem, "id">;

export async function createIceCream(payload: CreateIceCreamPayload): Promise<IceCreamItem> {
    const created: IceCreamItem = { id: `ic-${nextId++}`, ...payload };
    mockIceCreams = [created, ...mockIceCreams];
    return delay(created);
}

export async function uploadIceCreamImage(file: File): Promise<{ imageUrl: string }> {
    // Real endpoint: POST /ice-cream/image (multipart "image") -> { image_url }.
    // Mocked here with a local object URL so the preview still works offline.
    return delay({ imageUrl: URL.createObjectURL(file) });
}
