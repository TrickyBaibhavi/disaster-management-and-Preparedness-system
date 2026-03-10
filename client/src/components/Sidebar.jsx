import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const navItems = {
    student: [
        { icon: '🏠', label: 'Dashboard', path: '/student' },
        { icon: '🌍', label: 'Disaster Education', path: '/disasters' },
        { icon: '📋', label: 'Drills', path: '/drills' },
        { icon: '📝', label: 'Quizzes', path: '/quizzes' },
        { icon: '🚨', label: 'Emergency Guide', path: '/emergency' },
    ],
    teacher: [
        { icon: '🏠', label: 'Dashboard', path: '/teacher' },
        { icon: '🌍', label: 'Disaster Content', path: '/disasters' },
        { icon: '📋', label: 'Manage Drills', path: '/drills' },
        { icon: '➕', label: 'Create Drill', path: '/drills/create' },
        { icon: '📝', label: 'Quizzes', path: '/quizzes' },
        { icon: '🚨', label: 'Emergency Guide', path: '/emergency' },
    ],
    admin: [
        { icon: '🏠', label: 'Dashboard', path: '/admin' },
        { icon: '👥', label: 'Manage Users', path: '/admin/users' },
        { icon: '📊', label: 'Reports', path: '/admin/reports' },
        { icon: '🌍', label: 'Disaster Content', path: '/disasters' },
        { icon: '📋', label: 'All Drills', path: '/drills' },
        { icon: '➕', label: 'Create Drill', path: '/drills/create' },
        { icon: '📝', label: 'Quizzes', path: '/quizzes' },
        { icon: '🚨', label: 'Emergency Guide', path: '/emergency' },
    ],
};

const disasterTypes = [
    { icon: '🌍', label: 'Earthquake', path: '/disasters/earthquake' },
    { icon: '🌊', label: 'Flood', path: '/disasters/flood' },
    { icon: '🔥', label: 'Fire', path: '/disasters/fire' },
    { icon: '🌀', label: 'Cyclone', path: '/disasters/cyclone' },
    { icon: '🦠', label: 'Pandemic', path: '/disasters/pandemic' },
    { icon: '☢️', label: 'Chemical', path: '/disasters/chemical' },
];

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const items = navItems[user?.role] || [];

    const getRoleColor = (role) => {
        if (role === 'admin') return 'var(--danger)';
        if (role === 'teacher') return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <>
            <button className="sidebar-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
            <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <span className="brand-shield">🛡️</span>
                        <div>
                            <div className="brand-title">DisasterEd</div>
                            <div className="brand-subtitle">Safety Learning Platform</div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-user">
                    <div className="sidebar-avatar" style={{ background: getRoleColor(user?.role) }}>
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">{user?.name}</div>
                        <div className="sidebar-user-role" style={{ color: getRoleColor(user?.role) }}>
                            {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                        </div>
                        {user?.institution && <div className="sidebar-institution">{user.institution}</div>}
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-label">Menu</div>
                    {items.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </NavLink>
                    ))}

                    <div className="nav-section-label mt-md">Quick Disasters</div>
                    <div className="quick-disasters">
                        {disasterTypes.map((d) => (
                            <NavLink key={d.path} to={d.path} className={({ isActive }) => `disaster-chip ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                                {d.icon} {d.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-logout" onClick={logout}>
                        🚪 Sign Out
                    </button>
                </div>
            </aside>
            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
        </>
    );
}
