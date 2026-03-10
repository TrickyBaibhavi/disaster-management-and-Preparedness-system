import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function DisasterDetailPage() {
    const { type } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        setLoading(true);
        api.get(`/disasters/${type}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [type]);

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;
    if (!data) return <div className="page-container"><div className="empty-state"><h3>Disaster content not found</h3><Link to="/disasters" className="btn btn-primary mt-md">Back to Education</Link></div></div>;

    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/disasters" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Education Module</Link>
            </div>

            <div className="card mb-lg" style={{ borderTop: `4px solid ${data.color}` }}>
                <div className="flex items-center gap-md">
                    <div style={{ fontSize: '3rem' }}>{data.icon}</div>
                    <div>
                        <h1 style={{ color: data.color }}>{data.title}</h1>
                        <span className={`badge badge-${data.severity === 'critical' ? 'danger' : 'warning'} mt-sm`}>
                            SEVERITY: {data.severity.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="tabs mb-md" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview & Causes</button>
                <button className={`tab-btn ${activeTab === 'before' ? 'active' : ''}`} onClick={() => setActiveTab('before')}>Before / Prep</button>
                <button className={`tab-btn ${activeTab === 'during' ? 'active' : ''}`} onClick={() => setActiveTab('during')}>During</button>
                <button className={`tab-btn ${activeTab === 'after' ? 'active' : ''}`} onClick={() => setActiveTab('after')}>Aftermath</button>
                <button className={`tab-btn ${activeTab === 'kit' ? 'active' : ''}`} onClick={() => setActiveTab('kit')}>Emergency Kit</button>
            </div>

            <div className="card fade-in">
                {activeTab === 'overview' && (
                    <div className="grid grid-2 gap-xl">
                        <div>
                            <h3 className="mb-md">What is a {data.title}?</h3>
                            <p className="text-secondary mb-lg" style={{ lineHeight: 1.8 }}>{data.description}</p>

                            <h3 className="mb-md mt-xl">General Safety Measures</h3>
                            <ul className="flex flex-col gap-sm">
                                {data.safetyMeasures.map((measure, i) => (
                                    <li key={i} className="flex gap-sm items-center bg-surface p-sm rounded" style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                                        <span style={{ color: data.color }}>✅</span> {measure}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="card-glass h-full">
                                <h3 className="mb-md">Common Causes</h3>
                                <ul className="flex flex-col gap-md text-secondary" style={{ paddingLeft: '20px' }}>
                                    {data.causes.map((cause, i) => (
                                        <li key={i} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>{cause}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Timeline Tabs */}
                {(activeTab === 'before' || activeTab === 'during' || activeTab === 'after') && (
                    <div>
                        <h3 className="mb-lg flex items-center gap-sm">
                            {activeTab === 'before' && <span style={{ color: 'var(--info)' }}>⏳ Phase 1: Preparation (Before)</span>}
                            {activeTab === 'during' && <span style={{ color: 'var(--danger)' }}>🚨 Phase 2: Action (During)</span>}
                            {activeTab === 'after' && <span style={{ color: 'var(--success)' }}>🩹 Phase 3: Recovery (After)</span>}
                        </h3>

                        <div className="grid grid-2">
                            <div className="flex flex-col gap-md">
                                {(activeTab === 'before' ? data.beforeDisaster :
                                    activeTab === 'during' ? data.duringDisaster :
                                        data.afterDisaster).map((step, i) => (
                                            <div key={i} className="flex gap-md" style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${activeTab === 'during' ? 'var(--danger)' : activeTab === 'before' ? 'var(--info)' : 'var(--success)'}` }}>
                                                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-muted)' }}>{i + 1}</div>
                                                <div className="text-primary">{step}</div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'kit' && (
                    <div>
                        <h3 className="mb-md">Recommended Emergency Kit</h3>
                        <p className="text-muted mb-lg">A properly stocked emergency kit for a {data.title.toLowerCase()} should include:</p>
                        <div className="grid grid-auto">
                            {data.emergencyKit.map((item, i) => (
                                <div key={i} className="card-glass flex items-center gap-md p-md">
                                    <span style={{ fontSize: '1.5rem' }}>🎒</span>
                                    <span className="font-medium text-secondary">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
