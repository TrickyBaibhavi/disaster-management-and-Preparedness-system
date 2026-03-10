import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function QuizzesPage() {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/quizzes')
            .then(res => setQuizzes(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="section-header">
                <div>
                    <h1 className="mb-sm">Disaster Preparedness Quizzes 📝</h1>
                    <p className="text-secondary">Assess your knowledge on emergency response protocols.</p>
                </div>
                {(user?.role === 'teacher' || user?.role === 'admin') && (
                    <button className="btn btn-primary" disabled>➕ Create Quiz (Coming Soon)</button>
                )}
            </div>

            <div className="grid grid-3 mt-lg">
                {quizzes.length === 0 ? (
                    <div className="col-span-3 empty-state card">
                        <div className="empty-state-icon text-muted">📭</div>
                        <h3 className="mb-sm">No quizzes available</h3>
                        <p className="text-secondary">Your teachers will assign quizzes soon.</p>
                    </div>
                ) : (
                    quizzes.map(quiz => (
                        <div className="card flex flex-col" key={quiz._id}>
                            <div className="mb-md">
                                <div className="flex justify-between items-start mb-sm">
                                    <h3 className="text-primary-color" style={{ fontSize: '1.1rem' }}>{quiz.title}</h3>
                                    <span className="badge badge-info">{quiz.timeLimit} mins</span>
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                    <strong>Type:</strong> <span style={{ textTransform: 'capitalize' }}>{quiz.disasterType}</span>
                                </div>
                                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{quiz.description}</p>
                            </div>

                            <div className="mt-auto pt-md" style={{ borderTop: '1px solid var(--border)' }}>
                                <div className="flex justify-between items-center mb-md">
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        ❓ {quiz.questions.length} Questions
                                    </span>
                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        By {quiz.createdBy?.name || 'Instructor'}
                                    </span>
                                </div>
                                {user?.role === 'student' ? (
                                    <Link to={`/quizzes/${quiz._id}`} className="btn btn-primary w-full justify-center">Take Quiz</Link>
                                ) : (
                                    <div className="flex gap-sm">
                                        <button className="btn btn-secondary w-full justify-center" disabled>View Submissions</button>
                                        <button className="btn btn-danger" style={{ padding: '8px 12px' }}>🗑️</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
