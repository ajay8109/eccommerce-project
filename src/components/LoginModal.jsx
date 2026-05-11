import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'user@shop.com' && password === 'password123') {
            onLogin({ email, firstName: 'John', lastName: 'Doe' });
            onClose();
            setEmail('');
            setPassword('');
        } else {
            alert('Invalid credentials. Use user@shop.com and password123');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay open" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Login to ShopZone</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                        Login
                    </button>
                </form>
                <p style={{marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-light)'}}>
                    Demo credentials: user@shop.com / password123
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
