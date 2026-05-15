import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (!passwordRegex.test(formData.password)) newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
        if (!isLogin) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (isLogin) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === formData.email && u.password === formData.password);
            if (user) {
                const userData = { email: user.email, firstName: user.firstName, lastName: user.lastName };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                onLogin(userData);
                onClose();
                resetForm();
            } else {
                setErrors({ email: 'Invalid email or password' });
            }
        } else {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.email === formData.email)) { setErrors({ email: 'Email already registered' }); return; }
            const newUser = { email: formData.email, password: formData.password, firstName: formData.firstName, lastName: formData.lastName, createdAt: new Date().toISOString() };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            const userData = { email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            onLogin(userData);
            onClose();
            resetForm();
        }
    };

    const resetForm = () => { setFormData({ email: '', password: '', firstName: '', lastName: '', confirmPassword: '' }); setErrors({}); };
    const toggleMode = () => { setIsLogin(!isLogin); resetForm(); };

    if (!isOpen) return null;

    const inputClass = (field) => `w-full rounded-lg border ${errors[field] ? 'border-red-500' : 'border-slate-200 dark:border-gray-600'} bg-slate-50 dark:bg-[#1e2235] text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-sm sm:text-base`;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 pb-[env(safe-area-inset-bottom,0px)] sm:pb-4 transition-all duration-300" onClick={onClose}>
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[min(90dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] overflow-y-auto mx-auto p-5 sm:p-10 shadow-2xl dark:shadow-purple-500/10 relative sm:my-auto transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{isLogin ? 'Login to ShopZone' : 'Create Account'}</h2>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 border-none cursor-pointer transition-all duration-200" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">First Name</label>
                                <input type="text" name="firstName" className={inputClass('firstName')} value={formData.firstName} onChange={handleChange} required />
                                {errors.firstName && <span className="text-red-500 dark:text-red-400 text-xs mt-1 block">{errors.firstName}</span>}
                            </div>
                            <div>
                                <label className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Last Name</label>
                                <input type="text" name="lastName" className={inputClass('lastName')} value={formData.lastName} onChange={handleChange} required />
                                {errors.lastName && <span className="text-red-500 dark:text-red-400 text-xs mt-1 block">{errors.lastName}</span>}
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Email</label>
                        <input type="email" name="email" className={inputClass('email')} value={formData.email} onChange={handleChange} required />
                        {errors.email && <span className="text-red-500 dark:text-red-400 text-xs mt-1 block">{errors.email}</span>}
                    </div>
                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Password</label>
                        <input type="password" name="password" className={inputClass('password')} value={formData.password} onChange={handleChange} required />
                        {errors.password && <span className="text-red-500 dark:text-red-400 text-xs mt-1 block">{errors.password}</span>}
                    </div>
                    {!isLogin && (
                        <div>
                            <label className="block text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1.5">Confirm Password</label>
                            <input type="password" name="confirmPassword" className={inputClass('confirmPassword')} value={formData.confirmPassword} onChange={handleChange} required />
                            {errors.confirmPassword && <span className="text-red-500 dark:text-red-400 text-xs mt-1 block">{errors.confirmPassword}</span>}
                        </div>
                    )}
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm sm:text-base hover:opacity-90 transition-all duration-200 border-none cursor-pointer active:scale-[0.98]">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-slate-500 dark:text-gray-400 text-center">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button type="button" onClick={toggleMode} className="bg-transparent border-none text-purple-600 dark:text-purple-400 cursor-pointer underline text-sm p-0 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
