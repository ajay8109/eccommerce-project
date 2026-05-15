import React from 'react';

const CartSidebar = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
            <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] lg:w-[440px] bg-white dark:bg-[#0f172a] z-[999] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl dark:shadow-none transition-colors duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-gray-800 transition-colors duration-300 shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Shopping Cart ({cart.length})</h2>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 border-none cursor-pointer text-xl transition-all duration-200" onClick={onClose}>×</button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-4">
                            <div className="text-5xl">🛒</div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-3 sm:gap-4 bg-slate-50 dark:bg-[#1e2235] border border-slate-100 dark:border-none rounded-xl p-3 sm:p-4 transition-colors duration-300">
                                    <img src={item.image || item.thumbnail} alt={item.name || item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-slate-100 dark:bg-[#161929] shrink-0 transition-colors duration-300" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-slate-900 dark:text-white font-semibold text-sm line-clamp-2 mb-1">{item.name || item.title}</div>
                                        <div className="text-emerald-600 dark:text-green-400 font-bold text-sm mb-2">₹{item.price.toFixed(2)}</div>
                                        <div className="flex items-center gap-2">
                                            <button className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 text-sm font-bold transition-all duration-200 active:scale-95" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                                            <span className="text-slate-900 dark:text-white font-semibold text-sm min-w-[24px] text-center">{item.quantity}</span>
                                            <button className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 text-sm font-bold transition-all duration-200 active:scale-95" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                            <button className="ml-auto text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 bg-transparent border-none cursor-pointer text-lg p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => onRemoveItem(item.id)}>🗑</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="border-t border-slate-200 dark:border-gray-800 px-4 sm:px-6 py-4 sm:py-6 pb-[max(1rem,env(safe-area-inset-bottom,0px))] shrink-0 bg-slate-50 dark:bg-[#0a0f1b] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 dark:text-gray-400 font-medium">Total:</span>
                        <span className="text-slate-900 dark:text-white font-bold text-xl sm:text-2xl">₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 border-none cursor-pointer shadow-lg ${cart.length === 0 ? 'bg-slate-300 dark:bg-gray-700 text-slate-500 dark:text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 active:scale-[0.98] shadow-purple-500/20'}`} onClick={onCheckout} disabled={cart.length === 0}>Proceed to Checkout</button>
                        <button className="w-full py-3 rounded-xl font-bold text-sm bg-transparent border-2 border-slate-300 dark:border-gray-700 text-slate-700 dark:text-white hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 cursor-pointer" onClick={onClose}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
