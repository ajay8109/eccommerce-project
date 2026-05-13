import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

const ProductGrid = ({ products, selectedCategory, selectedSubcategory, priceRange, searchQuery, onAddToCart }) => {
    const [sortBy, setSortBy] = useState('featured');
    
    const sortedProducts = useMemo(() => {
        const productsToSort = [...products];
        
        switch(sortBy) {
            case 'price-low':
                return productsToSort.sort((a, b) => a.price - b.price);
            case 'price-high':
                return productsToSort.sort((a, b) => b.price - a.price);
            case 'newest':
                return productsToSort.sort((a, b) => new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0));
            case 'rating':
                return productsToSort.sort((a, b) => b.rating - a.rating);
            case 'featured':
            default:
                return productsToSort;
        }
    }, [products, sortBy]);
    
    console.log('Filtered products count:', sortedProducts.length);

    return (
        <div className="products-section">
            <div className="products-header">
                <h2>{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
                <div className="products-info">
                    <span className="products-count">{sortedProducts.length} Products</span>
                    <div className="sort-dropdown">
                        <select 
                            className="sort-select" 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                            <option value="rating">Best Rated</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {sortedProducts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to see more results</p>
                </div>
            ) : (
                <div className="product-grid">
                    {sortedProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
