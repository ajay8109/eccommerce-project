import React, { useState } from 'react';

const PriceRangeSlider = ({ minPrice, maxPrice, onPriceRangeChange }) => {
    const [localRange, setLocalRange] = useState([minPrice, maxPrice]);
    const [isOpen, setIsOpen] = useState(false);

    const handleMinChange = (e) => {
        const newMin = parseInt(e.target.value) || 0;
        const newMax = Math.max(newMin, localRange[1]);
        setLocalRange([newMin, newMax]);
        if (onPriceRangeChange) {
            onPriceRangeChange([newMin, newMax]);
        }
    };

    const handleMaxChange = (e) => {
        const newMax = parseInt(e.target.value) || 0;
        const newMin = Math.min(newMax, localRange[0]);
        setLocalRange([newMin, newMax]);
        if (onPriceRangeChange) {
            onPriceRangeChange([newMin, newMax]);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="price-range-slider">
            <button 
                className="price-slider-button" 
                onClick={toggleDropdown}
            >
                <span className="price-slider-icon">💰</span>
                <span className="price-slider-text">
                    ₹{localRange[0]} - ₹{localRange[1]}
                </span>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className="price-slider-dropdown">
                    <div className="price-slider-content">
                        <div className="price-slider-inputs">
                            <div className="slider-input-group">
                                <label>Min Price</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    value={localRange[0]}
                                    onChange={handleMinChange}
                                    className="slider-input"
                                />
                                <span className="slider-value">₹{localRange[0]}</span>
                            </div>
                            <div className="slider-input-group">
                                <label>Max Price</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    value={localRange[1]}
                                    onChange={handleMaxChange}
                                    className="slider-input"
                                />
                                <span className="slider-value">₹{localRange[1]}</span>
                            </div>
                        </div>
                        <div className="price-slider-actions">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => {
                                    setLocalRange([0, 10000]);
                                    if (onPriceRangeChange) {
                                        onPriceRangeChange([0, 10000]);
                                    }
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceRangeSlider;
