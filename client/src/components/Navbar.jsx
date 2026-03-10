import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const getRoleColor = (role) => {
        if (role === 'admin') return 'var(--danger)';
        if (role === 'teacher') return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="brand-icon">🛡️</span>
                <span className="brand-name">DisasterEd</span>
            </div>

            <div className="navbar-right">
                <Link to="/emergency" className="emergency-btn">
                    🚨 Emergency
                </Link>
                <div className="user-menu" onClick={() => setShowMenu(!showMenu)}>
                    <div className="user-avatar" style={{ background: getRoleColor(user?.role) }}>
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-role" style={{ color: getRoleColor(user?.role) }}>{user?.role}</span>
                    </div>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <strong>{user?.name}</strong>
                                <small>{user?.email}</small>
                            </div>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item danger" onClick={logout}>
                                🚪 Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
