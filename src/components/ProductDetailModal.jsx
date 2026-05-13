import React from 'react';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        onAddToCart(product);
        onClose();
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

    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price * (1 - discountPercentage / 100);
    };

    const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-product-detail">
                    <div className="modal-product-image">
                        <img src={product.thumbnail} alt={product.title} />
                        {product.discountPercentage > 0 && (
                            <div className="modal-discount-badge">
                                -{product.discountPercentage}%
                            </div>
                        )}
                    </div>
                    
                    <div className="modal-product-info">
                        <h2>{product.title}</h2>
                        <p className="modal-category">{product.category}</p>
                        
                        <div className="modal-rating">
                            {renderStars(product.rating)}
                            <span className="rating-text">{product.rating} ({product.reviews?.length || 0} reviews)</span>
                        </div>
                        
                        <div className="modal-price-section">
                            <div className="modal-price">
                                ₹{discountedPrice.toFixed(2)}
                                {product.discountPercentage > 0 && (
                                    <>
                                        <span className="modal-original-price">₹{product.price.toFixed(2)}</span>
                                        <span className="modal-savings">Save ₹{(product.price - discountedPrice).toFixed(2)}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="modal-stock-status">
                            {product.stock > 0 ? (
                                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                            ) : (
                                <span className="out-stock">✗ Out of Stock</span>
                            )}
                        </div>
                        
                        <p className="modal-description">{product.description}</p>
                        
                        {product.tags && (
                            <div className="modal-tags">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        )}
                        
                        <div className="modal-brand">
                            <strong>Brand:</strong> {product.brand}
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="modal-add-to-cart"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                            >
                                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                            <button className="modal-continue-shopping" onClick={onClose}>
                                Continue Shopping
                            </button>
                        </div>
                        
                        <div className="modal-additional-info">
                            <div className="info-row">
                                <strong>SKU:</strong> {product.sku}
                            </div>
                            <div className="info-row">
                                <strong>Weight:</strong> {product.weight}g
                            </div>
                            {product.dimensions && (
                                <div className="info-row">
                                    <strong>Dimensions:</strong> {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                                </div>
                            )}
                            <div className="info-row">
                                <strong>Warranty:</strong> {product.warrantyInformation}
                            </div>
                            <div className="info-row">
                                <strong>Shipping:</strong> {product.shippingInformation}
                            </div>
                            <div className="info-row">
                                <strong>Return Policy:</strong> {product.returnPolicy}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
