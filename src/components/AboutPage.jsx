import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:pt-[calc(4.375rem+env(safe-area-inset-top,0px))] transition-colors duration-300">
            {/* Hero */}
            <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">About ShopZone</h1>
                    <p className="text-lg sm:text-xl text-purple-600 dark:text-purple-300 font-medium mb-4">Your Ultimate Shopping Destination</p>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">Experience the future of online shopping with ShopZone - where quality meets convenience, and every purchase is a delight.</p>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                        <div className="text-center">
                            <span className="block text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 bg-clip-text text-transparent">194+</span>
                            <span className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Products</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 bg-clip-text text-transparent">50+</span>
                            <span className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Categories</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 bg-clip-text text-transparent">24/7</span>
                            <span className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-center mb-2">About Us</h2>
                    <p className="text-purple-600 dark:text-purple-300 text-center mb-8">Discover Our Story</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="space-y-4">
                            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">Welcome to ShopZone, your premier online shopping destination where innovation meets excellence. Founded with a vision to revolutionize the e-commerce experience, we bring you a carefully curated selection of products from top brands across various categories.</p>
                            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">Our platform is built on cutting-edge technology, featuring React for seamless user interactions, Vite for lightning-fast performance, Redux for state management, and comprehensive JSON data integration.</p>
                            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">At ShopZone, we believe in creating more than just a shopping platform - we're building a community of satisfied customers who trust us for quality, reliability, and exceptional service.</p>
                        </div>
                        <div className="bg-white dark:bg-[#1e2235] rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-none border border-slate-100 dark:border-none">
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">Built With Modern Technology</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[{icon:'⚛️',name:'React'},{icon:'🔥',name:'Vite'},{icon:'🔄',name:'Redux'},{icon:'📊',name:'JSON Data'}].map(t => (
                                    <div key={t.name} className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 rounded-xl p-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
                                        <span className="text-2xl">{t.icon}</span>
                                        <span className="text-slate-900 dark:text-white text-sm font-medium">{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-12 sm:py-16 bg-slate-100 dark:bg-[#111827]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Our Mission</h2>
                            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6">To transform the online shopping experience by providing exceptional products, unbeatable prices, and world-class customer service.</p>
                            <div className="space-y-4">
                                {[{icon:'🎯',title:'Customer First',desc:'Your satisfaction is our top priority'},{icon:'💎',title:'Quality Assurance',desc:'Only the best products make it to our shelves'},{icon:'🚀',title:'Innovation',desc:'Constantly improving your shopping experience'}].map(v => (
                                    <div key={v.title} className="flex gap-4 items-start">
                                        <span className="text-2xl mt-0.5">{v.icon}</span>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm">{v.title}</h4>
                                            <p className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm">{v.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center border border-purple-500/10">
                            <span className="text-5xl sm:text-6xl mb-4">🌟</span>
                            <span className="text-slate-900 dark:text-white font-bold text-lg sm:text-xl">Excellence in Every Detail</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-center mb-2">Why Choose ShopZone?</h2>
                    <p className="text-purple-600 dark:text-purple-300 text-center mb-8">Experience the Difference</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[{icon:'🚚',title:'Fast Delivery',desc:'Get your orders delivered quickly with our optimized logistics network.'},{icon:'💳',title:'Secure Payments',desc:'Shop with confidence using our encrypted payment gateway.'},{icon:'🏆',title:'Quality Products',desc:'Every product is carefully selected and verified for quality.'},{icon:'🎧',title:'24/7 Support',desc:'Our dedicated customer support team is always here to help.'},{icon:'🔄',title:'Easy Returns',desc:'Hassle-free return policy ensures you can shop with peace of mind.'},{icon:'💰',title:'Best Prices',desc:'Competitive pricing and regular deals ensure the best value.'}].map(f => (
                            <div key={f.title} className="bg-white dark:bg-[#1e2235] rounded-xl p-5 sm:p-6 shadow-md dark:shadow-none border border-slate-100 dark:border-none hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 hover:-translate-y-1">
                                <span className="text-3xl block mb-3">{f.icon}</span>
                                <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2">{f.title}</h3>
                                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Developer */}
            <section className="py-12 sm:py-16 bg-slate-100 dark:bg-[#111827]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Meet the Developer</h2>
                            <div className="bg-white dark:bg-[#1e2235] rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-none border border-slate-100 dark:border-none flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl shrink-0">👨‍💻</div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">Ajay Verma</h3>
                                    <p className="text-purple-600 dark:text-purple-300 text-sm mb-2">Full Stack Developer</p>
                                    <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">Passionate about creating exceptional web experiences using modern technologies.</p>
                                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                        {['React','JavaScript','CSS','Redux','Vite'].map(s => (
                                            <span key={s} className="bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">Technology Stack</h3>
                            <div className="space-y-3">
                                {[{icon:'⚛️',name:'React',desc:'Modern UI components and state management'},{icon:'🔥',name:'Vite',desc:'Lightning-fast build tool and dev server'},{icon:'🔄',name:'Redux',desc:'Efficient state management for cart and user data'},{icon:'📊',name:'JSON Data',desc:'Comprehensive product data from DummyJSON API'}].map(t => (
                                    <div key={t.name} className="flex gap-4 items-center bg-white dark:bg-[#1e2235] rounded-xl p-4 shadow-sm dark:shadow-none border border-slate-100 dark:border-none hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200">
                                        <span className="text-2xl">{t.icon}</span>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm">{t.name}</h4>
                                            <p className="text-slate-500 dark:text-gray-400 text-xs">{t.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Ready to Start Shopping?</h2>
                    <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base mb-6">Join thousands of satisfied customers and experience the best in online shopping.</p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link to="/#products" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all duration-200 no-underline shadow-lg shadow-purple-500/20">Start Shopping</Link>
                        <Link to="/contact" className="px-8 py-3 bg-transparent border-2 border-slate-300 dark:border-gray-600 text-slate-700 dark:text-white font-bold rounded-xl text-sm hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 no-underline">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
