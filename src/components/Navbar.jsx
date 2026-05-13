import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import PriceRangeSlider from './PriceRangeSlider';
import CartDrawer from './CartDrawer';

const Navbar = ({ user, cartCount, onLogout, onCartClick, onLoginClick, onCategoryChange, onMobileMenuToggle, priceRange, onPriceRangeChange, minPrice, maxPrice, onSearchChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCategoryClick = (category) => {
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
        if (onCartClick) {
            onCartClick();
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearchChange) {
            onSearchChange(query);
        }
    };

    // User dropdown menu items
    const userMenuItems = user ? [
        {
            label: 'My Profile',
            icon: '👤',
            action: () => console.log('Profile clicked')
        },
        {
            label: 'Order History',
            icon: '📦',
            action: () => console.log('Order history clicked')
        },
        {
            label: 'Wishlist',
            icon: '❤️',
            badge: '3',
            action: () => console.log('Wishlist clicked')
        },
        {
            label: 'Settings',
            icon: '⚙️',
            action: () => console.log('Settings clicked')
        },
        {
            label: 'Logout',
            icon: '🚪',
            action: onLogout
        }
    ] : [];

    // Guest dropdown menu items
    const guestMenuItems = [
        {
            label: 'Login',
            icon: '🔐',
            action: onLoginClick
        },
        {
            label: 'Register',
            icon: '📝',
            action: () => console.log('Register clicked')
        },
        {
            label: 'Help',
            icon: '❓',
            action: () => console.log('Help clicked')
        }
    ];

    // Browse dropdown menu items
    const browseMenuItems = [
        {
            label: 'All Products',
            icon: '🛍️',
            action: () => handleCategoryClick('All')
        },
        {
            label: 'Electronics',
            icon: '📱',
            action: () => handleCategoryClick('Electronics')
        },
        {
            label: 'Fashion',
            icon: '👔',
            action: () => handleCategoryClick('Fashion')
        },
        {
            label: 'Home & Living',
            icon: '🏠',
            action: () => handleCategoryClick('Home')
        },
        {
            label: 'Sports',
            icon: '⚽',
            action: () => handleCategoryClick('Sports')
        },
        {
            label: 'Deals',
            icon: '🏷️',
            badge: 'NEW',
            action: () => console.log('Deals clicked')
        }
    ];

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="logo">
                        <span className="logo-icon">🛍️</span>
                        ShopZone
                    </Link>
                    
                    <ul className="nav-links">
                        <li><Link to="/" onClick={() => scrollToSection('home')}>Home</Link></li>
                        <li><Link to="/category">Category</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    
                    <div className="nav-actions">
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                        
                        <ThemeToggle className="desktop-theme-toggle" />
                        
                        <Link to="/sale" className="sale-badge">
                            <span className="sale-text">SALE</span>
                        </Link>
                        
                        <div className="nav-button cart-button" onClick={onCartClick}>
                            <span className="nav-icon">🛒</span>
                            <span className="nav-label">Cart</span>
                            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
                        </div>
                        
                        {user ? (
                                <div className="nav-button account-button">
                                    <span className="nav-icon">👤</span>
                                    <span className="nav-label">Account</span>
                                </div>
                            ) : (
                                <div className="nav-button account-button" onClick={onLoginClick}>
                                    <span className="nav-icon">👤</span>
                                    <span className="nav-label">Login</span>
                                </div>
                            )}
                        
                        <button className="mobile-menu-toggle" onClick={onMobileMenuToggle}>
                            ☰
                        </button>
                    </div>
                </div>
            </nav>
            <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </>
    );
};

export default Navbar;
