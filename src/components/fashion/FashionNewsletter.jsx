import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FashionNewsletter = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSent(true);
        setEmail('');
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <section className="mx-auto max-w-[1440px] px-3 py-12 sm:px-5 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 p-[1px] shadow-lg"
            >
                <div className="rounded-[calc(1.5rem-1px)] bg-white/95 px-6 py-10 sm:px-12 sm:py-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500">Insider list</p>
                        <h2 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">First access to drops & private sales</h2>
                        <p className="mt-2 text-sm text-zinc-600">Weekly edits, no spam — unsubscribe anytime.</p>
                        <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="min-h-12 flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-5 text-sm text-zinc-900 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200 sm:max-w-xs"
                            />
                            <button type="submit" className="min-h-12 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-8 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                Subscribe
                            </button>
                        </form>
                        {sent && <p className="mt-3 text-sm font-semibold text-emerald-600">You are on the list. Thank you!</p>}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FashionNewsletter;
