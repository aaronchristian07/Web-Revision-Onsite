import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { createIceCream, fetchIceCreamList, uploadIceCreamImage } from "../../api/iceCreamApi";
import type { IceCreamItem } from "../../lib/dummyData";
import { formatIDR } from "../../lib/format";

function IceCreamManagement() {
    const [name, setName] = useState("");
    const [flavor, setFlavor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const [variants, setVariants] = useState<IceCreamItem[]>([]);
    const [loadingVariants, setLoadingVariants] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        fetchIceCreamList({ limit: 5 }).then((result) => {
            if (cancelled) return;
            setVariants(result.items);
            setLoadingVariants(false);
        });
        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccess(null);

        if (!name.trim() || !flavor.trim() || !price || !description.trim()) {
            setError("Semua field wajib diisi.");
            return;
        }
        if (Number(price) <= 0) {
            setError("Harga harus lebih dari 0.");
            return;
        }

        setError(null);
        setSubmitting(true);
        try {
            let imageUrl: string | undefined;
            if (imageFile) {
                const uploaded = await uploadIceCreamImage(imageFile);
                imageUrl = uploaded.imageUrl;
            }

            const created = await createIceCream({
                name,
                flavor,
                price: Number(price),
                description,
                emoji: "🍦",
                image: imageUrl,
            });

            setSuccess(`Varian "${created.name}" berhasil dibuat — tersimpan sementara di sesi ini (masih data mock, belum backend asli).`);
            setName("");
            setFlavor("");
            setPrice("");
            setDescription("");
            setImageFile(null);
            setImagePreview(null);
            setLoadingVariants(true);
            setRefreshKey((key) => key + 1);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex-1 px-10 py-10 max-w-2xl">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Create New Ice Cream Variant</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="ic-image" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Image
                        </label>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-xl object-cover mb-2" />
                        )}
                        <input
                            id="ic-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-semibold"
                        />
                    </div>

                    <div>
                        <label htmlFor="ic-name" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Name
                        </label>
                        <input
                            id="ic-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="ic-flavor" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Flavor
                        </label>
                        <input
                            id="ic-flavor"
                            type="text"
                            value={flavor}
                            onChange={(e) => setFlavor(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="ic-price" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Price (IDR)
                        </label>
                        <input
                            id="ic-price"
                            type="number"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="ic-desc" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Description
                        </label>
                        <textarea
                            id="ic-desc"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {success && <p className="text-sm text-emerald-600">{success}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-primary hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Creating..." : "Create Variant"}
                    </button>
                </form>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Existing Variants</h2>
                <div className="space-y-2">
                    {loadingVariants
                        ? Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                          ))
                        : variants.map((item) => (
                              <div
                                  key={item.id}
                                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                              >
                                  <span className="text-2xl">{item.emoji}</span>
                                  <div className="flex-1">
                                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{item.name}</p>
                                      <p className="text-xs text-slate-500">{item.flavor}</p>
                                  </div>
                                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{formatIDR(item.price)}</span>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}

export default IceCreamManagement;
