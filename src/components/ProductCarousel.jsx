import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import ProductDetailModal from './ProductDetailModal';

const getFeaturedProducts = () => {
    if (!PRODUCTS || PRODUCTS.length === 0) return [];
    const sortedByDiscount = [...PRODUCTS].sort((a, b) => b.discountPercentage - a.discountPercentage);
    const sortedByRating = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
    const maxDiscountProducts = sortedByDiscount.filter(p => p.discountPercentage >= 15).slice(0, 4);
    const bestsellerProducts = sortedByRating.filter(p => p.rating >= 4.5).slice(0, 4);
    const featuredProducts = [...maxDiscountProducts, ...bestsellerProducts];
    const uniqueProducts = featuredProducts.filter((product, index, self) => index === self.findIndex((p) => p.id === product.id));
    return uniqueProducts.slice(0, 8);
};

const products = getFeaturedProducts();

const ProductCarousel = ({ onAddToCart }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % products.length); }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrev = () => { setIsAutoPlaying(false); setCurrentIndex((prev) => prev === 0 ? products.length - 1 : prev - 1); };
    const handleNext = () => { setIsAutoPlaying(false); setCurrentIndex((prev) => (prev + 1) % products.length); };
    const handleDotClick = (index) => { setIsAutoPlaying(false); setCurrentIndex(index); };
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);
    const handleViewDetails = (product) => { setSelectedProduct(product); setIsModalOpen(true); setIsAutoPlaying(false); };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedProduct(null); setIsAutoPlaying(true); };

    const handleAddToCart = (product) => {
        if (onAddToCart) onAddToCart(product);
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

    if (products.length === 0) return null;

    return (
        <>
        <div className="relative w-full" ref={carouselRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1e2235] shadow-xl dark:shadow-2xl dark:shadow-purple-500/10 border border-slate-100 dark:border-none transition-colors duration-300">
                {/* Nav buttons */}
                <button className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 min-h-11 min-w-11 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white border-none cursor-pointer hover:bg-black/70 transition-all duration-200 text-lg sm:text-xl touch-manipulation" onClick={handlePrev} aria-label="Previous product" type="button">‹</button>
                <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 min-h-11 min-w-11 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white border-none cursor-pointer hover:bg-black/70 transition-all duration-200 text-lg sm:text-xl touch-manipulation" onClick={handleNext} aria-label="Next product" type="button">›</button>
                
                {/* Track */}
                <div className="relative h-[min(22rem,85svh)] min-h-[280px] sm:h-[400px] lg:h-[420px]">
                    {products.map((product, index) => (
                        <div key={product.id} className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 translate-x-0' : index < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'}`}>
                            <div className="h-full flex flex-col">
                                {/* Badges */}
                                <div className="absolute top-3 left-3 z-10 flex gap-2">
                                    {product.discountPercentage >= 20 && <span className="bg-[#ff4d6d] text-white text-[0.6rem] sm:text-xs font-bold px-2 py-1 rounded-full">Max Offer</span>}
                                    {product.rating >= 4.8 && <span className="bg-amber-500 text-white text-[0.6rem] sm:text-xs font-bold px-2 py-1 rounded-full">Bestseller</span>}
                                </div>
                                
                                {/* Image */}
                                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-50 to-white dark:from-[#161929] dark:to-[#1e2235] transition-colors duration-300">
                                    <img src={product.thumbnail} alt={product.title} className="max-h-[min(9rem,28svh)] sm:max-h-[200px] lg:max-h-[220px] w-auto max-w-full object-contain drop-shadow-2xl" />
                                </div>
                                
                                {/* Info */}
                                <div className="p-4 sm:p-5 space-y-2 bg-white dark:bg-[#1e2235] transition-colors duration-300">
                                    <h4 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base line-clamp-1">{product.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-600 dark:text-green-400 font-bold text-lg">₹{product.price.toFixed(2)}</span>
                                        {product.discountPercentage > 0 && <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">-{Math.round(product.discountPercentage)}%</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {renderStars(product.rating)}
                                        {product.rating >= 4.5 && <span className="text-amber-400 text-xs font-medium">⭐ {product.rating}</span>}
                                    </div>
                                    <div className="flex flex-col min-[400px]:flex-row gap-2 pt-1">
                                        <button type="button" onClick={() => handleAddToCart(product)} disabled={product.stock <= 0} className={`flex-1 min-h-11 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all duration-200 active:scale-[0.98] touch-manipulation shadow-lg ${product.stock <= 0 ? 'bg-slate-300 dark:bg-gray-600 text-slate-500 dark:text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-purple-500/20'}`}>
                                            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                        <button type="button" onClick={() => handleViewDetails(product)} className="min-h-11 min-[400px]:min-w-0 min-[400px]:px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-white cursor-pointer transition-all duration-200 touch-manipulation w-full min-[400px]:w-auto shrink-0">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Indicators — larger tap targets on phones */}
                <div className="flex justify-center gap-0.5 sm:gap-1.5 pb-3 pt-1">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className="min-h-11 min-w-[2.25rem] sm:min-w-8 flex items-center justify-center rounded-full border-none cursor-pointer touch-manipulation"
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to product ${index + 1}`}
                        >
                            <span className={`block rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-purple-500 w-6 h-2' : 'w-2 h-2 bg-slate-300 dark:bg-gray-600 hover:bg-slate-400 dark:hover:bg-gray-500'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
        <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} onAddToCart={handleAddToCart} />
        </>
    );
};

export default ProductCarousel;
