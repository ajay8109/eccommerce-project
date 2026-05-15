import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ user, cartCount, onLogout, onCartClick, onLoginClick, onCategoryChange, onMobileMenuToggle, priceRange, onPriceRangeChange, minPrice, maxPrice, onSearchChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCategoryClick = (category) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
        if (onCartClick) {
            onCartClick();
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearchChange) {
            onSearchChange(query);
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0a0f1b]/95 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800 shadow-lg shadow-black/5 dark:shadow-black/30 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300">
                <div className="w-full px-3 min-[400px]:px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-16 lg:min-h-[70px]">
                    {/* Logo - always visible */}
                    <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-lg min-[400px]:text-xl lg:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 no-underline tracking-tight hover:brightness-110 transition-all duration-200 shrink-0 min-w-0">
                        <span className="text-xl sm:text-2xl lg:text-3xl drop-shadow-lg shrink-0">🛍️</span>
                        <span className="hidden min-[360px]:inline truncate">ShopZone</span>
                    </Link>
                    
                    {/* Desktop nav links - hidden on mobile */}
                    <ul className="hidden lg:flex list-none gap-1 xl:gap-4 items-center flex-1 justify-center">
                        <li><Link to="/" className="text-slate-700 dark:text-white no-underline font-medium text-sm px-3 py-2 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200">Home</Link></li>
                        <li><Link to="/category" className="text-slate-700 dark:text-white no-underline font-medium text-sm px-3 py-2 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200">Category</Link></li>
                        <li><Link to="/about" className="text-slate-700 dark:text-white no-underline font-medium text-sm px-3 py-2 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200">About</Link></li>
                        <li><Link to="/contact" className="text-slate-700 dark:text-white no-underline font-medium text-sm px-3 py-2 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200">Contact</Link></li>
                    </ul>
                    
                    {/* Right actions */}
                    <div className="flex items-center gap-1 min-[380px]:gap-2 sm:gap-3 lg:gap-4 shrink-0 min-w-0">
                        {/* Search - Desktop: full bar, Mobile: icon that expands */}
                        <div className="relative hidden lg:flex items-center bg-slate-100 dark:bg-white/5 rounded-full px-4 border border-slate-200 dark:border-gray-700 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,212,255,0.1)] dark:focus-within:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300 max-w-[300px]">
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                className="flex-1 py-2 px-2 border-none bg-transparent text-slate-800 dark:text-white text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500 font-sans"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <span className="text-cyan-400 text-sm pointer-events-none">🔍</span>
                        </div>

                        {/* Mobile search icon + expandable input */}
                        <div className="lg:hidden relative flex items-center shrink-0">
                            {isSearchExpanded ? (
                                <div className="absolute left-1/2 -translate-x-1/2 min-[380px]:left-0 min-[380px]:translate-x-0 w-[calc(100vw-1.5rem)] max-w-md top-full mt-1 bg-white dark:bg-[#0a0f1b] border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-3 z-[60] shadow-xl transition-colors duration-300">
                                    <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-full px-3 border border-slate-200 dark:border-gray-700 transition-colors duration-300">
                                        <input 
                                            type="text" 
                                            placeholder="Search products..." 
                                            className="flex-1 min-w-0 py-3 px-2 border-none bg-transparent text-slate-900 dark:text-white text-base outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500 font-sans"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            autoFocus
                                        />
                                        <button 
                                            type="button"
                                            className="min-h-11 min-w-11 shrink-0 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-transparent border-none cursor-pointer text-lg touch-manipulation"
                                            onClick={() => setIsSearchExpanded(false)}
                                            aria-label="Close search"
                                        >✕</button>
                                    </div>
                                </div>
                            ) : null}
                            <button 
                                type="button"
                                className="min-h-11 min-w-11 flex items-center justify-center text-slate-700 dark:text-white bg-transparent border-none cursor-pointer text-lg hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 touch-manipulation"
                                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                                aria-label="Search"
                            >🔍</button>
                        </div>
                        
                        <ThemeToggle className="desktop-theme-toggle hidden sm:flex" />
                        
                        {/* SALE badge - always visible */}
                        <Link to="/sale" className="shrink-0 flex items-center justify-center px-2 min-[380px]:px-2.5 sm:px-3 py-1.5 min-h-9 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-lg shadow-orange-500/30 no-underline animate-pulse hover:animate-none transition-all duration-200 touch-manipulation">
                            <span className="text-[0.6rem] min-[380px]:text-[0.65rem] sm:text-xs font-bold text-white uppercase tracking-wider">SALE</span>
                        </Link>
                        
                        {/* Cart button - always visible */}
                        <div className="relative cursor-pointer flex items-center justify-center gap-0 min-[380px]:gap-1.5 min-h-11 min-w-11 px-1.5 min-[380px]:px-2 sm:px-3 rounded-xl hover:bg-purple-500/10 transition-all duration-200 active:scale-95 touch-manipulation" onClick={onCartClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCartClick(); } }}>
                            <span className="text-lg sm:text-xl">🛒</span>
                            <span className="hidden sm:inline text-slate-700 dark:text-white font-semibold text-sm">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-lg shadow-red-500/40 border-2 border-white dark:border-[#0a0f1b]">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        
                        {/* Account/Login */}
                        {user ? (
                            <div className="hidden sm:flex cursor-pointer items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-purple-500/10 transition-all duration-200">
                                <span className="text-lg">👤</span>
                                <span className="text-slate-700 dark:text-white font-semibold text-sm">Account</span>
                            </div>
                        ) : (
                            <div className="hidden sm:flex cursor-pointer items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-purple-500/10 transition-all duration-200" onClick={onLoginClick}>
                                <span className="text-lg">👤</span>
                                <span className="text-slate-700 dark:text-white font-semibold text-sm">Login</span>
                            </div>
                        )}
                        
                        {/* Mobile hamburger menu */}
                        <button 
                            type="button"
                            className="lg:hidden flex items-center justify-center min-h-11 min-w-11 text-2xl text-slate-700 dark:text-white bg-transparent border-none cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation" 
                            onClick={onMobileMenuToggle}
                            aria-label="Menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
