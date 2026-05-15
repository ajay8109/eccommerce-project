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

    return (
        <div className="w-full px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-12 bg-white dark:bg-[#0a0f1b] transition-colors duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b-2 border-slate-100 dark:border-gray-800 mb-6">
                <h2 className="text-xl min-[400px]:text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight break-words">
                    {selectedCategory === 'All' ? 'ALL PRODUCTS' : selectedCategory}
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span className="bg-cyan-500 text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md shadow-cyan-500/20">
                        {sortedProducts.length} Products
                    </span>
                    <select 
                        className="bg-slate-50 dark:bg-[#1e2235] text-slate-900 dark:text-white border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm font-medium outline-none cursor-pointer focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 w-full sm:w-auto"
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
            
            {/* Grid or Empty State */}
            {sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="text-6xl">🔍</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">No products found</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">Try adjusting your filters to see more results</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 min-[360px]:gap-2.5 min-[400px]:gap-3 sm:gap-4">
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
