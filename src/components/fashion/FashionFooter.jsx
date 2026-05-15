import React from 'react';
import { Link } from 'react-router-dom';

const col = (title, links) => (
    <div key={title}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</h3>
        <ul className="mt-4 space-y-2.5">
            {links.map(([label, to]) => (
                <li key={label}>
                    <Link to={to} className="text-sm text-zinc-700 no-underline hover:text-rose-600">
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const FashionFooter = () => (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-3 py-12 sm:px-5 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-sm font-black text-white">A</span>
                        <span className="text-lg font-bold text-zinc-900">Atelier Lane</span>
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">A premium fashion-forward storefront experience — curated edits, confident styling, and trusted delivery.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700">App Store</span>
                        <span className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700">Google Play</span>
                    </div>
                </div>
                {col('Shopping', [
                    ['Men', '/category?shop=men'],
                    ['Women', '/category?shop=women'],
                    ['Kids', '/category?shop=kids'],
                    ['Beauty', '/category?shop=beauty'],
                    ['Sale', '/sale'],
                ])}
                {col('Customer care', [
                    ['Contact', '/contact'],
                    ['Track order', '/contact'],
                    ['Returns', '/contact'],
                    ['FAQs', '/about'],
                ])}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Follow</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {['Instagram', 'Pinterest', 'YouTube', 'X'].map((s) => (
                            <span key={s} className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-10 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-500">
                © {new Date().getFullYear()} Atelier Lane. Crafted for demo purposes — not affiliated with any retailer.
            </div>
        </div>
    </footer>
);

export default FashionFooter;
