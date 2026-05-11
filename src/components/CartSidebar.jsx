import React from 'react';

const CartSidebar = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h2>Shopping Cart ({cart.length})</h2>
                <button onClick={onClose} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'}}>
                    ×
                </button>
            </div>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🛒</div>
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button 
                                        onClick={() => onRemoveItem(item.id)}
                                        style={{marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer'}}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                    <button className="btn btn-primary" onClick={onCheckout} disabled={cart.length === 0}>
                        Proceed to Checkout
                    </button>
                    <button className="btn btn-secondary" onClick={onClose}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
