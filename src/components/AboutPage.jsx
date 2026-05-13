import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1 className="hero-title">About ShopZone</h1>
                    <p className="hero-subtitle">Your Ultimate Shopping Destination</p>
                    <div className="hero-description">
                        <p>Experience the future of online shopping with ShopZone - where quality meets convenience, and every purchase is a delight.</p>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">194+</span>
                            <span className="stat-label">Products</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Categories</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="card-icon">🛍️</div>
                        <span>Quality Products</span>
                    </div>
                    <div className="floating-card card-2">
                        <div className="card-icon">🚚</div>
                        <span>Fast Delivery</span>
                    </div>
                    <div className="floating-card card-3">
                        <div className="card-icon">💳</div>
                        <span>Secure Payment</span>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">About Us</h2>
                        <p className="section-subtitle">Discover Our Story</p>
                    </div>
                    <div className="about-content">
                        <div className="about-text">
                            <p className="about-paragraph">
                                Welcome to ShopZone, your premier online shopping destination where innovation meets excellence. Founded with a vision to revolutionize the e-commerce experience, we bring you a carefully curated selection of products from top brands across various categories.
                            </p>
                            <p className="about-paragraph">
                                Our platform is built on cutting-edge technology, featuring React for seamless user interactions, Vite for lightning-fast performance, Redux for state management, and comprehensive JSON data integration to ensure you have access to the latest products and real-time inventory.
                            </p>
                            <p className="about-paragraph">
                                At ShopZone, we believe in creating more than just a shopping platform - we're building a community of satisfied customers who trust us for quality, reliability, and exceptional service.
                            </p>
                        </div>
                        <div className="about-visual">
                            <div className="tech-stack">
                                <h3>Built With Modern Technology</h3>
                                <div className="tech-grid">
                                    <div className="tech-item">
                                        <div className="tech-icon">⚛️</div>
                                        <span>React</span>
                                    </div>
                                    <div className="tech-item">
                                        <div className="tech-icon">🔥</div>
                                        <span>Vite</span>
                                    </div>
                                    <div className="tech-item">
                                        <div className="tech-icon">🔄</div>
                                        <span>Redux</span>
                                    </div>
                                    <div className="tech-item">
                                        <div className="tech-icon">📊</div>
                                        <span>JSON Data</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="mission-content">
                        <div className="mission-text">
                            <h2 className="section-title">Our Mission</h2>
                            <p className="mission-description">
                                To transform the online shopping experience by providing exceptional products, unbeatable prices, and world-class customer service. We strive to make every interaction with ShopZone memorable and satisfying.
                            </p>
                            <div className="mission-values">
                                <div className="value-item">
                                    <div className="value-icon">🎯</div>
                                    <div className="value-content">
                                        <h4>Customer First</h4>
                                        <p>Your satisfaction is our top priority</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">💎</div>
                                    <div className="value-content">
                                        <h4>Quality Assurance</h4>
                                        <p>Only the best products make it to our shelves</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🚀</div>
                                    <div className="value-content">
                                        <h4>Innovation</h4>
                                        <p>Constantly improving your shopping experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mission-visual">
                            <div className="mission-image">
                                <div className="image-placeholder">
                                    <div className="placeholder-icon">🌟</div>
                                    <span>Excellence in Every Detail</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose ShopZone?</h2>
                        <p className="section-subtitle">Experience the Difference</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚚</div>
                            <h3 className="feature-title">Fast Delivery</h3>
                            <p className="feature-description">Get your orders delivered quickly with our optimized logistics network and multiple shipping options.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💳</div>
                            <h3 className="feature-title">Secure Payments</h3>
                            <p className="feature-description">Shop with confidence using our encrypted payment gateway and multiple payment options.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🏆</div>
                            <h3 className="feature-title">Quality Products</h3>
                            <p className="feature-description">Every product is carefully selected and verified for quality to ensure your satisfaction.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎧</div>
                            <h3 className="feature-title">24/7 Support</h3>
                            <p className="feature-description">Our dedicated customer support team is always here to help you with any questions or concerns.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3 className="feature-title">Easy Returns</h3>
                            <p className="feature-description">Hassle-free return policy ensures you can shop with peace of mind.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3 className="feature-title">Best Prices</h3>
                            <p className="feature-description">Competitive pricing and regular deals ensure you get the best value for your money.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Developer Section */}
            <section className="developer-section">
                <div className="container">
                    <div className="developer-content">
                        <div className="developer-info">
                            <h2 className="section-title">Meet the Developer</h2>
                            <div className="developer-card">
                                <div className="developer-avatar">
                                    <div className="avatar-placeholder">👨‍💻</div>
                                </div>
                                <div className="developer-details">
                                    <h3 className="developer-name">Ajay Verma</h3>
                                    <p className="developer-role">Full Stack Developer</p>
                                    <p className="developer-description">
                                        Passionate about creating exceptional web experiences using modern technologies. 
                                        This eCommerce platform is built with React, Vite, Redux, and powered by comprehensive JSON data integration.
                                    </p>
                                    <div className="developer-skills">
                                        <span className="skill-tag">React</span>
                                        <span className="skill-tag">JavaScript</span>
                                        <span className="skill-tag">CSS</span>
                                        <span className="skill-tag">Redux</span>
                                        <span className="skill-tag">Vite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tech-showcase">
                            <h3>Technology Stack</h3>
                            <div className="tech-details">
                                <div className="tech-detail-item">
                                    <div className="tech-detail-icon">⚛️</div>
                                    <div className="tech-detail-info">
                                        <h4>React</h4>
                                        <p>Modern UI components and state management</p>
                                    </div>
                                </div>
                                <div className="tech-detail-item">
                                    <div className="tech-detail-icon">🔥</div>
                                    <div className="tech-detail-info">
                                        <h4>Vite</h4>
                                        <p>Lightning-fast build tool and development server</p>
                                    </div>
                                </div>
                                <div className="tech-detail-item">
                                    <div className="tech-detail-icon">🔄</div>
                                    <div className="tech-detail-info">
                                        <h4>Redux</h4>
                                        <p>Efficient state management for cart and user data</p>
                                    </div>
                                </div>
                                <div className="tech-detail-item">
                                    <div className="tech-detail-icon">📊</div>
                                    <div className="tech-detail-info">
                                        <h4>JSON Data</h4>
                                        <p>Comprehensive product data from DummyJSON API</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Start Shopping?</h2>
                        <p className="cta-description">Join thousands of satisfied customers and experience the best in online shopping.</p>
                        <div className="cta-buttons">
                            <button className="cta-button primary">Start Shopping</button>
                            <button className="cta-button secondary">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
