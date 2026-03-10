import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        institution: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signup(formData);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card card-glass fade-in">
                <div className="auth-header">
                    <div className="auth-logo">🛡️</div>
                    <h2>Create Account</h2>
                    <p className="text-muted">Join DisasterEd and start your safety training.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group flex-row gap-sm">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={formData.role === 'student'}
                                onChange={handleChange}
                            />
                            Student
                        </label>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="role"
                                value="teacher"
                                checked={formData.role === 'teacher'}
                                onChange={handleChange}
                            />
                            Teacher
                        </label>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={formData.role === 'admin'}
                                onChange={handleChange}
                            />
                            Admin
                        </label>
                    </div>

                    <div className="form-group mt-sm">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password (min 6 chars)"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Institution / School (Optional)</label>
                        <input
                            type="text"
                            name="institution"
                            className="form-input"
                            value={formData.institution}
                            onChange={handleChange}
                            placeholder="Enter your school name"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-sm" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer text-muted">
                    Already have an account? <Link to="/login" className="text-primary-color">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
