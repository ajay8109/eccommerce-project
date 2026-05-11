import React, { useState } from 'react';
import NavbarDropdown from './NavbarDropdown';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import PriceRangeDropdown from './PriceRangeDropdown';

const Navbar = ({ user, cartCount, onLogout, onCartClick, onLoginClick, onCategoryChange, onMobileMenuToggle, priceRange, onPriceRangeChange, minPrice, maxPrice, onSearchChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

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
        scrollToSection('products');
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
        <nav className="navbar">
            <div className="navbar-container">
                <a href="#" className="logo">
                    <span className="logo-icon">🛍️</span>
                    ShopZone
                </a>
                
                <ul className="nav-links">
                    <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                    <li>
                            <NavbarDropdown 
                                title="browse" 
                                items={browseMenuItems}
                                icon=""
                            />
                        </li>
                    <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
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
                    
                    <PriceRangeDropdown 
                        priceRange={priceRange}
                        onPriceRangeChange={onPriceRangeChange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
                    
                    <div className="cart-icon" onClick={onCartClick}>
                        <span className="cart-text">cart</span>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </div>
                    
                    {user ? (
                            <NavbarDropdown 
                                title="account" 
                                items={userMenuItems}
                                icon=""
                            />
                        ) : (
                            <NavbarDropdown 
                                title="account" 
                                items={guestMenuItems}
                                icon=""
                            />
                        )}
                    
                    <button className="mobile-menu-toggle" onClick={onMobileMenuToggle}>
                        ☰
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
