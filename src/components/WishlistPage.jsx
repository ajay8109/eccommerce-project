import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) setWishlist(JSON.parse(saved));
        setLoading(false);
    }, []);

    const removeFromWishlist = (productId) => {
        const newWishlist = wishlist.filter(item => item.id !== productId);
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        showToast('Product removed from wishlist ✓');
    };

    const addToCart = (product) => { showToast(`${product.title} added to cart ✓`); };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#a855f7;color:white;padding:12px 20px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(168,85,247,0.3);font-size:14px;';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3000);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-sm">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium mb-2 bg-transparent border-none cursor-pointer p-0 transition-colors duration-200" onClick={() => navigate(-1)}>← Back to Shopping</button>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">My Wishlist</h1>
                    </div>
                    <span className="bg-pink-500 text-white text-sm font-bold px-4 py-1.5 rounded-full self-start sm:self-auto">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="text-6xl">💝</div>
                        <h2 className="text-xl font-bold text-white">Your wishlist is empty</h2>
                        <p className="text-gray-400 text-sm">Add items to your wishlist to see them here</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all duration-200 border-none cursor-pointer" onClick={() => navigate('/category')}>Continue Shopping</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
                        {wishlist.map(product => (
                            <div key={product.id} className="bg-[#1e2235] rounded-xl overflow-hidden shadow-lg flex flex-col transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group">
                                <div className="relative h-48 sm:h-52 bg-[#161929] overflow-hidden">
                                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110" />
                                    <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 text-white border-none cursor-pointer text-sm z-10 hover:bg-red-500/40 transition-all duration-200" onClick={() => removeFromWishlist(product.id)} title="Remove from wishlist">×</button>
                                </div>
                                <div className="p-4 flex flex-col flex-grow gap-1.5">
                                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">{product.title}</h3>
                                    {product.brand && <p className="text-gray-500 text-xs">{product.brand}</p>}
                                    <div className="flex items-center gap-1">
                                        {renderStars(product.rating)}
                                        <span className="text-gray-500 text-xs">({product.reviews?.length || 0})</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-green-400 font-bold text-lg">₹{product.price.toFixed(2)}</span>
                                        {product.discountPercentage > 0 && (
                                            <span className="bg-orange-500 text-white text-xs rounded px-1 py-0.5 font-semibold">-{Math.round(product.discountPercentage)}%</span>
                                        )}
                                    </div>
                                    <button className="w-full py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-200 mt-auto border-none cursor-pointer active:scale-[0.98]" onClick={() => addToCart(product)}>🛒 Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
