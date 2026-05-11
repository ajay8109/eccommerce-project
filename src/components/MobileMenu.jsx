import React, { useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

const MobileMenu = ({ isOpen, onClose, user, cartCount, onLogout, onCartClick, onLoginClick, onCategoryChange }) => {
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        onClose();
    };

    const handleItemClick = (action) => {
        if (action && typeof action === 'function') {
            action();
        }
        onClose();
    };

    const handleCategoryClick = (category) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        }
        scrollToSection('products');
    };

    return (
        <>
            <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
                <div className="mobile-menu-header">
                    <div className="logo">
                        <span className="logo-icon">🛍️</span>
                        ShopZone
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <ThemeToggle className="compact" />
                        <button className="mobile-menu-close" onClick={onClose}>
                            ✕
                        </button>
                    </div>
                </div>

                <div className="mobile-menu-content">
                    <div className="mobile-menu-section">
                        <div className="mobile-menu-title">Navigation</div>
                        <div className="mobile-menu-item" onClick={() => scrollToSection('home')}>
                            <span className="mobile-menu-item-icon">🏠</span>
                            <span className="mobile-menu-item-text">Home</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => handleCategoryClick('All')}>
                            <span className="mobile-menu-item-icon">🛍️</span>
                            <span className="mobile-menu-item-text">All Products</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => scrollToSection('about')}>
                            <span className="mobile-menu-item-icon">ℹ️</span>
                            <span className="mobile-menu-item-text">About</span>
                        </div>
                    </div>

                    <div className="mobile-menu-section">
                        <div className="mobile-menu-title">Categories</div>
                        <div className="mobile-menu-item" onClick={() => handleCategoryClick('Electronics')}>
                            <span className="mobile-menu-item-icon">📱</span>
                            <span className="mobile-menu-item-text">Electronics</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => handleCategoryClick('Fashion')}>
                            <span className="mobile-menu-item-icon">👔</span>
                            <span className="mobile-menu-item-text">Fashion</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => handleCategoryClick('Home')}>
                            <span className="mobile-menu-item-icon">🏠</span>
                            <span className="mobile-menu-item-text">Home & Living</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => handleCategoryClick('Sports')}>
                            <span className="mobile-menu-item-icon">⚽</span>
                            <span className="mobile-menu-item-text">Sports</span>
                        </div>
                    </div>

                    <div className="mobile-menu-section">
                        <div className="mobile-menu-title">Shopping</div>
                        <div className="mobile-menu-item" onClick={onCartClick}>
                            <span className="mobile-menu-item-icon">🛒</span>
                            <span className="mobile-menu-item-text">Cart</span>
                            {cartCount > 0 && (
                                <span className="mobile-menu-item-badge">{cartCount}</span>
                            )}
                        </div>
                        <div className="mobile-menu-item" onClick={() => console.log('Wishlist clicked')}>
                            <span className="mobile-menu-item-icon">❤️</span>
                            <span className="mobile-menu-item-text">Wishlist</span>
                            <span className="mobile-menu-item-badge">3</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => console.log('Deals clicked')}>
                            <span className="mobile-menu-item-icon">🏷️</span>
                            <span className="mobile-menu-item-text">Deals</span>
                            <span className="mobile-menu-item-badge">NEW</span>
                        </div>
                    </div>

                    <div className="mobile-menu-section">
                        <div className="mobile-menu-title">Account</div>
                        {user ? (
                            <>
                                <div className="mobile-menu-item" onClick={() => console.log('Profile clicked')}>
                                    <span className="mobile-menu-item-icon">👤</span>
                                    <span className="mobile-menu-item-text">My Profile</span>
                                </div>
                                <div className="mobile-menu-item" onClick={() => console.log('Orders clicked')}>
                                    <span className="mobile-menu-item-icon">📦</span>
                                    <span className="mobile-menu-item-text">Order History</span>
                                </div>
                                <div className="mobile-menu-item" onClick={() => console.log('Settings clicked')}>
                                    <span className="mobile-menu-item-icon">⚙️</span>
                                    <span className="mobile-menu-item-text">Settings</span>
                                </div>
                                <div className="mobile-menu-item" onClick={onLogout}>
                                    <span className="mobile-menu-item-icon">🚪</span>
                                    <span className="mobile-menu-item-text">Logout</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mobile-menu-item" onClick={onLoginClick}>
                                    <span className="mobile-menu-item-icon">🔐</span>
                                    <span className="mobile-menu-item-text">Login</span>
                                </div>
                                <div className="mobile-menu-item" onClick={() => console.log('Register clicked')}>
                                    <span className="mobile-menu-item-icon">📝</span>
                                    <span className="mobile-menu-item-text">Register</span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mobile-menu-section">
                        <div className="mobile-menu-title">Support</div>
                        <div className="mobile-menu-item" onClick={() => console.log('Help clicked')}>
                            <span className="mobile-menu-item-icon">❓</span>
                            <span className="mobile-menu-item-text">Help & Support</span>
                        </div>
                        <div className="mobile-menu-item" onClick={() => console.log('Contact clicked')}>
                            <span className="mobile-menu-item-icon">📞</span>
                            <span className="mobile-menu-item-text">Contact Us</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
