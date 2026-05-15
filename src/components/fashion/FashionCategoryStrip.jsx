import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { label: 'Men', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80', href: '/category?shop=men' },
    { label: 'Women', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80', href: '/category?shop=women' },
    { label: 'Kids', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80', href: '/category?shop=kids' },
    { label: 'Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80', href: '/category?shop=beauty' },
    { label: 'Home', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80', href: '/category?shop=home-living' },
    { label: 'Studio', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80', href: '/category?shop=studio' },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

const FashionCategoryStrip = () => (
    <section className="mx-auto max-w-[1440px] px-3 py-8 sm:px-5 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Shop by department</h2>
                <p className="mt-1 text-sm text-zinc-500">Circular edits — tap a mood to explore</p>
            </div>
            <Link to="/category" className="hidden text-sm font-semibold text-rose-600 no-underline hover:underline sm:inline">
                View all
            </Link>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
            {CATEGORIES.map((c) => (
                <motion.div key={c.label} variants={item}>
                    <Link to={c.href} className="group flex flex-col items-center gap-2 no-underline">
                        <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-full ring-2 ring-zinc-100 transition-all duration-300 group-hover:ring-rose-200 group-hover:shadow-lg sm:max-w-none">
                            <img src={c.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <span className="text-center text-xs font-semibold text-zinc-800 sm:text-sm">{c.label}</span>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    </section>
);

export default FashionCategoryStrip;
