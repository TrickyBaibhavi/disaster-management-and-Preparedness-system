import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card card-glass fade-in">
                <div className="auth-header">
                    <div className="auth-logo">🛡️</div>
                    <h2>Welcome Back</h2>
                    <p className="text-muted">Sign in to DisasterEd to continue your training.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-sm" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer text-muted">
                    Don't have an account? <Link to="/signup" className="text-primary-color">Sign up</Link>
                </div>

                <div className="auth-demo-hint mt-lg">
                    <p className="text-muted" style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                        <strong>Demo Accounts:</strong><br />
                        admin@school.edu / Admin@123<br />
                        teacher@school.edu / Teacher@123
                    </p>
                </div>
            </div>
        </div>
    );
}
