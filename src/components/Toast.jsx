import React from 'react';

const Toast = ({ message, type, show }) => {
    return (
        <div className={`fixed top-[max(1.25rem,env(safe-area-inset-top,0px))] left-4 right-4 sm:left-auto sm:right-5 sm:max-w-md z-[9999] px-4 sm:px-5 py-3 rounded-xl font-semibold text-sm shadow-lg text-center sm:text-left transition-all duration-300 ${
            show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${
            type === 'error' 
                ? 'bg-red-500 text-white shadow-red-500/30' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/30'
        }`}>
            {message}
        </div>
    );
};

export default Toast;
