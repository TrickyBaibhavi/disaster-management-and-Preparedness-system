import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function TeacherDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ upcomingDrills: 0, totalQuizzes: 0, totalParticipants: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [drillsRes, quizzesRes] = await Promise.all([
                    api.get('/drills'),
                    api.get('/quizzes')
                ]);

                const allDrills = drillsRes.data;
                const upcoming = allDrills.filter(d => d.status === 'upcoming');
                const participantsCount = allDrills.reduce((acc, curr) => acc + curr.participants.length, 0);

                setStats({
                    upcomingDrills: upcoming.length,
                    totalQuizzes: quizzesRes.data.length,
                    totalParticipants: participantsCount
                });
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
                <h1 className="mb-sm">Welcome back, {user?.name.split(' ')[0]} 👨‍🏫</h1>
                <p className="text-secondary" style={{ maxWidth: '600px' }}>
                    Manage your scheduled drills, create new quizzes, and track your students' preparedness performance.
                </p>
                <div className="mt-md flex gap-sm">
                    <Link to="/drills/create" className="btn btn-warning" style={{ background: 'var(--warning)', color: '#000' }}>
                        ➕ Schedule Drill
                    </Link>
                    <Link to="/quizzes" className="btn btn-secondary">
                        View Class Quizzes
                    </Link>
                </div>
            </div>

            <div className="grid grid-3 mb-xl">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}>🚨</div>
                    <div>
                        <div className="stat-value">{stats.upcomingDrills}</div>
                        <div className="stat-label">Active Drills</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(39, 174, 96, 0.2)', color: 'var(--pandemic)' }}>👥</div>
                    <div>
                        <div className="stat-value">{stats.totalParticipants}</div>
                        <div className="stat-label">Drill Participants</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--info)' }}>📝</div>
                    <div>
                        <div className="stat-value">{stats.totalQuizzes}</div>
                        <div className="stat-label">Quizzes Created</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
