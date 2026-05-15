import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DEAL_ROWS = [
    {
        title: 'Biggest deals',
        subtitle: 'Limited window — stack your savings',
        cards: [
            { title: 'Up to 50% off', desc: 'Denim & casual shirts', href: '/sale', tone: 'from-violet-600 to-indigo-600', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21fea47?auto=format&fit=crop&w=900&q=80' },
            { title: 'Beauty steals', desc: 'Glow kits under ₹999', href: '/category?shop=beauty', tone: 'from-rose-500 to-orange-400', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80' },
        ],
    },
    {
        title: 'Trending now',
        subtitle: 'What shoppers are loving this week',
        cards: [
            { title: 'Statement heels', desc: 'Sculpted heels & mules', href: '/category?shop=women', tone: 'from-zinc-800 to-zinc-950', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80' },
            { title: 'Sneaker drop', desc: 'Sport-luxe pairs', href: '/category?shop=men', tone: 'from-emerald-600 to-teal-700', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80' },
        ],
    },
    {
        title: 'Top picks',
        subtitle: 'Editor-approved capsules',
        cards: [
            { title: 'Luxe bags', desc: 'Structured carryalls', href: '/category?shop=women', tone: 'from-amber-700 to-orange-600', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80' },
            { title: 'Home refresh', desc: 'Sculptural accents', href: '/category?shop=home-living', tone: 'from-sky-600 to-blue-800', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea8?auto=format&fit=crop&w=900&q=80' },
        ],
    },
];

const FashionDealsSections = () => (
    <div className="space-y-12 bg-zinc-50/80 py-10 sm:py-14">
        {DEAL_ROWS.map((row) => (
            <section key={row.title} className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-8">
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{row.title}</h2>
                    <p className="mt-1 text-sm text-zinc-500">{row.subtitle}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {row.cards.map((card) => (
                        <motion.div key={card.title} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                            <Link to={card.href} className="relative block overflow-hidden rounded-3xl no-underline shadow-md ring-1 ring-zinc-200/80">
                                <div className="aspect-[16/10] w-full">
                                    <img src={card.img} alt="" className="h-full w-full object-cover" />
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${card.tone} opacity-80`} />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                                        <h3 className="text-2xl font-bold text-white sm:text-3xl">{card.title}</h3>
                                        <p className="mt-1 text-sm text-white/90">{card.desc}</p>
                                        <span className="mt-4 inline-flex w-fit items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/40 backdrop-blur">
                                            Shop now
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        ))}
    </div>
);

export default FashionDealsSections;
