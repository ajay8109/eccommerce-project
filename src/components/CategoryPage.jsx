import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

const CategoryPage = ({ onAddToCart }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const category = searchParams.get('category') || 'All';
    const [wishlist, setWishlist] = useState([]);
    
    const predefinedCategories = [
        { id: 'fashion', name: 'Fashion', icon: '👗' },
        { id: 'home', name: 'Home & Living', icon: '🏠' },
        { id: 'beauty', name: 'Beauty', icon: '💄' },
        { id: 'products', name: 'General Products', icon: '📦' },
        { id: 'phones', name: 'Smartphones', icon: '📱' },
        { id: 'laptops', name: 'Laptops', icon: '💻' },
        { id: 'charge', name: 'Chargers & Accessories', icon: '🔌' },
        { id: 'watches', name: 'Watches', icon: '⌚' },
        { id: 'headphones', name: 'Headphones', icon: '🎧' },
        { id: 'cameras', name: 'Cameras', icon: '📷' },
        { id: 'gaming', name: 'Gaming', icon: '🎮' },
        { id: 'sports', name: 'Sports', icon: '⚽' }
    ];
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedRating, setSelectedRating] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const productsPerPage = 24;

    useEffect(() => {
        let categoryProducts;
        if (category === 'All') {
            categoryProducts = PRODUCTS;
        } else {
            categoryProducts = PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
    }, [category]);

    const brands = useMemo(() => {
        return [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
    }, [products]);

    const finalFilteredProducts = useMemo(() => {
        let filtered = [...products];
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        if (selectedRating) filtered = filtered.filter(p => p.rating >= parseFloat(selectedRating));
        if (inStockOnly) filtered = filtered.filter(p => p.stock > 0);
        return filtered;
    }, [products, priceRange, selectedBrands, selectedRating, inStockOnly]);

    const sortedProducts = useMemo(() => {
        const s = [...finalFilteredProducts];
        switch(sortBy) {
            case 'price-low': return s.sort((a, b) => a.price - b.price);
            case 'price-high': return s.sort((a, b) => b.price - a.price);
            case 'rating': return s.sort((a, b) => b.rating - a.rating);
            case 'newest': return s.sort((a, b) => new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0));
            default: return s;
        }
    }, [finalFilteredProducts, sortBy]);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const clearAllFilters = () => {
        setPriceRange([0, 200000]); setSelectedBrands([]); setSelectedRating(''); setInStockOnly(false); setSortBy('featured'); setCurrentPage(1);
    };

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

    const getBrandCount = (brand) => products.filter(p => p.brand === brand).length;

    const toggleWishlist = (product) => {
        const isIn = wishlist.some(item => item.id === product.id);
        const newWishlist = isIn ? wishlist.filter(item => item.id !== product.id) : [...wishlist, product];
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        showToast(`${product.title || 'Product'} ${isIn ? 'removed from' : 'added to'} wishlist ✓`);
    };

    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) setWishlist(JSON.parse(saved));
    }, []);

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#a855f7;color:white;padding:12px 20px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(168,85,247,0.3);font-size:14px;';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))]">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#0f172a] via-[#1e2235] to-[#0f172a] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <nav className="flex items-center gap-2 text-xs sm:text-sm mb-3">
                        <Link to="/" className="text-gray-400 hover:text-cyan-400 no-underline transition-colors duration-200">Home</Link>
                        <span className="text-gray-600">›</span>
                        <Link to="/category" className="text-gray-400 hover:text-cyan-400 no-underline transition-colors duration-200">Category</Link>
                        <span className="text-gray-600">›</span>
                        <span className="text-purple-400 font-medium">{category}</span>
                    </nav>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">All Products</h1>
                            <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">{sortedProducts.length} Products</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#1e2235] text-white text-xs sm:text-sm font-medium rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-200 cursor-pointer lg:hidden" onClick={() => setIsFilterOpen(true)}>
                                <span>🔍</span> Filters
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-2 bg-pink-500 text-white text-xs sm:text-sm font-medium rounded-lg border-none hover:bg-pink-600 transition-all duration-200 cursor-pointer" onClick={() => navigate('/wishlist')}>
                                <span>❤️</span> Wishlist ({wishlist.length})
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category pills - horizontally scrollable on mobile */}
            {category === 'All' && (
                <div className="border-b border-gray-800 bg-[#0f172a]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <h2 className="text-white font-bold text-base sm:text-lg mb-3">Shop by Category</h2>
                        <div className="flex gap-2 pb-2 overflow-x-auto whitespace-nowrap scrollbar-thin">
                            {predefinedCategories.map(cat => (
                                <Link key={cat.id} to={`/category?category=${cat.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#1e2235] text-gray-300 border border-gray-700 no-underline hover:border-purple-500 hover:text-white hover:bg-purple-500/10 transition-all duration-200 shrink-0">
                                    <span>{cat.icon}</span> {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Toolbar */}
            <div className="border-b border-gray-800 bg-[#111827]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-gray-400 text-xs sm:text-sm">Showing {startIndex + 1}–{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length}</span>
                    <div className="flex items-center gap-2">
                        <select className="bg-[#1e2235] text-white border border-gray-700 rounded-lg px-3 py-2 text-xs sm:text-sm outline-none cursor-pointer focus:border-purple-500 transition-all duration-200" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="newest">Newest</option>
                        </select>
                        <div className="hidden sm:flex border border-gray-700 rounded-lg overflow-hidden">
                            <button className={`px-3 py-2 text-xs font-medium transition-all duration-200 border-none cursor-pointer ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-[#1e2235] text-gray-400 hover:text-white'}`} onClick={() => setViewMode('grid')}>Grid</button>
                            <button className={`px-3 py-2 text-xs font-medium transition-all duration-200 border-none cursor-pointer ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-[#1e2235] text-gray-400 hover:text-white'}`} onClick={() => setViewMode('list')}>List</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content with sidebar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6">
                    {/* Filter sidebar - desktop */}
                    <aside className={`fixed lg:static inset-0 lg:inset-auto z-[998] lg:z-auto lg:w-64 lg:shrink-0 transition-all duration-300 ${isFilterOpen ? 'pointer-events-auto' : 'pointer-events-none lg:pointer-events-auto'}`}>
                        <div className={`fixed lg:hidden inset-0 bg-black/60 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
                        <div className={`fixed lg:static top-0 left-0 bottom-0 w-[min(280px,92vw)] lg:w-auto bg-[#0f172a] lg:bg-transparent overflow-y-auto transform transition-transform duration-300 lg:transform-none pt-[env(safe-area-inset-top,0px)] lg:pt-0 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                            <div className="flex items-center justify-between p-4 border-b border-gray-800 lg:hidden">
                                <h3 className="text-white font-bold text-lg">Filters</h3>
                                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white border-none cursor-pointer" onClick={() => setIsFilterOpen(false)}>✕</button>
                            </div>
                            <div className="p-4 space-y-6">
                                {/* Price */}
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-3">Price Range</h4>
                                    <div className="flex gap-2 mb-2">
                                        <div className="flex-1">
                                            <label className="text-gray-500 text-xs mb-1 block">Min</label>
                                            <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} min="0" max="200000" className="w-full bg-[#1e2235] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-gray-500 text-xs mb-1 block">Max</label>
                                            <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} min="0" max="200000" className="w-full bg-[#1e2235] border border-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500" />
                                        </div>
                                    </div>
                                    <input type="range" min="0" max="200000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-purple-500" />
                                </div>
                                {/* Brand */}
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-3">Brand</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {brands.map(brand => (
                                            <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm hover:bg-white/5 rounded px-2 py-1 transition-colors duration-200">
                                                <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="accent-purple-500" />
                                                <span className="text-gray-300 flex-1">{brand}</span>
                                                <span className="text-gray-500 text-xs">({getBrandCount(brand)})</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Rating */}
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-3">Customer Rating</h4>
                                    <div className="space-y-2">
                                        {['3','4','5'].map(r => (
                                            <label key={r} className="flex items-center gap-2 cursor-pointer text-sm hover:bg-white/5 rounded px-2 py-1">
                                                <input type="radio" name="rating" value={r} checked={selectedRating === r} onChange={(e) => setSelectedRating(e.target.value)} className="accent-purple-500" />
                                                <span className="text-yellow-400">{[...Array(parseInt(r))].map((_, i) => <span key={i}>★</span>)}</span>
                                                <span className="text-gray-400 text-xs">& above</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Availability */}
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-3">Availability</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="availability" checked={!inStockOnly} onChange={() => setInStockOnly(false)} className="accent-purple-500" /><span className="text-gray-300">All Products</span></label>
                                        <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="availability" checked={inStockOnly} onChange={() => setInStockOnly(true)} className="accent-purple-500" /><span className="text-gray-300">In Stock</span></label>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all duration-200 cursor-pointer" onClick={clearAllFilters}>Clear All Filters</button>
                            </div>
                        </div>
                    </aside>

                    {/* Product grid */}
                    <main className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 min-[360px]:gap-2.5 sm:gap-4">
                            {paginatedProducts.map(product => {
                                const dp = product.discountPercentage || 0;
                                const discountedPrice = product.price * (1 - dp / 100);
                                return (
                                    <div key={product.id} className="min-w-0 bg-[#1e2235] rounded-xl overflow-hidden shadow-lg flex flex-col transition-all duration-200 sm:hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 group">
                                        <div className="relative h-48 sm:h-52 bg-[#161929] overflow-hidden">
                                            <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110" />
                                            {dp > 0 && <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">-{Math.round(dp)}%</span>}
                                            <button className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border-none cursor-pointer text-sm z-10 transition-all duration-200 hover:scale-110 ${wishlist.some(i => i.id === product.id) ? 'bg-pink-500/30' : ''}`} onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}>
                                                {wishlist.some(i => i.id === product.id) ? '❤️' : '🤍'}
                                            </button>
                                            <button className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold py-2.5 border-none cursor-pointer translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:opacity-90" onClick={() => { onAddToCart(product); showToast(`${product.title} added to cart ✓`); }}>🛒 Add to Cart</button>
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow gap-1.5">
                                            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">{product.title}</h3>
                                            {product.brand && <p className="text-gray-500 text-xs">{product.brand}</p>}
                                            <div className="flex items-center gap-1">
                                                {renderStars(product.rating)}
                                                <span className="text-gray-500 text-xs">({product.reviews?.length || 0})</span>
                                            </div>
                                            <div className="flex items-center gap-2 flex-wrap mt-auto">
                                                {dp > 0 ? (
                                                    <>
                                                        <span className="text-green-400 font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
                                                        <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
                                                        <span className="bg-orange-500 text-white text-xs rounded px-1 py-0.5 font-semibold">-{Math.round(dp)}%</span>
                                                    </>
                                                ) : (
                                                    <span className="text-green-400 font-bold text-lg">₹{product.price.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                                <button className="px-4 py-2 bg-[#1e2235] text-white text-sm rounded-lg border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500 transition-all duration-200 cursor-pointer" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>← Prev</button>
                                <div className="flex gap-1">
                                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                        const p = i + 1;
                                        return <button key={p} className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${currentPage === p ? 'bg-purple-500 text-white border-purple-500' : 'bg-[#1e2235] text-gray-400 border-gray-700 hover:border-purple-500'}`} onClick={() => setCurrentPage(p)}>{p}</button>;
                                    })}
                                    {totalPages > 5 && <span className="text-gray-500 self-end px-1">...</span>}
                                </div>
                                <button className="px-4 py-2 bg-[#1e2235] text-white text-sm rounded-lg border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-500 transition-all duration-200 cursor-pointer" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
