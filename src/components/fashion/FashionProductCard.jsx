import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FashionProductCard = ({ product, onAddToCart, isWishlisted, onToggleWishlist, onRecordView }) => {
    const [hover, setHover] = useState(false);
    const gallery = [product.thumbnail, ...(product.images || [])].filter(Boolean);
    const unique = [...new Set(gallery)];
    const primary = unique[0];
    const secondary = unique[1] || unique[0];
    const canSwap = unique.length > 1;

    const discount = product.discountPercentage || 0;
    const salePrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
    const title = product.title || product.name;

    return (
        <motion.article
            layout
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/80 transition-shadow hover:shadow-lg"
            onMouseEnter={() => {
                setHover(true);
                onRecordView?.(product);
            }}
            onMouseLeave={() => setHover(false)}
            onFocus={() => onRecordView?.(product)}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50">
                <img src={primary} alt="" className={`absolute inset-0 h-full w-full object-contain p-3 transition-opacity duration-500 ${canSwap && hover ? 'opacity-0' : 'opacity-100'}`} />
                {canSwap && (
                    <img src={secondary} alt="" className={`absolute inset-0 h-full w-full object-contain p-3 transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`} />
                )}
                {discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[0.65rem] font-bold text-white shadow">
                        {Math.round(discount)}% off
                    </span>
                )}
                <button
                    type="button"
                    aria-label="Wishlist"
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleWishlist?.(product);
                    }}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow-md ring-1 ring-zinc-200/80 transition-transform hover:scale-105"
                >
                    {isWishlisted ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-zinc-500">{product.brand}</p>
                <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-zinc-900">{title}</h3>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-base font-bold text-zinc-900">₹{salePrice.toFixed(0)}</span>
                    {discount > 0 && <span className="text-sm text-zinc-400 line-through">₹{product.price.toFixed(0)}</span>}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600">
                    <span>★</span>
                    <span className="font-semibold text-zinc-700">{product.rating?.toFixed(1) ?? '—'}</span>
                    <span className="text-zinc-400">({product.reviews?.length ?? 0})</span>
                </div>
                <button
                    type="button"
                    onClick={() => onAddToCart?.(product)}
                    disabled={product.stock <= 0}
                    className="mt-2 w-full rounded-full bg-zinc-900 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
                >
                    {product.stock <= 0 ? 'Out of stock' : 'Add to bag'}
                </button>
            </div>
        </motion.article>
    );
};

export default FashionProductCard;
