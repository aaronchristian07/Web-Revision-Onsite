import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DeleteAccountApi, UpdateProfileApi, UploadAvatarApi } from "../api/authApi";
import { getIceCreamApi } from "../api/iceCreamApi";
import type { IceCreamResponse } from "../dto/iceDto";
import { formatIDR } from "../lib/format";
import { useAuthStore } from "../lib/authStore";
import Modal from "../components/Modal";

function ProfilePage() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);
    const logout = useAuthStore((state) => state.logout);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState(user?.username ?? "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl ?? "");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [recentIceCreams, setRecentIceCreams] = useState<IceCreamResponse[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        getIceCreamApi({
            req: { keyword: "", page: 1, limit: 5 },
            setError: (msg) => { if (!cancelled) setFetchError(msg); },
        }).then((result) => {
            if (cancelled) return;
            if (result) setFetchError(null);
            setRecentIceCreams(result?.items ?? []);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const handlePickAvatar = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        let ok = true;

        if (avatarFile) {
            const result = await UploadAvatarApi({ image: avatarFile, setError: setSaveError });
            if (result) {
                updateUser({ avatarUrl: result.avatar_url });
                setAvatarPreview(result.avatar_url);
                setAvatarFile(null);
            } else {
                ok = false;
            }
        }

        if (ok && username !== user?.username) {
            const result = await UpdateProfileApi({ req: { username }, setError: setSaveError });
            if (result) {
                updateUser({ username: result.username });
            } else {
                ok = false;
            }
        }

        setSaving(false);
        if (ok) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        setDeleteError(null);
        const result = await DeleteAccountApi({ setError: setDeleteError });
        setDeleting(false);
        if (result) {
            logout();
            navigate("/");
        }
    };

    return (
        <div className="flex-1 px-10 py-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
                <button
                    type="button"
                    onClick={handlePickAvatar}
                    className="relative w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden group shrink-0"
                    aria-label="Change profile photo"
                >
                    {avatarPreview ? (
                        <img src={avatarPreview} alt={username} className="w-full h-full object-cover" />
                    ) : (
                        <Icon icon="solar:user-linear" width="32" />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon icon="solar:camera-linear" width="20" className="text-white" />
                    </span>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                />
                <div>
                    <p className="text-lg font-semibold text-slate-800 dark:text-white">{username}</p>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Role: {user?.role ?? "-"}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Edit Profile</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={user?.email ?? ""}
                            disabled
                            className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-500 text-sm rounded-lg block w-full p-2.5 outline-none cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-slate-400">Email can&apos;t be changed.</p>
                    </div>

                    {saveError && (
                        <p className="text-sm text-red-600">{saveError}</p>
                    )}
                    {saved && (
                        <p className="text-sm text-emerald-600">Changes saved.</p>
                    )}

                    <button
                        type="button"
                        onClick={() => { void handleSave(); }}
                        disabled={saving || (username === user?.username && !avatarFile)}
                        className="w-full bg-primary hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setConfirmingDelete(true)}
                        className="w-full bg-red-50 hover:bg-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-red-600 transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">5 Most Recent Ice Cream</h2>
                {fetchError && (
                    <p className="text-sm text-red-600 mb-3">{fetchError}</p>
                )}
                <div className="flex flex-wrap gap-4">
                    {recentIceCreams.map((item) => (
                        <div
                            key={item.ice_cream_id}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        >
                            {item.image_url ? (
                                <img src={item.image_url} alt={item.ice_cream_name} className="w-10 h-10 rounded-lg object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                    {item.ice_cream_name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">{item.ice_cream_name}</p>
                                <p className="text-xs text-slate-500">{formatIDR(item.ice_cream_price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal open={confirmingDelete} title="Delete Account" onClose={() => setConfirmingDelete(false)}>
                <div className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        This permanently deletes your account (<strong>{username}</strong>) and logs you out.
                        This action can&apos;t be undone.
                    </p>
                    {deleteError && (
                        <p className="text-sm text-red-600">{deleteError}</p>
                    )}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setConfirmingDelete(false)}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => { void handleDeleteAccount(); }}
                            disabled={deleting}
                            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {deleting ? "Deleting..." : "Delete Account"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ProfilePage;
