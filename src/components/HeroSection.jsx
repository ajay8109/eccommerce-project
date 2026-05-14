import React from 'react';
import ProductCarousel from './ProductCarousel';

const HeroSection = () => {
    const handleAddToCart = (product) => {
        // This will be handled by the CartContext
        console.log('Product added to cart from hero:', product.title);
    };
    const scrollToProducts = () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full bg-gradient-to-br from-[#0a0f1b] via-[#141824] to-[#0a0f1b] overflow-hidden" id="home">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                    {/* Text content */}
                    <div className="flex-1 text-center lg:text-left w-full min-w-0">
                        <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-snug sm:leading-tight mb-3 sm:mb-6">
                            ShopZone - Your Ultimate <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Shopping Destination</span>
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-0.5">
                            Discover millions of products from top brands at unbeatable prices. Fast delivery, easy returns, and 24/7 customer support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
                            <button 
                                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm sm:text-base hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 active:scale-[0.98] cursor-pointer border-none"
                                onClick={scrollToProducts}
                            >
                                Shop Now
                            </button>
                            <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border-2 border-gray-600 text-white font-bold rounded-xl text-sm sm:text-base hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer">
                                View Deals
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
                            <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-xl sm:text-2xl">🚚</span>
                                <span className="text-xs sm:text-sm font-medium">Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-xl sm:text-2xl">💳</span>
                                <span className="text-xs sm:text-sm font-medium">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-xl sm:text-2xl">🔄</span>
                                <span className="text-xs sm:text-sm font-medium">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                    {/* Carousel */}
                    <div className="flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl">
                        <ProductCarousel onAddToCart={handleAddToCart} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
