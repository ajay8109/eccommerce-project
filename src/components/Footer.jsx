import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div>
                    <div className="footer-logo">🛍️ ShopZone</div>
                    <p>Your premium shopping destination</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <div style={{fontSize: '1.5rem', marginTop: '0.5rem'}}>
                        <span style={{marginRight: '1rem'}}>📘</span>
                        <span style={{marginRight: '1rem'}}>🐦</span>
                        <span style={{marginRight: '1rem'}}>📷</span>
                        <span>📧</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 ShopZone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
