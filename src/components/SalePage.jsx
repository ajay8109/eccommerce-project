import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const SalePage = ({ onAddToCart }) => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [sortBy, setSortBy] = useState('discount-high');
    const [filterByDiscount, setFilterByDiscount] = useState('all');

    useEffect(() => {
        if (!PRODUCTS || PRODUCTS.length === 0) return;
        const productsWithDiscount = PRODUCTS.filter(product => product.discountPercentage > 0);
        setSaleProducts(productsWithDiscount);
    }, [PRODUCTS]);

    const getSortedProducts = () => {
        let sorted = [...saleProducts];
        switch(sortBy) {
            case 'discount-high': sorted.sort((a, b) => b.discountPercentage - a.discountPercentage); break;
            case 'discount-low': sorted.sort((a, b) => a.discountPercentage - b.discountPercentage); break;
            case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
            case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
            default: break;
        }
        if (filterByDiscount !== 'all') {
            sorted = sorted.filter(product => product.discountPercentage >= parseInt(filterByDiscount));
        }
        return sorted;
    };

    const sortedProducts = getSortedProducts();
    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0;
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(full)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                {half && <span className="text-yellow-400 text-xs opacity-60">★</span>}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => <span key={i} className="text-gray-600 text-xs">★</span>)}
            </div>
        );
    };

    const calcPrice = (price, dp) => price * (1 - dp / 100);

    const stats = {
        saleCount: saleProducts.length,
        avgDiscount: saleProducts.length > 0 ? (saleProducts.reduce((s, p) => s + p.discountPercentage, 0) / saleProducts.length).toFixed(1) : 0,
        maxDiscount: saleProducts.length > 0 ? Math.max(...saleProducts.map(p => p.discountPercentage)) : 0
    };

    return (
        <div className="min-h-screen bg-[#0f172a] pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))]">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#ff4d6d]/20 via-[#0f172a] to-[#ff4d6d]/10 py-10 sm:py-14 lg:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-[#ff4d6d]/20 text-[#ff4d6d] px-4 py-2 rounded-full text-sm font-bold mb-4">🔥 MEGA SALE</div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">Hot Deals & Discounts</h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">Save big on your favorite products with unbeatable offers</p>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                        <div className="text-center"><span className="block text-3xl sm:text-4xl font-bold text-[#ff4d6d]">{stats.saleCount}</span><span className="text-gray-400 text-xs uppercase tracking-wider">Products on Sale</span></div>
                        <div className="text-center"><span className="block text-3xl sm:text-4xl font-bold text-[#ff4d6d]">{stats.avgDiscount}%</span><span className="text-gray-400 text-xs uppercase tracking-wider">Average Discount</span></div>
                        <div className="text-center"><span className="block text-3xl sm:text-4xl font-bold text-[#ff4d6d]">{stats.maxDiscount}%</span><span className="text-gray-400 text-xs uppercase tracking-wider">Max Discount</span></div>
                    </div>
                </div>
                <div className="absolute top-10 right-10 text-6xl font-bold text-[#ff4d6d]/10 rotate-12 hidden lg:block">-50%</div>
                <div className="absolute bottom-10 left-10 text-4xl font-bold text-[#ff4d6d]/10 -rotate-6 hidden lg:block">-30%</div>
            </section>

            {/* Controls */}
            <section className="border-b border-gray-800 bg-[#111827]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h2 className="text-white font-bold text-lg">Sale Products ({sortedProducts.length})</h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="text-gray-400 text-xs sm:text-sm shrink-0">Sort by:</label>
                                <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#1e2235] text-white border border-gray-700 rounded-lg px-3 py-2 text-xs sm:text-sm outline-none cursor-pointer focus:border-purple-500 flex-1 sm:flex-none">
                                    <option value="discount-high">Highest Discount</option>
                                    <option value="discount-low">Lowest Discount</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="filter" className="text-gray-400 text-xs sm:text-sm shrink-0">Discount:</label>
                                <select id="filter" value={filterByDiscount} onChange={(e) => setFilterByDiscount(e.target.value)} className="bg-[#1e2235] text-white border border-gray-700 rounded-lg px-3 py-2 text-xs sm:text-sm outline-none cursor-pointer focus:border-purple-500 flex-1 sm:flex-none">
                                    <option value="all">All Discounts</option>
                                    <option value="10">10% and above</option>
                                    <option value="20">20% and above</option>
                                    <option value="30">30% and above</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 min-[360px]:gap-2.5 sm:gap-4">
                        {sortedProducts.map(product => {
                            const dp = product.discountPercentage;
                            const discounted = calcPrice(product.price, dp);
                            const savings = product.price - discounted;
                            return (
                                <div key={product.id} className="min-w-0 bg-[#1e2235] rounded-xl overflow-hidden shadow-lg flex flex-col transition-all duration-200 sm:hover:scale-[1.02] hover:shadow-xl hover:shadow-[#ff4d6d]/20 group">
                                    <div className="relative h-48 sm:h-52 bg-[#161929] overflow-hidden">
                                        <span className="absolute top-3 left-3 bg-[#ff4d6d] text-white text-xs font-bold rounded-full px-2 py-1 z-10 shadow-lg">-{Math.round(dp)}%</span>
                                        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow gap-1.5">
                                        <span className="inline-flex self-start bg-[#ff4d6d]/20 text-[#ff4d6d] text-xs font-semibold px-2 py-0.5 rounded-full">{product.category}</span>
                                        <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">{product.title}</h3>
                                        <div className="flex items-center gap-1">{renderStars(product.rating)}<span className="text-gray-400 text-xs">({product.rating})</span></div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-green-400 font-bold text-lg">₹{discounted.toFixed(2)}</span>
                                            <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
                                        </div>
                                        <div className="text-[#ff4d6d] text-xs font-semibold">Save ₹{savings.toFixed(2)}</div>
                                        <div className="text-xs mt-0.5">{product.stock > 0 ? <span className="text-green-400">✓ {product.stock} in stock</span> : <span className="text-red-400">✗ Out of stock</span>}</div>
                                        <button className={`w-full py-2 rounded-lg font-semibold text-sm mt-auto border-none cursor-pointer transition-all duration-200 ${product.stock <= 0 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-[#ff4d6d] text-white hover:bg-[#e8435f] active:scale-[0.98]'}`} onClick={() => onAddToCart(product)} disabled={product.stock <= 0}>
                                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="text-6xl">🛍️</div>
                        <h3 className="text-xl font-bold text-white">No products found</h3>
                        <p className="text-gray-400 text-sm">Try adjusting your filters to see more products.</p>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#ff4d6d]/10 to-purple-500/10 py-10 sm:py-14">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">Don't Miss These Deals!</h2>
                    <p className="text-gray-400 text-sm sm:text-base mb-6">Limited time offers on amazing products. Shop now before they're gone!</p>
                    <button className="px-8 py-3 bg-[#ff4d6d] text-white font-bold rounded-xl text-sm hover:bg-[#e8435f] transition-all duration-200 border-none cursor-pointer active:scale-[0.98]">Shop All Products</button>
                </div>
            </section>
        </div>
    );
};

export default SalePage;
