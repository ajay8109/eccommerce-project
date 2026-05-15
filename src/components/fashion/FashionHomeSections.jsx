import React from 'react';
import { Link } from 'react-router-dom';
import FashionProductCard from './FashionProductCard';

const FashionProductRow = ({ title, subtitle, products, onAddToCart, wishlistIds, onToggleWishlist, onRecordView }) => (
    <section className="mx-auto max-w-[1440px] px-3 py-8 sm:px-5 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
                <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
            </div>
            <Link to="/category" className="text-sm font-semibold text-rose-600 no-underline hover:underline">
                See all
            </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5">
            {products.map((p) => (
                <div key={p.id} className="w-[46%] shrink-0 min-[400px]:w-[38%] sm:w-[32%] md:w-[28%] lg:w-[22%] xl:w-[18%]">
                    <FashionProductCard
                        product={p}
                        onAddToCart={onAddToCart}
                        isWishlisted={wishlistIds.has(p.id)}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={onRecordView}
                    />
                </div>
            ))}
        </div>
    </section>
);

const FashionAISection = ({ trending, personalized, onAddToCart, wishlistIds, onToggleWishlist, onRecordView }) => (
    <div className="border-y border-zinc-200/80 bg-white">
        <FashionProductRow
            title="Recommended for you"
            subtitle="Inspired by your taste — refreshed as you browse"
            products={personalized}
            onAddToCart={onAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onRecordView={onRecordView}
        />
        <FashionProductRow
            title="Trending in fashion"
            subtitle="High energy picks from the community"
            products={trending}
            onAddToCart={onAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onRecordView={onRecordView}
        />
    </div>
);

const FashionBrandWall = () => {
    const brands = ['Essence', 'Dior', 'Gucci', 'Calvin Klein', 'Chanel', 'Huda', 'Apple', 'Samsung', 'Nike', 'Adidas', 'Zara', 'H&M'];
    return (
        <section className="mx-auto max-w-[1440px] px-3 py-10 sm:px-5 lg:px-8">
            <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">Top brands</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-zinc-500">Authority names alongside emerging labels — one destination</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {brands.map((b) => (
                    <span key={b} className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm sm:text-sm">
                        {b}
                    </span>
                ))}
            </div>
        </section>
    );
};

const FashionCapsuleGrid = ({ title, subtitle, products, onAddToCart, wishlistIds, onToggleWishlist, onRecordView }) => (
    <section className="mx-auto max-w-[1440px] px-3 py-8 sm:px-5 lg:px-8">
        <div className="mb-5 text-center">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
            {products.map((p) => (
                <FashionProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlistIds.has(p.id)}
                    onToggleWishlist={onToggleWishlist}
                    onRecordView={onRecordView}
                />
            ))}
        </div>
    </section>
);

export { FashionProductRow, FashionAISection, FashionBrandWall, FashionCapsuleGrid };
