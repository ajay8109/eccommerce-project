import React from 'react';

const Toast = ({ message, type, show }) => {
    return (
        <div className={`toast ${type} ${show ? 'show' : ''}`}>
            {message}
        </div>
    );
};

export default Toast;
