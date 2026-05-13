import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import './SalePage.css';

const SalePage = ({ onAddToCart }) => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [sortBy, setSortBy] = useState('discount-high'); // discount-high, discount-low, price-low, price-high
    const [filterByDiscount, setFilterByDiscount] = useState('all'); // all, 10+, 20+, 30+

    useEffect(() => {
        // Debug: Check if PRODUCTS is loaded
        console.log('PRODUCTS:', PRODUCTS);
        
        // Handle case where PRODUCTS might not be loaded yet
        if (!PRODUCTS || PRODUCTS.length === 0) {
            console.log('PRODUCTS not loaded yet');
            return;
        }
        
        // Filter products with discounts
        const productsWithDiscount = PRODUCTS.filter(product => product.discountPercentage > 0);
        console.log('Products with discount:', productsWithDiscount);
        setSaleProducts(productsWithDiscount);
    }, [PRODUCTS]);

    // Sort products based on selected criteria
    const getSortedProducts = () => {
        let sorted = [...saleProducts];
        
        switch(sortBy) {
            case 'discount-high':
                sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            case 'discount-low':
                sorted.sort((a, b) => a.discountPercentage - b.discountPercentage);
                break;
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        
        // Apply discount filter
        if (filterByDiscount !== 'all') {
            const minDiscount = parseInt(filterByDiscount);
            sorted = sorted.filter(product => product.discountPercentage >= minDiscount);
        }
        
        return sorted;
    };

    const sortedProducts = getSortedProducts();

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

    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price * (1 - discountPercentage / 100);
    };

    const getSaleStats = () => {
        const totalProducts = PRODUCTS.length;
        const saleProductsCount = saleProducts.length;
        const avgDiscount = saleProducts.length > 0 
            ? (saleProducts.reduce((sum, p) => sum + p.discountPercentage, 0) / saleProducts.length).toFixed(1)
            : 0;
        const maxDiscount = saleProducts.length > 0 
            ? Math.max(...saleProducts.map(p => p.discountPercentage))
            : 0;
        
        return { totalProducts, saleProductsCount, avgDiscount, maxDiscount };
    };

    const stats = getSaleStats();

    return (
        <div className="sale-page">
            {/* Hero Section */}
            <section className="sale-hero">
                <div className="sale-hero-content">
                    <div className="sale-badge">🔥 MEGA SALE</div>
                    <h1 className="sale-title">Hot Deals & Discounts</h1>
                    <p className="sale-subtitle">Save big on your favorite products with unbeatable offers</p>
                    
                    <div className="sale-stats">
                        <div className="stat-item">
                            <span className="stat-number">{stats.saleProductsCount}</span>
                            <span className="stat-label">Products on Sale</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{stats.avgDiscount}%</span>
                            <span className="stat-label">Average Discount</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{stats.maxDiscount}%</span>
                            <span className="stat-label">Max Discount</span>
                        </div>
                    </div>
                </div>
                <div className="sale-hero-visual">
                    <div className="floating-percentage">-50%</div>
                    <div className="floating-percentage">-30%</div>
                    <div className="floating-percentage">-20%</div>
                </div>
            </section>

            {/* Filters and Sort Section */}
            <section className="sale-controls">
                <div className="container">
                    <div className="controls-header">
                        <h2>Sale Products ({sortedProducts.length})</h2>
                        <div className="controls-actions">
                            <div className="sort-control">
                                <label htmlFor="sort">Sort by:</label>
                                <select 
                                    id="sort" 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-select"
                                >
                                    <option value="discount-high">Highest Discount</option>
                                    <option value="discount-low">Lowest Discount</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                            
                            <div className="filter-control">
                                <label htmlFor="filter">Discount:</label>
                                <select 
                                    id="filter" 
                                    value={filterByDiscount} 
                                    onChange={(e) => setFilterByDiscount(e.target.value)}
                                    className="filter-select"
                                >
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

            {/* Products Grid */}
            <section className="sale-products">
                <div className="container">
                    {sortedProducts.length > 0 ? (
                        <div className="sale-grid">
                            {sortedProducts.map((product) => {
                                const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
                                const savings = product.price - discountedPrice;
                                
                                return (
                                    <div key={product.id} className="sale-product-card">
                                        <div className="sale-discount-badge">
                                            -{product.discountPercentage}%
                                        </div>
                                        <div className="sale-product-image">
                                            <img src={product.thumbnail} alt={product.title} />
                                            <div className="sale-overlay">
                                                <span className="sale-tag">SALE</span>
                                            </div>
                                        </div>
                                        <div className="sale-product-info">
                                            <span className="sale-category">{product.category}</span>
                                            <h3 className="sale-product-title">{product.title}</h3>
                                            <div className="sale-rating">
                                                {renderStars(product.rating)}
                                                <span className="rating-text">({product.rating})</span>
                                            </div>
                                            <div className="sale-price-section">
                                                <div className="sale-price-info">
                                                    <span className="sale-current-price">₹{discountedPrice.toFixed(2)}</span>
                                                    <span className="sale-original-price">₹{product.price.toFixed(2)}</span>
                                                </div>
                                                <div className="sale-savings">Save ₹{savings.toFixed(2)}</div>
                                            </div>
                                            <div className="sale-stock-status">
                                                {product.stock > 0 ? (
                                                    <span className="in-stock">✓ {product.stock} in stock</span>
                                                ) : (
                                                    <span className="out-stock">✗ Out of stock</span>
                                                )}
                                            </div>
                                            <button 
                                                className="sale-add-to-cart"
                                                onClick={() => onAddToCart(product)}
                                                disabled={product.stock <= 0}
                                            >
                                                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-sale-products">
                            <div className="no-sale-icon">🛍️</div>
                            <h3>No products found</h3>
                            <p>Try adjusting your filters to see more products.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="sale-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Don't Miss These Deals!</h2>
                        <p>Limited time offers on amazing products. Shop now before they're gone!</p>
                        <button className="cta-button">Shop All Products</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SalePage;
