import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import api from '../services/api';

export default function AdminReportsPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/reports/quizzes')
            .then(res => setQuizzes(res.data))
            .catch(err => toast.error('Failed to load reports'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    // Process data for charts
    const passFailData = [
        { name: 'Passed', count: quizzes.filter(q => q.passed).length, fill: 'var(--success)' },
        { name: 'Failed', count: quizzes.filter(q => !q.passed).length, fill: 'var(--danger)' }
    ];

    // Group by disaster type
    const groupedData = quizzes.reduce((acc, curr) => {
        const type = curr.quiz?.disasterType || 'general';
        if (!acc[type]) acc[type] = { name: type, attempts: 0, avgScore: 0, totalPerc: 0 };
        acc[type].attempts += 1;
        acc[type].totalPerc += curr.percentage;
        return acc;
    }, {});

    const barData = Object.values(groupedData).map(d => ({
        name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
        avgScore: Math.round(d.totalPerc / d.attempts),
        attempts: d.attempts
    }));

    const chartTheme = {
        background: 'transparent',
        textColor: 'var(--text-secondary)',
        gridColor: 'var(--border-light)',
        tooltipBg: 'var(--bg-card)',
    };

    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/admin" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Dashboard</Link>
            </div>

            <div className="section-header mb-lg">
                <div>
                    <h1 className="mb-sm">Analytics & Reports 📊</h1>
                    <p className="text-secondary">System-wide performance metrics, drill participation, and quiz results.</p>
                </div>
                <button className="btn btn-secondary">⬇️ Export CSV</button>
            </div>

            <div className="grid grid-2 mb-xl">
                <div className="card h-full">
                    <h3 className="mb-lg">Average Scores by Disaster Type</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={chartTheme.textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke={chartTheme.textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.gridColor, borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Legend />
                                <Bar dataKey="avgScore" name="Avg Score (%)" fill="var(--primary-light)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card h-full">
                    <h3 className="mb-lg">Platform Pass/Fail Ratio</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <BarChart data={passFailData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={chartTheme.textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke={chartTheme.textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: chartTheme.tooltipBg, borderColor: chartTheme.gridColor, borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="count" name="Total Submissions" radius={[4, 4, 0, 0]}>
                                    {passFailData.map((entry, index) => (
                                        <cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="mb-md">Recent Submissions Log</h3>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Quiz Topic</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.slice(0, 10).map(s => (
                                <tr key={s._id}>
                                    <td style={{ fontWeight: 500 }}>{s.student?.name || 'Unknown'}</td>
                                    <td>{s.quiz?.title || 'Deleted Quiz'}</td>
                                    <td className="font-heading font-bold">{s.percentage}%</td>
                                    <td>
                                        <span className={`badge badge-${s.passed ? 'success' : 'danger'}`}>
                                            {s.passed ? 'PASS' : 'FAIL'}
                                        </span>
                                    </td>
                                    <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                                        {new Date(s.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {quizzes.length === 0 && (
                        <div className="p-lg text-center text-muted">No quiz data available yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
