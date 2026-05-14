import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const MobileMenu = ({ isOpen, onClose, user, cartCount, onLogout, onCartClick, onLoginClick, onCategoryChange }) => {
    const menuRef = useRef(null);
    const navigate = useNavigate();

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

    const handleNavClick = (path) => {
        navigate(path);
        onClose();
    };

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

    const MenuItem = ({ icon, text, badge, onClick }) => (
        <div 
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            onClick={onClick}
        >
            <span className="text-lg w-6 text-center opacity-80">{icon}</span>
            <span className="flex-1 text-white text-sm font-medium">{text}</span>
            {badge && (
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center shadow-sm">
                    {badge}
                </span>
            )}
        </div>
    );

    const SectionTitle = ({ title }) => (
        <div className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-[0.15em] px-4 pt-4 pb-1">{title}</div>
    );

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 lg:hidden ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose} 
            />
            
            {/* Slide-in Drawer */}
            <div 
                className={`fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#0f172a] z-[999] transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`} 
                ref={menuRef}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-2 text-xl font-extrabold text-cyan-400">
                        <span className="text-2xl">🛍️</span>
                        ShopZone
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle className="compact" />
                        <button 
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-none cursor-pointer text-lg transition-all duration-200"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-2 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
                    <SectionTitle title="Navigation" />
                    <MenuItem icon="🏠" text="Home" onClick={() => handleNavClick('/')} />
                    <MenuItem icon="🛍️" text="All Products" onClick={() => handleNavClick('/category')} />
                    <MenuItem icon="ℹ️" text="About" onClick={() => handleNavClick('/about')} />
                    <MenuItem icon="📞" text="Contact" onClick={() => handleNavClick('/contact')} />

                    <SectionTitle title="Categories" />
                    <MenuItem icon="📱" text="Electronics" onClick={() => handleCategoryClick('Electronics')} />
                    <MenuItem icon="👔" text="Fashion" onClick={() => handleCategoryClick('Fashion')} />
                    <MenuItem icon="🏠" text="Home & Living" onClick={() => handleCategoryClick('Home')} />
                    <MenuItem icon="⚽" text="Sports" onClick={() => handleCategoryClick('Sports')} />

                    <SectionTitle title="Shopping" />
                    <MenuItem icon="🛒" text="Cart" badge={cartCount > 0 ? cartCount : null} onClick={onCartClick} />
                    <MenuItem icon="❤️" text="Wishlist" badge="3" onClick={() => handleNavClick('/wishlist')} />
                    <MenuItem icon="🏷️" text="Deals" badge="NEW" onClick={() => handleNavClick('/sale')} />

                    <SectionTitle title="Account" />
                    {user ? (
                        <>
                            <MenuItem icon="👤" text="My Profile" onClick={() => console.log('Profile clicked')} />
                            <MenuItem icon="📦" text="Order History" onClick={() => console.log('Orders clicked')} />
                            <MenuItem icon="⚙️" text="Settings" onClick={() => console.log('Settings clicked')} />
                            <MenuItem icon="🚪" text="Logout" onClick={onLogout} />
                        </>
                    ) : (
                        <>
                            <MenuItem icon="🔐" text="Login" onClick={onLoginClick} />
                            <MenuItem icon="📝" text="Register" onClick={() => console.log('Register clicked')} />
                        </>
                    )}

                    <SectionTitle title="Support" />
                    <MenuItem icon="❓" text="Help & Support" onClick={() => console.log('Help clicked')} />
                    <MenuItem icon="📞" text="Contact Us" onClick={() => handleNavClick('/contact')} />
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
