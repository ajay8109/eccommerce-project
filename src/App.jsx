import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PRODUCTS } from './data/products';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import HeroSection from './components/HeroSection';
import ProductCarousel from './components/ProductCarousel';
import CategoryFilter from './components/CategoryFilter';
import AdvancedFilter from './components/AdvancedFilter';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';
import AboutPage from './components/AboutPage';
import SalePage from './components/SalePage';
import CategoryPage from './components/CategoryPage';
import WishlistPage from './components/WishlistPage';
import ContactPage from './components/ContactPage';
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
    const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
    const [toast, setToast] = useState({ message: '', type: '', show: false });

    // Calculate dynamic price range
    const minPrice = Math.min(...PRODUCTS.map(p => p.price));
    const maxPrice = Math.max(...PRODUCTS.map(p => p.price));

    // Initialize price range on mount
    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    // Filter products based on search query
    useEffect(() => {
        const filtered = searchQuery.trim() === '' 
            ? PRODUCTS 
            : PRODUCTS.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        setFilteredProducts(filtered);
    }, [searchQuery]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
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
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showToast('Login successful! Welcome back!');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
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

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSubcategoryChange = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    const handlePriceRangeChange = (newRange) => {
        setPriceRange(newRange);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <ThemeProvider>
            <CartProvider>
                <Router>
                    <AppContext.Provider value={{ user, cart, isCartOpen, isLoginModalOpen, isMobileMenuOpen, selectedCategory, selectedSubcategory, priceRange, searchQuery, filteredProducts, toast, handleLogin, handleLogout, handleAddToCart, updateQuantity, handleRemoveItem, handleCheckout, handleCategoryChange, handleSubcategoryChange, handlePriceRangeChange, handleSearchChange, handleCartClick, handleLoginClick, handleMobileMenuToggle }}>
                        <div className="min-h-screen bg-[#0f172a] text-white w-full overflow-x-hidden">
                            <Navbar 
                                user={user}
                                cartCount={cartCount}
                                onLogout={handleLogout}
                                onCartClick={handleCartClick}
                                onLoginClick={handleLoginClick}
                                onCategoryChange={handleCategoryChange}
                                onMobileMenuToggle={handleMobileMenuToggle}
                                priceRange={priceRange}
                                onPriceRangeChange={handlePriceRangeChange}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                onSearchChange={handleSearchChange}
                            />
                            
                            <MobileMenu 
                                isOpen={isMobileMenuOpen}
                                onClose={() => setIsMobileMenuOpen(false)}
                                user={user}
                                cartCount={cartCount}
                                onCartClick={() => {
                                    setIsCartOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                onLogout={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                onLoginClick={() => {
                                    setIsLoginModalOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                onCategoryChange={handleCategoryChange}
                            />
                            
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <main className="pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))] flex flex-col flex-1 w-full overflow-x-hidden">
                                            <HeroSection />
                                            
                                            <ProductGrid 
                                                id="products"
                                                products={filteredProducts} 
                                                selectedCategory={selectedCategory}
                                                selectedSubcategory={selectedSubcategory}
                                                priceRange={priceRange}
                                                onAddToCart={handleAddToCart}
                                            />
                                        </main>
                                        <Footer />
                                    </>
                                } />
                                <Route path="/about" element={
                                    <>
                                        <AboutPage />
                                        <Footer />
                                    </>
                                } />
                                <Route path="/sale" element={
                                    <>
                                        <SalePage onAddToCart={handleAddToCart} />
                                        <Footer />
                                    </>
                                } />
                                <Route path="/category" element={
                                    <>
                                        <CategoryPage onAddToCart={handleAddToCart} />
                                        <Footer />
                                    </>
                                } />
                                <Route path="/wishlist" element={
                                    <>
                                        <WishlistPage />
                                        <Footer />
                                    </>
                                } />
                                <Route path="/contact" element={
                                    <>
                                        <ContactPage />
                                        <Footer />
                                    </>
                                } />
                            </Routes>
                            
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
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;
