import { Icon } from "@iconify/react";
import { Link, Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import { useCartStore } from "../lib/cartStore";
import { useAuthStore } from "../lib/authStore";
import { CUSTOMER_NAV_ITEMS, CUSTOMER_PAGE_HEADERS, type NavItem, type PageHeader } from "../lib/navConfig";

const TAB_THEMES = {
    disabled: "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all group",
    enabled: "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-all group",
};

interface LayoutProps {
    navItems?: NavItem[];
    pageHeaders?: Record<string, PageHeader>;
}

interface ProfileMenuProps {
    isAdmin: boolean;
    avatarUrl?: string;
    name: string;
    role: string;
}

function ProfileMenu({ isAdmin, avatarUrl, name, role }: ProfileMenuProps) {
    const avatar = (
        <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm bg-primary/10 text-primary flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
                <Icon icon="solar:user-linear" width="18" />
            )}
        </div>
    );
    const details = (
        <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-700 dark:text-white leading-none">{name}</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-wide">{role}</p>
        </div>
    );

    if (isAdmin) {
        return (
            <div className="flex items-center gap-3 pl-1">
                {avatar}
                {details}
            </div>
        );
    }

    return (
        <Link to="/profile" className="flex items-center gap-3 pl-1 cursor-pointer">
            {avatar}
            {details}
            <Icon icon="solar:alt-arrow-down-linear" className="text-slate-400 text-xs hidden sm:block"></Icon>
        </Link>
    );
}

function Layout({ navItems = CUSTOMER_NAV_ITEMS, pageHeaders = CUSTOMER_PAGE_HEADERS }: LayoutProps) {
    const location = useLocation();
    const cartCount = useCartStore((state) => state.items.length);
    const user = useAuthStore((state) => state.user);
    const pageHeader = pageHeaders[location.pathname] ?? Object.values(pageHeaders)[0];
    const isAdmin = user?.role === "admin";

    return (
        <div>
            <input type="checkbox" id="mobile-menu-toggle" className="hidden" />

            <div className="sidebar-overlay fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

            <div className="flex min-h-screen relative overflow-hidden">

                <aside className="sidebar fixed lg:sticky top-0 left-0 z-50 h-screen w-70 -translate-x-full lg:translate-x-0 transition-transform duration-300 glass flex flex-col border-r border-slate-200 dark:border-slate-800">
                    <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-primary to-primary-linear flex items-center justify-center text-white shadow-glow">
                                <Icon icon="solar:buildings-2-linear" width="18"></Icon>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">ES<span className="text-primary font-extrabold">krim</span></span>
                        </div>
                    </div>

                    <nav className="flex-1 py-6 px-4 space-y-1">
                        <div className="px-4 mb-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Main Menu</div>

                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={location.pathname === item.to ? TAB_THEMES.enabled : TAB_THEMES.disabled}
                            >
                                <Icon icon={item.icon} width="20" className="group-hover:text-primary transition-colors"></Icon>
                                {item.label}
                                {item.showCartBadge && (
                                    <span className="ml-auto text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500">{cartCount}</span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 w-full min-w-0 flex flex-col">

                    <header className="h-20 glass sticky top-0 z-30 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
                        <div className="flex items-center gap-4">
                            <label htmlFor="mobile-menu-toggle" className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                <Icon icon="solar:hamburger-menu-linear" width="24"></Icon>
                            </label>

                            <div className="hidden sm:block">
                                <h1 className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight">{pageHeader.title}</h1>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>Home</span>
                                    <Icon icon="solar:alt-arrow-right-linear" width="12"></Icon>
                                    <span className="text-primary font-medium">{pageHeader.breadcrumb}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
                                    <Icon icon="solar:bell-bing-linear" width="20"></Icon>
                                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                                </button>

                                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

                                <ProfileMenu isAdmin={isAdmin} avatarUrl={user?.avatarUrl} name={user?.username || user?.email || "Guest"} role={user?.role ?? ""} />
                            </div>
                        </div>
                    </header>

                    <Outlet />

                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Layout
