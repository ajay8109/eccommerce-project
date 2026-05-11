import React from 'react';

const HeroSection = () => {
    const scrollToProducts = () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>ShopZone - Your Ultimate Shopping Destination</h1>
                    <p>Discover millions of products from top brands at unbeatable prices. Fast delivery, easy returns, and 24/7 customer support.</p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary btn-large" onClick={scrollToProducts}>
                            Shop Now
                        </button>
                        <button className="btn btn-secondary btn-large">
                            View Deals
                        </button>
                    </div>
                    <div className="hero-features">
                        <div className="feature">
                            <span className="feature-icon">🚚</span>
                            <span className="feature-text">Free Delivery</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">💳</span>
                            <span className="feature-text">Secure Payment</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🔄</span>
                            <span className="feature-text">Easy Returns</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-image-placeholder">
                        <span className="hero-image-text">Premium Products</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
