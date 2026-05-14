import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const handleAddToCart = () => {
        onAddToCart(product);
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        const productName = product.title || product.name || 'Product';
        toast.textContent = `Added ${productName} to cart ✓`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        const productName = product.title || product.name || 'Product';
        const action = isWishlisted ? 'removed from' : 'added to';
        toast.textContent = `${productName} ${action} wishlist ✓`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
                {hasHalfStar && <span className="text-yellow-400 text-xs opacity-60">★</span>}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                    <span key={i} className="text-gray-600 text-xs">★</span>
                ))}
                <span className="text-gray-400 text-xs ml-1">({product.reviews?.length || 0})</span>
            </div>
        );
    };

    const discountPercentage = product.discountPercentage || 0;
    const originalPrice = discountPercentage > 0 
        ? (product.price * (1 + discountPercentage / 100))
        : null;

    return (
        <div className="bg-[#1e2235] rounded-lg sm:rounded-xl overflow-hidden shadow-lg flex flex-col transition-all duration-200 ease-in-out hover:shadow-xl hover:shadow-purple-500/20 sm:hover:scale-[1.02] group">
            {/* Image container */}
            <div className="relative h-40 min-[400px]:h-44 sm:h-52 bg-[#161929] overflow-hidden">
                <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Wishlist heart icon */}
                <button 
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border-none cursor-pointer text-sm transition-all duration-200 hover:scale-110 z-10 ${
                        isWishlisted ? 'bg-pink-500/30' : ''
                    }`}
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    {isWishlisted ? '❤️' : '🤍'}
                </button>

                {/* Discount badge */}
                {discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-lg z-10">
                        -{Math.round(discountPercentage)}%
                    </span>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold border border-white/30 hover:bg-white/30 transition-all duration-200 cursor-pointer">
                        Quick View
                    </button>
                </div>
            </div>

            {/* Card content - flex-col flex-grow for sticky bottom button */}
            <div className="p-2.5 sm:p-4 flex flex-col flex-grow gap-1.5 sm:gap-2">
                {/* Category tag */}
                <span className="inline-flex self-start bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {product.category}
                </span>
                
                {/* Product name */}
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                    {product.title}
                </h3>
                
                {/* Rating stars */}
                {renderStars(product.rating)}
                
                {/* Price section */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-green-400 font-bold text-base sm:text-lg">₹{product.price.toFixed(2)}</span>
                    {originalPrice && (
                        <>
                            <span className="text-gray-400 line-through text-sm">₹{originalPrice.toFixed(2)}</span>
                            <span className="bg-orange-500 text-white text-xs rounded px-1 py-0.5 font-semibold">
                                {Math.round(discountPercentage)}% off
                            </span>
                        </>
                    )}
                </div>
                
                {/* Add to Cart button - mt-auto pushes to bottom */}
                <button 
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-200 mt-auto cursor-pointer border-none ${
                        product.stock <= 0 
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30 active:scale-[0.98]'
                    }`}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                >
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
