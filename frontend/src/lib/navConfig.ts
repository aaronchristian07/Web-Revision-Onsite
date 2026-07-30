export interface NavItem {
    to: string;
    label: string;
    icon: string;
    showCartBadge?: boolean;
}

export interface PageHeader {
    title: string;
    breadcrumb: string;
}

export const CUSTOMER_NAV_ITEMS: NavItem[] = [
    { to: "/dashboard", label: "Shop", icon: "solar:widget-add-linear" },
    { to: "/order", label: "Order", icon: "solar:bill-list-linear" },
    { to: "/cart", label: "Cart", icon: "solar:bag-4-linear", showCartBadge: true },
    { to: "/profile", label: "Profile", icon: "solar:user-circle-linear" },
];

export const CUSTOMER_PAGE_HEADERS: Record<string, PageHeader> = {
    "/dashboard": { title: "Shop - Take a look at our delicious Ice Cream", breadcrumb: "Overview" },
    "/order": { title: "Order - Your Transaction History", breadcrumb: "Order" },
    "/cart": { title: "Cart - Your Queue Items", breadcrumb: "Cart" },
    "/profile": { title: "Profile - Manage Your Account", breadcrumb: "Profile" },
};

export const ADMIN_NAV_ITEMS: NavItem[] = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "solar:chart-square-linear" },
    { to: "/admin/ice-cream", label: "Ice Cream", icon: "solar:widget-add-linear" },
    { to: "/admin/transactions", label: "Transactions", icon: "solar:bill-list-linear" },
];

export const ADMIN_PAGE_HEADERS: Record<string, PageHeader> = {
    "/admin/dashboard": { title: "Admin Dashboard - Store Overview", breadcrumb: "Overview" },
    "/admin/ice-cream": { title: "Ice Cream Management - Manage Variants", breadcrumb: "Ice Cream" },
    "/admin/transactions": { title: "Transaction Management - All Orders", breadcrumb: "Transactions" },
};
