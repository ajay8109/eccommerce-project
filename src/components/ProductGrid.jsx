import React, { useMemo } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, selectedCategory, selectedSubcategory, priceRange, searchQuery, onAddToCart }) => {
    console.log('Filtering products:', { selectedCategory, selectedSubcategory, priceRange });
    
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
            const subcategoryMatch = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
            const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
            const searchMatch = !searchQuery || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (selectedCategory === 'Electronics' && product.category === 'Electronics') {
                console.log('Electronics product found:', product.name, { categoryMatch, subcategoryMatch, priceMatch, searchMatch });
            }
            
            return categoryMatch && subcategoryMatch && priceMatch && searchMatch;
        });
    }, [products, selectedCategory, selectedSubcategory, priceRange, searchQuery]);
    
    console.log('Filtered products count:', filteredProducts.length);

    return (
        <div className="products-section">
            <div className="products-header">
                <h2>{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
                <div className="products-info">
                    <span className="products-count">{filteredProducts.length} Products</span>
                    <div className="sort-dropdown">
                        <select className="sort-select">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                            <option>Best Rated</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {filteredProducts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to see more results</p>
                </div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(product => (
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
