import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DrillsPage() {
    const { user } = useAuth();
    const [drills, setDrills] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDrills = async () => {
        try {
            const res = await api.get('/drills');
            setDrills(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load drills');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrills();
    }, []);

    const handleJoin = async (drillId) => {
        try {
            await api.post(`/drills/${drillId}/join`);
            toast.success('Successfully joined drill!');
            fetchDrills(); // Refresh
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to join drill');
        }
    };

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="section-header">
                <div>
                    <h1 className="mb-sm">Disaster Drills 📋</h1>
                    <p className="text-secondary">View upcoming safety drills and participate in emergency scenarios.</p>
                </div>
                {(user?.role === 'teacher' || user?.role === 'admin') && (
                    <Link to="/drills/create" className="btn btn-primary">➕ Schedule Drill</Link>
                )}
            </div>

            <div className="grid grid-2 mt-lg">
                {drills.length === 0 ? (
                    <div className="col-span-2 empty-state card">
                        <div className="empty-state-icon text-muted">📭</div>
                        <h3 className="mb-sm">No scheduled drills</h3>
                        <p className="text-secondary">There are currently no upcoming or ongoing drills.</p>
                    </div>
                ) : (
                    drills.map((drill) => {
                        const isParticipant = drill.participants.some(p => p.user._id === user?._id || p.user === user?._id);
                        const drillDate = new Date(drill.scheduledDate);
                        const isPast = drillDate < new Date();

                        return (
                            <div className="card" key={drill._id}>
                                <div className="flex justify-between items-start mb-sm">
                                    <h3 className="text-primary-color">{drill.title}</h3>
                                    <span className={`badge badge-${drill.status === 'upcoming' ? 'warning' : drill.status === 'ongoing' ? 'danger' : 'success'}`}>
                                        {drill.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="text-secondary mb-md" style={{ fontSize: '0.9rem' }}>
                                    <p className="mb-sm"><strong>Type:</strong> {drill.disasterType.charAt(0).toUpperCase() + drill.disasterType.slice(1)} Emergency</p>
                                    <p className="mb-sm"><strong>Scheduled:</strong> {drillDate.toLocaleString()}</p>
                                    <p><strong>Created by:</strong> {drill.createdBy?.name || 'Admin'}</p>
                                </div>

                                <div className="bg-surface p-sm mb-md rounded" style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--border)' }}>
                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{drill.description}</p>
                                </div>

                                <div className="flex justify-between items-center mt-md">
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        👥 {drill.participants.length} Participant(s)
                                    </span>

                                    {user?.role === 'student' && drill.status === 'upcoming' && (
                                        <button
                                            className={`btn ${isParticipant ? 'btn-success' : 'btn-primary'} btn-sm`}
                                            onClick={() => !isParticipant && handleJoin(drill._id)}
                                            disabled={isParticipant || isPast}
                                        >
                                            {isParticipant ? '✓ Joined' : 'Join Drill'}
                                        </button>
                                    )}
                                    {user?.role !== 'student' && (
                                        <button className="btn btn-secondary btn-sm" disabled>Manage Drill (Coming Soon)</button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
