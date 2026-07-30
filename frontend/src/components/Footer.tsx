import { Link } from "react-router";

const FOOTER_LINKS = [
    { to: "/dashboard", label: "Shop" },
    { to: "/order", label: "Order" },
    { to: "/cart", label: "Cart" },
    { to: "/profile", label: "Profile" },
];

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">
                    ES<span className="text-primary font-extrabold">krim</span>
                </span>

                <nav aria-label="Footer" className="flex items-center gap-5">
                    {FOOTER_LINKS.map((link) => (
                        <Link key={link.to} to={link.to} className="hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <p>&copy; {year} ESkrim. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
