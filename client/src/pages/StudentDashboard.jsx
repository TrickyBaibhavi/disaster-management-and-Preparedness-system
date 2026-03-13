import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ upcomingDrills: 0, completedQuizzes: 0, avgScore: 0 });
    const [recentDrills, setRecentDrills] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/dashboard/student');
                const { stats: dashboardStats, upcomingDrills } = res.data;

                setStats({
                    upcomingDrills: dashboardStats.upcomingDrillsCount,
                    completedQuizzes: dashboardStats.completedQuizzes,
                    avgScore: dashboardStats.averageScore
                });
                setRecentDrills(upcomingDrills.slice(0, 3));
            } catch (err) {
                console.error('Failed to load dashboard', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="page-hero">
                <h1 className="mb-sm">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
                <p className="text-secondary" style={{ maxWidth: '600px' }}>
                    Your training progress looks good. Complete quizzes and participate in scheduled drills to stay prepared for any emergency.
                </p>
            </div>

            <div className="grid grid-3 mb-xl">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>📋</div>
                    <div>
                        <div className="stat-value">{stats.upcomingDrills}</div>
                        <div className="stat-label">Upcoming Drills</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>✅</div>
                    <div>
                        <div className="stat-value">{stats.completedQuizzes}</div>
                        <div className="stat-label">Completed Quizzes</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--info)' }}>🎯</div>
                    <div>
                        <div className="stat-value">{stats.avgScore}%</div>
                        <div className="stat-label">Average Score</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-2 mt-md">
                <div className="card">
                    <div className="section-header">
                        <h3 className="section-title">Upcoming Drills</h3>
                        <Link to="/drills" className="btn btn-secondary btn-sm">View All</Link>
                    </div>
                    {recentDrills.length > 0 ? (
                        <div className="flex flex-col gap-md">
                            {recentDrills.map(drill => (
                                <div key={drill._id} className="p-sm" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                                    <div className="flex justify-between items-center mb-sm">
                                        <strong>{drill.title}</strong>
                                        <span className="badge badge-warning">{new Date(drill.scheduledDate).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{drill.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state p-md text-muted">No upcoming drills scheduled.</div>
                    )}
                </div>

                <div className="card">
                    <div className="section-header">
                        <h3 className="section-title">Quick Study Guides</h3>
                        <Link to="/disasters" className="btn btn-secondary btn-sm">Explore</Link>
                    </div>
                    <div className="grid grid-2">
                        <Link to="/disasters/earthquake" className="p-sm flex items-center gap-sm" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                            <span style={{ fontSize: '1.5rem' }}>🌍</span> Earthquake Safety
                        </Link>
                        <Link to="/disasters/fire" className="p-sm flex items-center gap-sm" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                            <span style={{ fontSize: '1.5rem' }}>🔥</span> Fire Evacuation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
