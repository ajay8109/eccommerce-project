import { useMemo } from 'react';
import { PRODUCTS } from '../data/products';

/**
 * “AI-style” picks: high-rated fashion-ish categories + recently viewed IDs.
 */
export const useFashionRecommendations = (recentlyViewedIds = []) => {
    return useMemo(() => {
        const fashionCats = new Set([
            'beauty', 'fragrances', 'mens-shirts', 'mens-shoes', 'mens-watches',
            'womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery',
            'tops', 'sunglasses', 'furniture', 'home-decoration',
        ]);
        const pool = PRODUCTS.filter((p) => fashionCats.has(p.category));
        const byRecent = recentlyViewedIds
            .map((id) => PRODUCTS.find((p) => p.id === id))
            .filter(Boolean);
        const trending = [...pool]
            .sort((a, b) => b.rating - a.rating || b.discountPercentage - a.discountPercentage)
            .slice(0, 8);
        const personalized = [...byRecent, ...trending].filter(
            (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
        ).slice(0, 8);
        return { trending, personalized: personalized.length ? personalized : trending };
    }, [recentlyViewedIds]);
};
