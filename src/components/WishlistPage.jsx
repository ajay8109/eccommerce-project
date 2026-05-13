import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load wishlist from localStorage or state
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
        setLoading(false);
    }, []);

    const removeFromWishlist = (productId) => {
        const newWishlist = wishlist.filter(item => item.id !== productId);
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        showToast('Product removed from wishlist ✓');
    };

    const addToCart = (product) => {
        // Add to cart functionality
        showToast(`${product.title} added to cart ✓`);
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #06b6d4;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
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

    if (loading) {
        return (
            <div className="wishlist-page">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back to Shopping
                </button>
                <h1 className="wishlist-title">My Wishlist</h1>
                <div className="wishlist-count">
                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                    <div className="empty-icon">💝</div>
                    <h2>Your wishlist is empty</h2>
                    <p>Add items to your wishlist to see them here</p>
                    <button className="continue-shopping-btn" onClick={() => navigate('/category')}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map(product => (
                        <div key={product.id} className="wishlist-item">
                            <div className="wishlist-item-image">
                                <img src={product.thumbnail} alt={product.title} />
                                <button 
                                    className="remove-wishlist-btn"
                                    onClick={() => removeFromWishlist(product.id)}
                                    title="Remove from wishlist"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="wishlist-item-info">
                                <h3 className="wishlist-item-name">{product.title}</h3>
                                <p className="wishlist-item-brand">{product.brand}</p>
                                <div className="wishlist-item-rating">
                                    {renderStars(product.rating)}
                                    <span className="rating-count">({product.reviews?.length || 0})</span>
                                </div>
                                <div className="wishlist-item-price">
                                    <span className="current-price">${product.price.toFixed(2)}</span>
                                    {product.discountPercentage > 0 && (
                                        <span className="discount-badge">-{product.discountPercentage}%</span>
                                    )}
                                </div>
                                <button 
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
