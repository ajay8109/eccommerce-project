import React, { useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { useFashionRecommendations } from '../../hooks/useFashionRecommendations';
import FashionHeroCarousel from './FashionHeroCarousel';
import FashionCategoryStrip from './FashionCategoryStrip';
import FashionDealsSections from './FashionDealsSections';
import { FashionAISection, FashionBrandWall, FashionCapsuleGrid } from './FashionHomeSections';
import FashionNewsletter from './FashionNewsletter';
import FashionProductCard from './FashionProductCard';

const FASHION_CATS = new Set([
    'beauty', 'fragrances', 'mens-shirts', 'mens-shoes', 'mens-watches',
    'womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery',
    'tops', 'sunglasses', 'furniture', 'home-decoration',
]);

const FashionHomePage = ({ onAddToCart, wishlist, onToggleWishlist, searchQuery = '', filteredProducts = [] }) => {
    const { recentlyViewedIds, recordView } = useRecentlyViewed();
    const { trending, personalized } = useFashionRecommendations(recentlyViewedIds);
    const wishlistIds = useMemo(() => new Set(wishlist.map((w) => w.id)), [wishlist]);

    const pool = useMemo(() => PRODUCTS.filter((p) => FASHION_CATS.has(p.category)), []);

    const newArrivals = useMemo(
        () => [...pool].sort((a, b) => new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0)).slice(0, 10),
        [pool]
    );
    const bestSellers = useMemo(() => [...pool].sort((a, b) => b.rating - a.rating).slice(0, 10), [pool]);
    const luxe = useMemo(() => [...pool].sort((a, b) => b.price - a.price).slice(0, 8), [pool]);
    const seasonal = useMemo(() => [...pool].filter((p) => (p.discountPercentage || 0) >= 12).slice(0, 8), [pool]);
    const trendingOutfits = useMemo(() => {
        const m = pool.filter((p) => p.category === 'mens-shirts').slice(0, 4);
        const w = pool.filter((p) => p.category === 'womens-dresses').slice(0, 4);
        return [...m, ...w].slice(0, 8);
    }, [pool]);

    return (
        <div className="min-h-screen bg-[#faf9f6] text-zinc-900">
            {searchQuery.trim() ? (
                <section className="border-b border-zinc-200 bg-white">
                    <div className="mx-auto max-w-[1440px] px-3 py-6 sm:px-5 lg:px-8">
                        <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">Results for “{searchQuery.trim()}”</h2>
                        <p className="mt-1 text-sm text-zinc-500">{filteredProducts.length} styles found</p>
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
                            {filteredProducts.slice(0, 24).map((p) => (
                                <FashionProductCard
                                    key={p.id}
                                    product={p}
                                    onAddToCart={onAddToCart}
                                    isWishlisted={wishlistIds.has(p.id)}
                                    onToggleWishlist={onToggleWishlist}
                                    onRecordView={recordView}
                                />
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <p className="mt-6 text-center text-sm text-zinc-500">Try another keyword or browse departments below.</p>
                        )}
                    </div>
                </section>
            ) : (
                <>
                    <FashionHeroCarousel />
                    <FashionCategoryStrip />
                    <FashionDealsSections />
                    <FashionBrandWall />
                    <FashionCapsuleGrid
                        title="Luxe collections"
                        subtitle="Investment pieces with enduring craft"
                        products={luxe}
                        onAddToCart={onAddToCart}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={recordView}
                    />
                    <FashionCapsuleGrid
                        title="Seasonal spotlight"
                        subtitle="Warm palettes & tactile layers"
                        products={seasonal}
                        onAddToCart={onAddToCart}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={recordView}
                    />
                    <FashionCapsuleGrid
                        title="Trending outfits"
                        subtitle="High-contrast pairings from the studio floor"
                        products={trendingOutfits}
                        onAddToCart={onAddToCart}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={recordView}
                    />
                    <FashionCapsuleGrid
                        title="New arrivals"
                        subtitle="Fresh drops across departments"
                        products={newArrivals}
                        onAddToCart={onAddToCart}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={recordView}
                    />
                    <FashionCapsuleGrid
                        title="Best sellers"
                        subtitle="Community favourites with stellar ratings"
                        products={bestSellers}
                        onAddToCart={onAddToCart}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={recordView}
                    />
                    <FashionAISection
                        trending={trending}
                        personalized={personalized}
                        onAddToCart={onAddToCart}
                        wishlistIds={wishlistIds}
                        onToggleWishlist={onToggleWishlist}
                        onRecordView={recordView}
                    />
                    <div id="products" className="scroll-mt-28" />
                </>
            )}

            <FashionNewsletter />
        </div>
    );
};

export default FashionHomePage;
