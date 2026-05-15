import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../data/fashionNav';

const FashionMobileMenu = ({
    isOpen,
    onClose,
    user,
    cartCount,
    onCartClick,
    onLogout,
    onLoginClick,
}) => {
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const go = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.button
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-zinc-900/40 backdrop-blur-sm lg:hidden"
                        aria-label="Close menu overlay"
                        onClick={onClose}
                    />
                    <motion.aside
                        ref={ref}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                        className="fixed inset-y-0 right-0 z-[201] flex w-[min(100vw,20rem)] flex-col bg-white shadow-2xl lg:hidden"
                        style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
                    >
                        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-4">
                            <span className="text-lg font-bold text-zinc-900">Menu</span>
                            <button type="button" className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100" onClick={onClose} aria-label="Close">
                                ✕
                            </button>
                        </div>
                        <nav className="flex-1 overflow-y-auto px-2 py-2">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.shop}
                                    to={`/category?shop=${item.shop}`}
                                    onClick={onClose}
                                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-zinc-800 no-underline hover:bg-rose-50"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <hr className="my-2 border-zinc-100" />
                            <button type="button" className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-zinc-800 hover:bg-zinc-50" onClick={() => { onCartClick?.(); onClose(); }}>
                                Bag {cartCount > 0 ? `(${cartCount})` : ''}
                            </button>
                            <button type="button" className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-zinc-800 hover:bg-zinc-50" onClick={() => go('/wishlist')}>
                                Wishlist
                            </button>
                            <button type="button" className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-zinc-800 hover:bg-zinc-50" onClick={() => go('/sale')}>
                                Offers
                            </button>
                            {user ? (
                                <button type="button" className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50" onClick={() => { onLogout?.(); onClose(); }}>
                                    Sign out
                                </button>
                            ) : (
                                <button type="button" className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-zinc-800 hover:bg-zinc-50" onClick={() => { onLoginClick?.(); onClose(); }}>
                                    Sign in
                                </button>
                            )}
                        </nav>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default FashionMobileMenu;
