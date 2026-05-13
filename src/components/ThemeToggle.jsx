import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme, isDark } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        toggleTheme();
    };

    return (
        <button
            className={`theme-toggle ${className}`}
            onClick={handleToggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            <div className="theme-toggle-track">
                <div className="theme-toggle-thumb">
                    {isDark ? (
                        <span className="theme-icon moon">🌙</span>
                    ) : (
                        <span className="theme-icon sun">☀️</span>
                    )}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
