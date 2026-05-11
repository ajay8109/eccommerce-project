import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    const handleAddToCart = () => {
        onAddToCart(product);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-badge">Bestseller</div>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                    <div className="stars">
                        {'⭐'.repeat(Math.floor(product.rating))}
                        <span className="rating-text">({product.rating})</span>
                    </div>
                    <span className="rating-count">(1,234)</span>
                </div>
                <div className="product-price-section">
                    <div className="product-price">${product.price}</div>
                    <div className="product-original-price">${(product.price * 1.3).toFixed(2)}</div>
                    <div className="product-discount">30% off</div>
                </div>
                <div className="product-delivery">
                    <span className="delivery-icon">🚚</span>
                    <span className="delivery-text">Free delivery</span>
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
