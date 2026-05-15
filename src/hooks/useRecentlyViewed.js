import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'atelier_recently_viewed';
const MAX = 12;

const read = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export const useRecentlyViewed = () => {
    const [ids, setIds] = useState(read);

    useEffect(() => {
        setIds(read());
    }, []);

    const recordView = useCallback((product) => {
        if (!product?.id) return;
        const next = [product.id, ...read().filter((id) => id !== product.id)].slice(0, MAX);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setIds(next);
    }, []);

    return { recentlyViewedIds: ids, recordView };
};
