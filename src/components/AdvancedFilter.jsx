import React, { useState, useEffect } from 'react';

const AdvancedFilter = ({ 
  products, 
  onFilterChange, 
  selectedCategory, 
  selectedSubcategory,
  priceRange,
  onCategoryChange,
  onSubcategoryChange,
  onPriceRangeChange 
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange || [0, 1300]);
  const [localCategory, setLocalCategory] = useState(selectedCategory || 'All');
  const [localSubcategory, setLocalSubcategory] = useState(selectedSubcategory || 'All');

  // Get all unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  // Get subcategories based on selected category
  const getSubcategories = (category) => {
    if (category === 'All') return ['All'];
    return ['All', ...new Set(products
      .filter(p => p.category === category)
      .map(p => p.subcategory))];
  };

  const subcategories = getSubcategories(localCategory);

  // Calculate price range from products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  useEffect(() => {
    setLocalPriceRange(priceRange || [minPrice, maxPrice]);
  }, [priceRange, minPrice, maxPrice]);

  const handleCategoryChange = (category) => {
    setLocalCategory(category);
    setLocalSubcategory('All'); // Reset subcategory when category changes
    onCategoryChange(category);
  };

  const handleSubcategoryChange = (subcategory) => {
    setLocalSubcategory(subcategory);
    onSubcategoryChange(subcategory);
  };

  const handlePriceChange = (type, value) => {
    const newRange = [...localPriceRange];
    if (type === 'min') {
      newRange[0] = Math.min(value, newRange[1] - 1);
    } else {
      newRange[1] = Math.max(value, newRange[0] + 1);
    }
    setLocalPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleSliderChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = Number(value);
    setLocalPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const clearFilters = () => {
    setLocalCategory('All');
    setLocalSubcategory('All');
    setLocalPriceRange([minPrice, maxPrice]);
    onCategoryChange('All');
    onSubcategory('All');
    onPriceRangeChange([minPrice, maxPrice]);
  };

  return (
    <div className="advanced-filter">
      <div className="filter-header">
        <h3>Advanced Filters</h3>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>
      
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="category-select">Category</label>
          <select 
            id="category-select"
            value={localCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="subcategory-select">Subcategory</label>
          <select 
            id="subcategory-select"
            value={localSubcategory}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            className="filter-select"
            disabled={localCategory === 'All'}
          >
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group price-range-group">
          <label>Price Range</label>
          <div className="price-inputs">
            <div className="price-input">
              <span>$</span>
              <input
                type="number"
                min={minPrice}
                max={localPriceRange[1] - 1}
                value={localPriceRange[0]}
                onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                className="price-number-input"
              />
            </div>
            <span className="price-separator">-</span>
            <div className="price-input">
              <span>$</span>
              <input
                type="number"
                min={localPriceRange[0] + 1}
                max={maxPrice}
                value={localPriceRange[1]}
                onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                className="price-number-input"
              />
            </div>
          </div>
          
          <div className="price-slider">
            <div className="slider-container">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={localPriceRange[0]}
                onChange={(e) => handleSliderChange(0, e.target.value)}
                className="slider slider-min"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={localPriceRange[1]}
                onChange={(e) => handleSliderChange(1, e.target.value)}
                className="slider slider-max"
              />
              <div className="slider-track">
                <div 
                  className="slider-range"
                  style={{
                    left: `${((localPriceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    right: `${100 - ((localPriceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
                  }}
                />
              </div>
            </div>
            <div className="price-labels">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-summary">
        <span className="filter-count">
          {products.filter(product => {
            const categoryMatch = localCategory === 'All' || product.category === localCategory;
            const subcategoryMatch = localSubcategory === 'All' || product.subcategory === localSubcategory;
            const priceMatch = product.price >= localPriceRange[0] && product.price <= localPriceRange[1];
            return categoryMatch && subcategoryMatch && priceMatch;
          }).length} products found
        </span>
      </div>
    </div>
  );
};

export default AdvancedFilter;
