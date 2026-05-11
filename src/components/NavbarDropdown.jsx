import React, { useState, useEffect, useRef } from 'react';

const NavbarDropdown = ({ title, items, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action) => {
    if (action && typeof action === 'function') {
      action();
    }
    setIsOpen(false);
  };

  return (
    <div className="navbar-dropdown" ref={dropdownRef}>
      <button 
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {icon && <span className="dropdown-icon">{icon}</span>}
        <span>{title}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleItemClick(item.action)}
            >
              {item.icon && <span className="item-icon">{item.icon}</span>}
              <span className="item-text">{item.label}</span>
              {item.badge && <span className="item-badge">{item.badge}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
