import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-[#0a0f1b] border-t border-slate-200 dark:border-gray-800 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-3">🛍️ ShopZone</div>
                        <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">Your premium shopping destination for quality products at unbeatable prices.</p>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="list-none p-0 m-0 space-y-2.5">
                            <li><Link to="/about" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">About Us</Link></li>
                            <li><Link to="/contact" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">Contact</Link></li>
                            <li><a href="#privacy" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">Privacy Policy</a></li>
                            <li><Link to="/sale" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Categories</h4>
                        <ul className="list-none p-0 m-0 space-y-2.5">
                            <li><Link to="/category" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">All Products</Link></li>
                            <li><Link to="/category?category=fashion" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">Fashion</Link></li>
                            <li><Link to="/category?category=phones" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">Smartphones</Link></li>
                            <li><Link to="/category?category=laptops" className="text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-200">Laptops</Link></li>
                        </ul>
                    </div>
                    
                    {/* Social */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Follow Us</h4>
                        <div className="flex gap-3 flex-wrap">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-400/10 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-200 dark:border-gray-800 py-4 sm:py-6">
                <p className="text-center text-slate-500 dark:text-gray-500 text-xs sm:text-sm">&copy; 2024 ShopZone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
