import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SLIDES = [
    {
        id: 1,
        eyebrow: 'Winter edit',
        title: 'Layered silhouettes',
        subtitle: 'Outerwear & knits curated for city evenings',
        cta: 'Shop coats',
        href: '/category?shop=men',
        image: 'https://images.unsplash.com/photo-1523381210438-271ebebe590e?auto=format&fit=crop&w=1600&q=80',
        tone: 'from-zinc-900/80 via-zinc-900/40 to-transparent',
    },
    {
        id: 2,
        eyebrow: 'Occasion wear',
        title: 'Statement dresses',
        subtitle: 'Sculpted lines, fluid fabrics, luminous palettes',
        cta: 'Explore women',
        href: '/category?shop=women',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
        tone: 'from-rose-950/75 via-rose-900/35 to-transparent',
    },
    {
        id: 3,
        eyebrow: 'Beauty lab',
        title: 'Glow ritual',
        subtitle: 'Skin-first essentials & signature scents',
        cta: 'View beauty',
        href: '/category?shop=beauty',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80',
        tone: 'from-stone-900/80 via-stone-800/40 to-transparent',
    },
];

const FashionHeroCarousel = () => {
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5200);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8 lg:pt-6">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200/80">
                <div className="aspect-[16/9] min-h-[220px] w-full sm:aspect-[21/9] sm:min-h-[280px] lg:min-h-[360px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={SLIDES[i].id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55 }}
                            className="absolute inset-0"
                        >
                            <img src={SLIDES[i].image} alt="" className="h-full w-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-r ${SLIDES[i].tone}`} />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                                <motion.p
                                    initial={{ y: 12, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xs font-bold uppercase tracking-[0.25em] text-white/80"
                                >
                                    {SLIDES[i].eyebrow}
                                </motion.p>
                                <motion.h1
                                    initial={{ y: 16, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.18 }}
                                    className="mt-2 max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                                >
                                    {SLIDES[i].title}
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 16, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.26 }}
                                    className="mt-2 max-w-md text-sm text-white/85 sm:text-base"
                                >
                                    {SLIDES[i].subtitle}
                                </motion.p>
                                <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.34 }} className="mt-5">
                                    <Link
                                        to={SLIDES[i].href}
                                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-zinc-900 no-underline shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {SLIDES[i].cta}
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            aria-label={`Slide ${idx + 1}`}
                            onClick={() => setI(idx)}
                            className={`h-2 rounded-full transition-all ${idx === i ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FashionHeroCarousel;
