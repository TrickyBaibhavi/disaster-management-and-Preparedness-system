import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function DisastersPage() {
    const [disasters, setDisasters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/disasters')
            .then(res => setDisasters(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="page-hero">
                <h1 className="mb-sm">Disaster Education Module 🌍</h1>
                <p className="text-secondary" style={{ maxWidth: '600px' }}>
                    Learn about the causes, safety measures, and emergency protocols for different types of natural and man-made disasters. Your preparation saves lives.
                </p>
            </div>

            <div className="grid grid-3 mt-xl">
                {disasters.map(d => (
                    <Link to={`/disasters/${d.type}`} className="card" style={{ textDecoration: 'none' }} key={d._id}>
                        <div className="flex items-center gap-sm mb-md">
                            <div
                                style={{
                                    background: `color-mix(in srgb, ${d.color} 20%, transparent)`,
                                    width: '48px', height: '48px',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}
                            >
                                {d.icon}
                            </div>
                            <h3 style={{ color: d.color }}>{d.title}</h3>
                        </div>
                        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)', minHeight: '60px' }}>
                            {d.description.length > 120 ? d.description.substring(0, 120) + '...' : d.description}
                        </p>
                        <div className="flex justify-between items-center border-t border-light pt-sm" style={{ borderTop: '1px solid var(--border)' }}>
                            <span className={`badge badge-${d.severity === 'critical' ? 'danger' : d.severity === 'high' ? 'warning' : 'primary'}`}>
                                {d.severity.toUpperCase()} RISK
                            </span>
                            <span className="text-primary-color" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Start Learning →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
