import { Icon } from "@iconify/react";
import { useState } from "react";
import { SAMPLE_ICE_CREAMS } from "../lib/dummyData";
import { formatIDR } from "../lib/format";
import { useAuthStore } from "../lib/authStore";

function ProfilePage() {
    const user = useAuthStore((state) => state.user);
    const [username, setUsername] = useState(user?.username ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [saved, setSaved] = useState(false);

    const recentIceCreams = SAMPLE_ICE_CREAMS.slice(0, 5);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="flex-1 px-10 py-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Icon icon="solar:user-linear" width="32" />
                </div>
                <div>
                    <p className="text-lg font-semibold text-slate-800 dark:text-white">{username}</p>
                    <p className="text-sm text-slate-500">{email}</p>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm rounded-lg block w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>

                    {saved && (
                        <p className="text-sm text-emerald-600">Perubahan tersimpan (dummy — belum nyambung backend).</p>
                    )}

                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full bg-primary hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition-opacity"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        className="w-full bg-red-50 hover:bg-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-red-600 transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">5 Most Recent Ice Cream</h2>
                <div className="flex flex-wrap gap-4">
                    {recentIceCreams.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        >
                            <span className="text-2xl">{item.emoji}</span>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">{item.name}</p>
                                <p className="text-xs text-slate-500">{formatIDR(item.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
