import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const handleAddToCart = () => {
        onAddToCart(product);
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        const productName = product.title || product.name || 'Product';
        toast.textContent = `Added ${productName} to cart ✓`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        const productName = product.title || product.name || 'Product';
        const action = isWishlisted ? 'removed from' : 'added to';
        toast.textContent = `${productName} ${action} wishlist ✓`;
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
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.thumbnail} alt={product.title} className="product-image" />
                <button 
                    className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    {isWishlisted ? '❤️' : '🤍'}
                </button>
                <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                </div>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.title}</h3>
                {renderStars(product.rating)}
                <div className="product-price-section">
                    <div className="product-price">₹{product.price.toFixed(2)}</div>
                    {product.discountPercentage > 0 && (
                        <>
                            <div className="product-original-price">₹{(product.price * (1 + product.discountPercentage/100)).toFixed(2)}</div>
                            <div className="product-discount">{product.discountPercentage}% off</div>
                        </>
                    )}
                </div>
                <button 
                    className="add-to-cart-btn" 
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                >
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
