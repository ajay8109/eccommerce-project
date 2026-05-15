import { useState } from 'react';

const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for the field being changed
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0ovzDXWahSESEX0AJ1nPyzFTcJzsUl8IRvLAtg_mH4N2f0I5MS1Rop_MCf5i8tPd7-w/exec";

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Scripts often require no-cors for cross-domain POST if not specifically configured
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Since mode is 'no-cors', we can't reliably check response.ok or response.json()
            // However, the browser will still send the data.
            // If the user wants to read the response, they need to configure CORS on the GAS side.
            // But for standard GAS Web Apps, 'no-cors' is the safest bet to ensure the request is sent.
            
            // If we assume success if no error was thrown during fetch
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setSubmitStatus(null);
    };

    return {
        formData,
        errors,
        isSubmitting,
        submitStatus,
        handleChange,
        handleSubmit,
        resetForm
    };
};

export default useContactForm;
