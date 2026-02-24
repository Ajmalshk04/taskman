import { useState } from 'react';
import signup from '../assets/5. Signup/Signup_Shape.svg';
import styles from '../styles/CTA.module.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CTA = () => {
    const ref = useScrollAnimation();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const validateEmail = (email: string): string => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validateName = (name: string): string => {
        if (!name) return 'Name is required';
        if (name.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);

        if (nameError || emailError) {
            setErrors({ name: nameError, email: emailError });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setMessage(data.message);
                setFormData({ name: '', email: '' });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setErrors({ name: '', email: data.error || 'Signup failed' });
            }
        } catch (error) {
            setErrors({ name: '', email: 'Failed to connect to server. Make sure it\'s running on port 3001.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.section} ref={ref}>
            <div className={`${styles.shapeContainer} cta-shape`}>
                <img src={signup} alt="signup" className={styles.shapeImg} />
            </div>

            <div className={styles.contentContainer}>
                <h2 className={`${styles.title} cta-title`}>
                    Get better work done
                </h2>

                <p className={`${styles.description} cta-description`}>
                    See why millions of people across 195 countries use TaskMan.
                </p>

                {success && (
                    <div className={styles.successMessage}>
                        ✓ {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={`${styles.inputContainer} cta-form`}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        />
                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Try for free'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CTA;
