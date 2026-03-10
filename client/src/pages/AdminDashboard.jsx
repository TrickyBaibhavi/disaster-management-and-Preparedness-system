import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to load stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading || !stats) return <div className="loading-center"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="page-hero">
                <h1 className="mb-sm">System Administration ⚙️</h1>
                <p className="text-secondary" style={{ maxWidth: '600px' }}>
                    Overview of the DisasterEd platform. Monitor user accounts, coordinate system-wide drills, and generate compliance reports.
                </p>
            </div>

            <div className="grid grid-4 mb-xl">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(26, 86, 219, 0.2)', color: 'var(--primary-light)' }}>👥</div>
                    <div>
                        <div className="stat-value">{stats.users}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>👨‍🎓</div>
                    <div>
                        <div className="stat-value">{stats.students}</div>
                        <div className="stat-label">Students</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>👨‍🏫</div>
                    <div>
                        <div className="stat-value">{stats.teachers}</div>
                        <div className="stat-label">Teachers</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}>🚨</div>
                    <div>
                        <div className="stat-value">{stats.drills}</div>
                        <div className="stat-label">Total Drills</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-2 mt-lg">
                <div className="card">
                    <div className="section-header">
                        <h3 className="section-title">Quick Actions</h3>
                    </div>
                    <div className="flex flex-col gap-sm">
                        <Link to="/admin/users" className="btn btn-secondary justify-between w-full">
                            <span>Manage User Accounts</span> <span>→</span>
                        </Link>
                        <Link to="/drills/create" className="btn btn-secondary justify-between w-full">
                            <span>Schedule System Drill</span> <span>→</span>
                        </Link>
                        <Link to="/admin/reports" className="btn btn-secondary justify-between w-full">
                            <span>View Analytics & Reports</span> <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
