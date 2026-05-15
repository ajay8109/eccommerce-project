import React from 'react';
import { Link } from 'react-router-dom';
import useContactForm from '../hooks/useContactForm';

const ContactPage = () => {
    const { formData, errors, isSubmitting, submitStatus, handleChange, handleSubmit, resetForm } = useContactForm();

    const inputClass = (field) => `w-full rounded-lg border ${errors[field] ? 'border-red-500' : 'border-slate-200 dark:border-gray-600'} bg-white dark:bg-[#1e2235] text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-sm sm:text-base`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))] transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Contact Us</h1>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact info */}
                    <div className="space-y-4 sm:space-y-6">
                        {[
                            {icon:'📍', title:'Address', lines:['123 Shopping Street, Commerce City, CC 12345']},
                            {icon:'📧', title:'Email', lines:['support@shopzone.com']},
                            {icon:'📞', title:'Phone', lines:['+1 (555) 123-4567']},
                            {icon:'⏰', title:'Business Hours', lines:['Mon - Fri: 9:00 AM - 6:00 PM','Sat - Sun: 10:00 AM - 4:00 PM']}
                        ].map(item => (
                            <div key={item.title} className="flex gap-4 bg-white dark:bg-[#1e2235] rounded-xl p-4 sm:p-5 shadow-sm dark:shadow-none border border-slate-100 dark:border-none hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200">
                                <span className="text-2xl mt-0.5">{item.icon}</span>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-1">{item.title}</h3>
                                    {item.lines.map((line, i) => <p key={i} className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">{line}</p>)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact form */}
                    <div className="w-full max-w-lg mx-auto lg:mx-0">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                             <div>
                                <label htmlFor="name" className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={inputClass('name')} />
                                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className={inputClass('email')} />
                                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows="6" className={`${inputClass('message')} resize-y`} />
                                {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all duration-200 border-none cursor-pointer disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-purple-500/20">
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                                <button type="button" onClick={resetForm} disabled={isSubmitting} className="py-3 px-6 bg-transparent border-2 border-slate-300 dark:border-gray-700 text-slate-700 dark:text-white font-bold rounded-xl text-sm hover:border-slate-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer disabled:opacity-50">
                                    Reset
                                </button>
                            </div>
                            {submitStatus === 'success' && <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-3 text-sm font-medium">✓ Message sent successfully! We'll get back to you soon.</div>}
                            {submitStatus === 'error' && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 text-sm font-medium">✗ Failed to send message. Please try again later.</div>}
                        </form>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 text-center">
                    <Link to="/" className="text-purple-400 hover:text-purple-300 no-underline text-sm font-medium transition-colors duration-200">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
