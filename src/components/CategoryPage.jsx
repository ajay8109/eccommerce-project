import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import './CategoryPage.css';

const CategoryPage = ({ onAddToCart }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const category = searchParams.get('category') || 'All';
    const [wishlist, setWishlist] = useState([]);
    
    // Predefined categories
    const predefinedCategories = [
        { id: 'fashion', name: 'Fashion', icon: '👗' },
        { id: 'home', name: 'Home & Living', icon: '🏠' },
        { id: 'beauty', name: 'Beauty', icon: '💄' },
        { id: 'products', name: 'General Products', icon: '📦' },
        { id: 'phones', name: 'Smartphones', icon: '📱' },
        { id: 'laptops', name: 'Laptops', icon: '💻' },
        { id: 'charge', name: 'Chargers & Accessories', icon: '🔌' },
        { id: 'watches', name: 'Watches', icon: '⌚' },
        { id: 'headphones', name: 'Headphones', icon: '🎧' },
        { id: 'cameras', name: 'Cameras', icon: '📷' },
        { id: 'gaming', name: 'Gaming', icon: '🎮' },
        { id: 'sports', name: 'Sports', icon: '⚽' }
    ];
    
    // State management
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedRating, setSelectedRating] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const productsPerPage = 24;

    useEffect(() => {
        // Filter products by category
        let categoryProducts;
        
        if (category === 'All') {
            categoryProducts = PRODUCTS;
        } else {
            // Find the predefined category
            const predefinedCategory = predefinedCategories.find(cat => cat.id === category);
            if (predefinedCategory) {
                // Filter by predefined category ID
                categoryProducts = PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
            } else {
                // Filter by category name (fallback)
                categoryProducts = PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
            }
        }
        
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
    }, [category]);

    // Get unique brands
    const brands = useMemo(() => {
        const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
        return uniqueBrands.sort();
    }, [products]);

    // Apply filters
    const finalFilteredProducts = useMemo(() => {
        let filtered = [...products];

        // Price filter
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Brand filter
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        }

        // Rating filter
        if (selectedRating) {
            filtered = filtered.filter(p => p.rating >= parseFloat(selectedRating));
        }

        // Stock filter
        if (inStockOnly) {
            filtered = filtered.filter(p => p.stock > 0);
        }

        return filtered;
    }, [products, priceRange, selectedBrands, selectedRating, inStockOnly]);

    // Sort products
    const sortedProducts = useMemo(() => {
        const productsToSort = [...finalFilteredProducts];
        
        switch(sortBy) {
            case 'price-low':
                return productsToSort.sort((a, b) => a.price - b.price);
            case 'price-high':
                return productsToSort.sort((a, b) => b.price - a.price);
            case 'rating':
                return productsToSort.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return productsToSort.sort((a, b) => new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0));
            default:
                return productsToSort;
        }
    }, [finalFilteredProducts, sortBy]);

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const clearAllFilters = () => {
        setPriceRange([0, 200000]);
        setSelectedBrands([]);
        setSelectedRating('');
        setInStockOnly(false);
        setSortBy('featured');
        setCurrentPage(1);
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

    const getBrandCount = (brand) => {
        return products.filter(p => p.brand === brand).length;
    };

    const toggleWishlist = (product) => {
        console.log('toggleWishlist called with:', product);
        console.log('Current wishlist:', wishlist);
        
        const isInWishlist = wishlist.some(item => item.id === product.id);
        console.log('Is in wishlist:', isInWishlist);
        
        if (isInWishlist) {
            // Remove from wishlist
            const newWishlist = wishlist.filter(item => item.id !== product.id);
            setWishlist(newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            console.log('Removed from wishlist, new count:', newWishlist.length);
            // Show toast
            showToast(`${product.title || 'Product'} removed from wishlist ✓`);
        } else {
            // Add to wishlist
            const newWishlist = [...wishlist, product];
            setWishlist(newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            console.log('Added to wishlist, new count:', newWishlist.length);
            // Show toast
            showToast(`${product.title || 'Product'} added to wishlist ✓`);
        }
    };

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ec4899;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    };

    return (
        <div className="category-page">
            {/* Category Header Section */}
            <header className="category-header">
                <div className="category-banner">
                    <div className="category-banner-content">
                        <nav className="breadcrumb">
                            <Link to="/" className="breadcrumb-link">Home</Link>
                            <span className="breadcrumb-separator">›</span>
                            <Link to="/" className="breadcrumb-link">Category</Link>
                            <span className="breadcrumb-separator">›</span>
                            <span className="breadcrumb-current">{category}</span>
                        </nav>
                        <div className="category-info">
                            <div className="category-left">
                                <h1 className="category-name">All Products</h1>
                                <div className="product-count-badge">
                                    {sortedProducts.length} Products
                                </div>
                            </div>
                            <div className="category-actions">
                                <button className="filter-toggle-btn">
                                    <span>🔍</span> Filters
                                </button>
                                <button className="compare-toggle-btn">
                                    <span>⚖️</span> Compare
                                </button>
                                <button 
                                    style={{
                                        background: '#ec4899',
                                        color: 'white',
                                        border: '1px solid #ec4899',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => {
                                        console.log('Wishlist clicked, current items:', wishlist.length);
                                        navigate('/wishlist');
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#db2777';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = '#ec4899';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <span>❤️</span> Wishlist ({wishlist.length})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Toolbar Bar */}
            <div className="category-toolbar">
                <div className="toolbar-left">
                    <span className="results-count">
                        Showing {startIndex + 1}–{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} results
                    </span>
                </div>
                <div className="toolbar-right">
                    <select 
                        className="sort-dropdown"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Sort by: Featured</option>
                        <option value="price-low">Price: Low → High</option>
                        <option value="price-high">Price: High → Low</option>
                        <option value="rating">Top Rated</option>
                        <option value="newest">Newest</option>
                    </select>
                    <div className="view-controls">
                        <button 
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Selection Grid */}
            {category === 'All' && (
                <section className="category-selection">
                    <div className="container">
                        <h2 className="selection-title">Shop by Category</h2>
                        <div className="category-grid">
                            {predefinedCategories.map(cat => (
                                <Link 
                                    key={cat.id}
                                    to={`/category?category=${cat.id}`}
                                    className="category-card"
                                >
                                    <div className="category-icon">{cat.icon}</div>
                                    <div className="category-info">
                                        <h3>{cat.name}</h3>
                                        <span className="category-count">
                                            {PRODUCTS.filter(p => p.category.toLowerCase() === cat.id.toLowerCase()).length} products
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <div className="category-content">
                {/* Filter Sidebar */}
                <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
                    <div className="filter-header">
                        <h3>Filters</h3>
                        <button 
                            className="mobile-filter-toggle"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="filter-section">
                        <h4>Price Range</h4>
                        <div className="price-range">
                            <div className="price-inputs">
                                <div className="price-input-group">
                                    <label>Min</label>
                                    <input 
                                        type="number" 
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                        min="0"
                                        max="200000"
                                    />
                                </div>
                                <div className="price-input-group">
                                    <label>Max</label>
                                    <input 
                                        type="number" 
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        min="0"
                                        max="200000"
                                    />
                                </div>
                            </div>
                            <div className="price-slider">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="200000" 
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="slider"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Brand</h4>
                        <div className="brand-list">
                            {brands.map(brand => (
                                <label key={brand} className="brand-checkbox">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    <span className="brand-name">{brand}</span>
                                    <span className="brand-count">({getBrandCount(brand)})</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Customer Rating</h4>
                        <div className="rating-options">
                            {['3', '4', '5'].map(rating => (
                                <label key={rating} className="rating-option">
                                    <input 
                                        type="radio" 
                                        name="rating"
                                        value={rating}
                                        checked={selectedRating === rating}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                    />
                                    <span className="rating-stars">
                                        {[...Array(parseInt(rating))].map((_, i) => (
                                            <span key={i} className="star">★</span>
                                        ))}
                                        & above
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Availability</h4>
                        <div className="availability-options">
                            <label className="availability-option">
                                <input 
                                    type="radio" 
                                    name="availability"
                                    checked={!inStockOnly}
                                    onChange={() => setInStockOnly(false)}
                                />
                                <span>All Products</span>
                            </label>
                            <label className="availability-option">
                                <input 
                                    type="radio" 
                                    name="availability"
                                    checked={inStockOnly}
                                    onChange={() => setInStockOnly(true)}
                                />
                                <span>In Stock</span>
                            </label>
                        </div>
                    </div>

                    <button className="clear-filters-btn" onClick={clearAllFilters}>
                        Clear All Filters
                    </button>
                </aside>

                {/* Main Product Area */}
                <main className="category-main">
                    {/* Sort & View Controls */}
                    <div className="sort-view-controls">
                        <div className="sort-controls">
                            <span className="results-count">
                                Showing {startIndex + 1}–{Math.min(startIndex + productsPerPage, sortedProducts.length)} of {sortedProducts.length} results
                            </span>
                            <select 
                                className="sort-dropdown"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="featured">Sort by: Featured</option>
                                <option value="price-low">Price: Low → High</option>
                                <option value="price-high">Price: High → Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                        <div className="view-controls">
                            <button 
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                Grid
                            </button>
                            <button 
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                List
                            </button>
                        </div>
                    </div>

                    {/* Product Grid/List */}
                    <div className={`products-container ${viewMode}`}>
                        {paginatedProducts.map(product => {
                            const discountPercentage = product.discountPercentage || 0;
                            const discountedPrice = product.price * (1 - discountPercentage / 100);
                            const isNew = Math.random() > 0.7; // Random for demo
                            const isHot = discountPercentage >= 20;
                            
                            return (
                                <div key={product.id} className="category-product-card">
                                    <div className="product-image-container">
                                        <img src={product.thumbnail} alt={product.title} />
                                        <div className="product-overlay">
                                            {isNew && <span className="badge new">NEW</span>}
                                            {isHot && <span className="badge hot">HOT</span>}
                                            {discountPercentage > 0 && <span className="badge sale">SALE</span>}
                                        </div>
                                        <button className="quick-add-btn" onClick={() => {
                                            onAddToCart(product);
                                            
                                            // Test with hardcoded name first
                                            const toast = document.createElement('div');
                                            toast.className = 'toast-notification';
                                            toast.style.cssText = `
                                                position: fixed;
                                                top: 20px;
                                                right: 20px;
                                                background: #06b6d4;
                                                color: white;
                                                padding: 12px 20px;
                                                border-radius: 8px;
                                                z-index: 9999;
                                                font-weight: 600;
                                                box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
                                            `;
                                            
                                            // Try to get product name
                                            let productName = 'Test Product';
                                            if (product && product.id) {
                                                productName = `Product #${product.id}`;
                                                if (product.title) {
                                                    productName = product.title;
                                                }
                                            }
                                            
                                            toast.textContent = `${productName} added to cart ✓`;
                                            document.body.appendChild(toast);
                                            
                                            setTimeout(() => {
                                                if (toast.parentNode) {
                                                    toast.parentNode.removeChild(toast);
                                                }
                                            }, 3000);
                                        }}>
                                            🛒 Add to Cart
                                        </button>
                                        <button 
                                            className={`wishlist-btn ${wishlist.some(item => item.id === product.id) ? 'wishlisted' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Heart clicked for product:', product.title);
                                                toggleWishlist(product);
                                            }}
                                        >
                                            {wishlist.some(item => item.id === product.id) ? '❤️' : '🤍'}
                                        </button>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.title}</h3>
                                        <p className="product-brand">{product.brand}</p>
                                        <div className="product-rating">
                                            {renderStars(product.rating)}
                                            <span className="rating-count">({product.reviews?.length || 0})</span>
                                        </div>
                                        <div className="product-price">
                                            {discountPercentage > 0 ? (
                                                <>
                                                    <span className="current-price">₹{discountedPrice.toFixed(2)}</span>
                                                    <span className="original-price">₹{product.price.toFixed(2)}</span>
                                                    <span className="discount-percent">-{discountPercentage}%</span>
                                                </>
                                            ) : (
                                                <span className="current-price">₹{product.price.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                className="pagination-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                ← Prev
                            </button>
                            
                            <div className="pagination-numbers">
                                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button 
                                            key={pageNum}
                                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                {totalPages > 5 && <span className="pagination-dots">...</span>}
                            </div>
                            
                            <button 
                                className="pagination-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Filter Toggle */}
            <button 
                className="mobile-filter-drawer-toggle"
                onClick={() => setIsFilterOpen(true)}
            >
                Filters ☰
            </button>
        </div>
    );
};

export default CategoryPage;
