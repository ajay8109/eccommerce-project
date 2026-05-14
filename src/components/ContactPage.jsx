import React from 'react';
import { Link } from 'react-router-dom';
import useContactForm from '../hooks/useContactForm';
import './ContactPage.css';

const ContactPage = () => {
    const {
        formData,
        errors,
        isSubmitting,
        submitStatus,
        handleChange,
        handleSubmit,
        resetForm
    } = useContactForm();

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Contact Us</h1>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-info-item">
                            <div className="contact-icon">📍</div>
                            <div className="contact-details">
                                <h3>Address</h3>
                                <p>123 Shopping Street, Commerce City, CC 12345</p>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-icon">📧</div>
                            <div className="contact-details">
                                <h3>Email</h3>
                                <p>support@shopzone.com</p>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-icon">📞</div>
                            <div className="contact-details">
                                <h3>Phone</h3>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-icon">⏰</div>
                            <div className="contact-details">
                                <h3>Business Hours</h3>
                                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                                <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    rows="6"
                                    className={errors.message ? 'error' : ''}
                                />
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                                <button
                                    type="button"
                                    className="reset-btn"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                >
                                    Reset
                                </button>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="success-message">
                                    ✓ Message sent successfully! We'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="error-message">
                                    ✗ Failed to send message. Please try again later.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="contact-back">
                    <Link to="/" className="back-link">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
