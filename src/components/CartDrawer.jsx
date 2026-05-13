import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        updateQuantity(itemId, newQuantity);
    };

    return (
        <>
            {isOpen && (
                <div className="cart-drawer-overlay" onClick={() => setIsOpen(false)}>
                    <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-drawer-header">
                            <h3>Shopping Cart</h3>
                            <button className="cart-drawer-close" onClick={() => setIsOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <div className="cart-drawer-content">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                    <span className="empty-cart-icon">🛒</span>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cart.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-item-details">
                                                <h4>{item.name}</h4>
                                                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                                <div className="cart-item-quantity">
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        className="quantity-btn"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="quantity-btn"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemove(item.id)}
                                                    className="remove-btn"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="cart-drawer-footer">
                                <div className="cart-summary">
                                    <p>Items: {getTotalItems()}</p>
                                    <p>Total: ${getTotalPrice()}</p>
                                </div>
                                <button className="checkout-btn">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartDrawer;
