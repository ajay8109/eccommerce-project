import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import ProductDetailModal from './ProductDetailModal';

// Filter products for maximum offers (high discount) and bestsellers (high rating)
const getFeaturedProducts = () => {
    if (!PRODUCTS || PRODUCTS.length === 0) return [];
    
    // Sort by discount percentage (highest first) and rating (highest first)
    const sortedByDiscount = [...PRODUCTS].sort((a, b) => b.discountPercentage - a.discountPercentage);
    const sortedByRating = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
    
    // Get top products with highest discounts (minimum 15% discount)
    const maxDiscountProducts = sortedByDiscount.filter(p => p.discountPercentage >= 15).slice(0, 4);
    
    // Get top products with highest ratings (minimum 4.5 rating)
    const bestsellerProducts = sortedByRating.filter(p => p.rating >= 4.5).slice(0, 4);
    
    // Combine and remove duplicates, limit to 8 products
    const featuredProducts = [...maxDiscountProducts, ...bestsellerProducts];
    const uniqueProducts = featuredProducts.filter((product, index, self) => 
        index === self.findIndex((p) => p.id === product.id)
    );
    
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
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handleDotClick = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);
    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        setIsAutoPlaying(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setIsAutoPlaying(true);
    };

    const handleModalAddToCart = (product) => {
        onAddToCart(product);
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = `Added ${product.title} to cart ✓`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const handleAddToCart = (product) => {
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = `Added ${product.title} to cart ✓`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        return (
            <div className="stars">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={i} className="star filled">★</span>
                ))}
                {hasHalfStar && <span className="star half">★</span>}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                    <span key={i} className="star empty">★</span>
                ))}
            </div>
        );
    };

    return (
        <>
        <div className="product-carousel" ref={carouselRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="carousel-container">
                <button className="carousel-nav-btn carousel-prev" onClick={handlePrev} aria-label="Previous product">
                    <span>‹</span>
                </button>
                <button className="carousel-nav-btn carousel-next" onClick={handleNext} aria-label="Next product">
                    <span>›</span>
                </button>
                
                <div className="carousel-track">
                    {products.map((product, index) => (
                        <div 
                            key={product.id} 
                            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                            style={{
                                transform: `translateX(${(index - currentIndex) * 100}%)`,
                                transition: 'transform 0.5s ease-in-out'
                            }}
                        >
                            <div className="carousel-product-card">
                                <div className="product-badges">
                                    {product.discountPercentage >= 20 && (
                                        <span className="badge badge-offer">Max Offer</span>
                                    )}
                                    {product.rating >= 4.8 && (
                                        <span className="badge badge-bestseller">Bestseller</span>
                                    )}
                                </div>
                                <div className="carousel-product-image">
                                    <img src={product.thumbnail} alt={product.title} />
                                </div>
                                <div className="carousel-product-info">
                                    <h4>{product.title}</h4>
                                    <p className="carousel-price">
                                        ₹{product.price.toFixed(2)}
                                        {product.discountPercentage > 0 && (
                                            <span className="discount-badge">-{product.discountPercentage}%</span>
                                        )}
                                    </p>
                                    {renderStars(product.rating)}
                                    <div className="product-meta">
                                        {product.rating >= 4.5 && (
                                            <span className="rating-highlight">⭐ {product.rating} Rating</span>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="carousel-add-to-cart"
                                        disabled={product.stock <= 0}
                                    >
                                        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    <button 
                                        onClick={() => handleViewDetails(product)}
                                        className="carousel-view-details"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="carousel-indicators">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to product ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
        <ProductDetailModal 
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddToCart={handleModalAddToCart}
        />
        </>
    );
};

export default ProductCarousel;
