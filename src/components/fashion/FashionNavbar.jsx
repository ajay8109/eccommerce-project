import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../data/fashionNav';

const HeartIcon = ({ filled }) => (
    <svg viewBox="0 0 24 24" width="22" height="22" className={filled ? 'text-rose-500' : 'text-zinc-500'} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-4.35-9.33-8.02C.38 9.5 2.37 5 6.5 5c2.26 0 3.77 1.5 5.5 3.5C13.73 6.5 15.24 5 17.5 5 21.63 5 23.62 9.5 21.33 12.98 19 16.65 12 21 12 21z" />
    </svg>
);

const BagIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" className="text-zinc-700" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 7h12l-1 12H7L6 7z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" className="text-zinc-700" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
);

const FashionNavbar = ({
    user,
    cartCount,
    wishlistCount,
    searchQuery,
    onSearchChange,
    onCartClick,
    onLoginClick,
    onMobileMenuToggle,
}) => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            layout
            className={`sticky top-0 z-[100] w-full border-b transition-shadow duration-300 ${
                scrolled ? 'bg-white/95 shadow-md border-zinc-200/90 backdrop-blur-md' : 'bg-white border-zinc-200/80'
            }`}
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-2.5 sm:px-5 lg:px-8 lg:py-3">
                <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-8">
                    <button
                        type="button"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 lg:hidden"
                        onClick={onMobileMenuToggle}
                        aria-label="Open menu"
                    >
                        <span className="text-lg leading-none">☰</span>
                    </button>

                    <Link to="/" className="group flex shrink-0 items-center gap-2 no-underline">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-lg font-black text-white shadow-sm">
                            A
                        </span>
                        <div className="hidden leading-tight sm:block">
                            <span className="block text-lg font-bold tracking-tight text-zinc-900">Atelier Lane</span>
                            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Curated fashion</span>
                        </div>
                    </Link>

                    <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:gap-2">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.shop}
                                to={`/category?shop=${item.shop}`}
                                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 no-underline transition-colors hover:bg-zinc-100 hover:text-zinc-900 xl:px-4"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="hidden min-w-0 flex-1 max-w-xl px-2 md:block">
                    <label className="relative block">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">⌕</span>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search for brands, products and more"
                            className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-11 pr-4 text-sm text-zinc-900 outline-none ring-rose-400/30 transition-shadow placeholder:text-zinc-400 focus:border-rose-300 focus:bg-white focus:ring-4"
                        />
                    </label>
                </div>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                    <button
                        type="button"
                        onClick={onLoginClick}
                        className="flex h-11 flex-col items-center justify-center rounded-xl px-2 text-[0.65rem] font-semibold text-zinc-700 hover:bg-zinc-50 sm:px-3"
                        aria-label={user ? 'Account' : 'Sign in'}
                    >
                        <UserIcon />
                        <span className="mt-0.5 hidden max-w-[4rem] truncate sm:inline">{user ? 'Profile' : 'Sign in'}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/wishlist')}
                        className="relative flex h-11 flex-col items-center justify-center rounded-xl px-2 text-[0.65rem] font-semibold text-zinc-700 hover:bg-zinc-50 sm:px-3"
                        aria-label="Wishlist"
                    >
                        <HeartIcon filled={false} />
                        <span className="mt-0.5 hidden sm:inline">Wishlist</span>
                        {wishlistCount > 0 && (
                            <span className="absolute right-0 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[0.6rem] font-bold text-white">
                                {wishlistCount > 9 ? '9+' : wishlistCount}
                            </span>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onCartClick}
                        className="relative flex h-11 flex-col items-center justify-center rounded-xl px-2 text-[0.65rem] font-semibold text-zinc-700 hover:bg-zinc-50 sm:px-3"
                        aria-label="Shopping bag"
                    >
                        <BagIcon />
                        <span className="mt-0.5 hidden sm:inline">Bag</span>
                        {cartCount > 0 && (
                            <span className="absolute right-0 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-zinc-900 px-1 text-[0.6rem] font-bold text-white">
                                {cartCount > 9 ? '9+' : cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="border-t border-zinc-100 px-3 pb-3 md:hidden">
                <label className="relative block">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">⌕</span>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search brands & products"
                        className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-11 pr-4 text-sm text-zinc-900 outline-none focus:border-rose-300 focus:bg-white"
                    />
                </label>
            </div>
        </motion.header>
    );
};

export default FashionNavbar;
