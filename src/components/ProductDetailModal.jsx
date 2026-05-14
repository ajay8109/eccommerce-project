import React from 'react';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !product) return null;

    const handleAddToCart = () => { onAddToCart(product); onClose(); };

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0;
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(full)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                {half && <span className="text-yellow-400 text-xs opacity-60">★</span>}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => <span key={i} className="text-gray-600 text-xs">★</span>)}
            </div>
        );
    };

    const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 pb-[env(safe-area-inset-bottom,0px)] sm:pb-4" onClick={onClose}>
            <div className="bg-[#0f172a] border border-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[min(90dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] overflow-y-auto shadow-2xl shadow-purple-500/10 relative sm:my-auto" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-none cursor-pointer text-lg z-10 transition-all duration-200" onClick={onClose}>×</button>
                
                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative sm:w-2/5 h-56 sm:h-auto bg-[#161929] flex items-center justify-center p-6 shrink-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
                        <img src={product.thumbnail} alt={product.title} className="max-h-[180px] sm:max-h-[240px] object-contain" />
                        {product.discountPercentage > 0 && <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">-{Math.round(product.discountPercentage)}%</span>}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 p-5 sm:p-6 space-y-3">
                        <h2 className="text-lg sm:text-xl font-bold text-white pr-8">{product.title}</h2>
                        <span className="inline-flex bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{product.category}</span>
                        <div className="flex items-center gap-2">{renderStars(product.rating)}<span className="text-gray-400 text-xs">{product.rating} ({product.reviews?.length || 0} reviews)</span></div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-green-400 font-bold text-2xl">₹{discountedPrice.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                                <>
                                    <span className="text-gray-400 line-through text-sm">₹{product.price.toFixed(2)}</span>
                                    <span className="text-[#ff4d6d] text-xs font-semibold">Save ₹{(product.price - discountedPrice).toFixed(2)}</span>
                                </>
                            )}
                        </div>
                        
                        <div className="text-sm">{product.stock > 0 ? <span className="text-green-400">✓ In Stock ({product.stock} available)</span> : <span className="text-red-400">✗ Out of Stock</span>}</div>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{product.description}</p>
                        
                        {product.tags && <div className="flex flex-wrap gap-1.5">{product.tags.map((tag, i) => <span key={i} className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-full">{tag}</span>)}</div>}
                        
                        <div className="text-gray-400 text-xs"><strong className="text-gray-300">Brand:</strong> {product.brand}</div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button type="button" className={`flex-1 min-h-11 py-2.5 rounded-xl font-bold text-sm border-none cursor-pointer transition-all duration-200 active:scale-[0.98] touch-manipulation ${product.stock <= 0 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'}`} onClick={handleAddToCart} disabled={product.stock <= 0}>{product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}</button>
                            <button type="button" className="min-h-11 py-2.5 rounded-xl font-bold text-sm bg-transparent border-2 border-gray-700 text-white hover:border-cyan-400 hover:text-cyan-400 cursor-pointer transition-all duration-200 touch-manipulation sm:px-5" onClick={onClose}>Close</button>
                        </div>
                        
                        <div className="border-t border-gray-800 pt-3 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-400">
                            {product.sku && <div><strong className="text-gray-300">SKU:</strong> {product.sku}</div>}
                            {product.weight && <div><strong className="text-gray-300">Weight:</strong> {product.weight}g</div>}
                            {product.dimensions && <div><strong className="text-gray-300">Dimensions:</strong> {product.dimensions.width}×{product.dimensions.height}×{product.dimensions.depth}cm</div>}
                            {product.warrantyInformation && <div><strong className="text-gray-300">Warranty:</strong> {product.warrantyInformation}</div>}
                            {product.shippingInformation && <div><strong className="text-gray-300">Shipping:</strong> {product.shippingInformation}</div>}
                            {product.returnPolicy && <div><strong className="text-gray-300">Returns:</strong> {product.returnPolicy}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
