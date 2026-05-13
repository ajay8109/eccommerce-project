import React, { useState, useRef, useEffect } from 'react';

const PriceRangeDropdown = ({ priceRange, onPriceRangeChange, minPrice, maxPrice }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [priceRange]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMinChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        const newRange = [value, localPriceRange[1]];
        setLocalPriceRange(newRange);
    };

    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        const newRange = [localPriceRange[0], value];
        setLocalPriceRange(newRange);
    };

    const handleSliderChange = (e) => {
        const value = parseInt(e.target.value);
        const newRange = [localPriceRange[0], value];
        setLocalPriceRange(newRange);
    };

    const applyFilter = () => {
        onPriceRangeChange(localPriceRange);
        setIsOpen(false);
    };

    const resetFilter = () => {
        const defaultRange = [minPrice, maxPrice];
        setLocalPriceRange(defaultRange);
        onPriceRangeChange(defaultRange);
        setIsOpen(false);
    };

    const formatPrice = (price) => {
        return `$${price}`;
    };

    return (
        <div className="price-range-dropdown" ref={dropdownRef}>
            <button className="nav-button price-button" onClick={toggleDropdown}>
                <span className="nav-icon">💰</span>
                <span className="nav-label">Price</span>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="price-range-menu">
                    <div className="price-range-header">
                        <h4>Price Range Filter</h4>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                    
                    <div className="price-range-content">
                        <div className="price-inputs">
                            <div className="price-input-group">
                                <label>Min Price</label>
                                <input
                                    type="number"
                                    value={localPriceRange[0]}
                                    onChange={handleMinChange}
                                    min={minPrice}
                                    max={localPriceRange[1]}
                                    className="price-input"
                                />
                            </div>
                            <div className="price-input-group">
                                <label>Max Price</label>
                                <input
                                    type="number"
                                    value={localPriceRange[1]}
                                    onChange={handleMaxChange}
                                    min={localPriceRange[0]}
                                    max={maxPrice}
                                    className="price-input"
                                />
                            </div>
                        </div>

                        <div className="price-slider">
                            <label>Price Range</label>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={localPriceRange[1]}
                                onChange={handleSliderChange}
                                className="slider"
                            />
                            <div className="slider-labels">
                                <span>{formatPrice(minPrice)}</span>
                                <span>{formatPrice(maxPrice)}</span>
                            </div>
                        </div>

                        <div className="price-range-actions">
                            <button className="btn btn-secondary" onClick={resetFilter}>
                                Reset
                            </button>
                            <button className="btn btn-primary" onClick={applyFilter}>
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceRangeDropdown;
