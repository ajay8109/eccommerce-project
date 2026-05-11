import React, { useState, useEffect, createContext } from 'react';
import { PRODUCTS } from './data/products';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import AdvancedFilter from './components/AdvancedFilter';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';
import './styles.css';

// App Context
export const AppContext = createContext(null);

// Main App Component
const App = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 1300]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState({ message: '', type: '', show: false });

    // Calculate dynamic price range
    const minPrice = Math.min(...PRODUCTS.map(p => p.price));
    const maxPrice = Math.max(...PRODUCTS.map(p => p.price));

    // Initialize price range on mount
    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedCart = localStorage.getItem('cart');
        
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cart]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type, show: true });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        showToast('Login successful! Welcome back!');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        showToast('Logged out successfully');
    };

    const handleAddToCart = (product) => {
        if (!user) {
            setIsLoginModalOpen(true);
            showToast('Please login to add items to cart', 'error');
            return;
        }

        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            setCart(cart.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        
        showToast(`${product.name} added to cart!`);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(productId);
            return;
        }
        
        setCart(cart.map(item => 
            item.id === productId 
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const handleRemoveItem = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
        showToast('Item removed from cart');
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;
        
        showToast('Order placed successfully! 🎉');
        setCart([]);
        setIsCartOpen(false);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const onLogout = () => {
        handleLogout();
    };

    const onCartClick = () => {
        setIsCartOpen(true);
    };

    const onLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <ThemeProvider>
            <AppContext.Provider value={{ user, cart, handleAddToCart }}>
                <div className="app-container">
                    <MobileMenu 
                        isOpen={isMobileMenuOpen}
                        onClose={closeMobileMenu}
                        user={user}
                        cartCount={cartCount}
                        onLogout={onLogout}
                        onCartClick={onCartClick}
                        onLoginClick={onLoginClick}
                        onCategoryChange={setSelectedCategory}
                    />
                    <Navbar 
                        user={user}
                        cartCount={cartCount}
                        onLogout={handleLogout}
                        onCartClick={() => setIsCartOpen(true)}
                        onLoginClick={() => setIsLoginModalOpen(true)}
                        onCategoryChange={setSelectedCategory}
                        onMobileMenuToggle={toggleMobileMenu}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onSearchChange={handleSearchChange}
                    />
                    
                    <main className="main-content">
                        <HeroSection />
                        
                        <ProductGrid 
                            id="products"
                            products={PRODUCTS}
                            selectedCategory={selectedCategory}
                            selectedSubcategory={selectedSubcategory}
                            priceRange={priceRange}
                            onAddToCart={handleAddToCart}
                        />
                    </main>
                    
                    <Footer />
                    
                    <CartSidebar 
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                        cart={cart}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={handleRemoveItem}
                        onCheckout={handleCheckout}
                    />
                    
                    <LoginModal 
                        isOpen={isLoginModalOpen}
                        onClose={() => setIsLoginModalOpen(false)}
                        onLogin={handleLogin}
                    />
                    
                    <Toast 
                        message={toast.message}
                        type={toast.type}
                        show={toast.show}
                    />
                </div>
            </AppContext.Provider>
        </ThemeProvider>
    );
};

export default App;
