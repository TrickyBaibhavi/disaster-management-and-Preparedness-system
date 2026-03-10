import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function QuizDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        api.get(`/quizzes/${id}`)
            .then(res => {
                setQuiz(res.data);
                setAnswers(new Array(res.data.questions.length).fill(null));
                setTimeLeft(res.data.timeLimit * 60);
            })
            .catch(err => {
                console.error(err);
                toast.error('Quiz not found');
                navigate('/quizzes');
            })
            .finally(() => setLoading(false));
    }, [id, navigate]);

    useEffect(() => {
        if (timeLeft > 0 && !result) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && quiz && !result) {
            handleSubmitQuiz();
        }
    }, [timeLeft, result, quiz]);

    const handleSelectOption = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQIndex] = index;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQIndex < quiz.questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQIndex > 0) {
            setCurrentQIndex(currentQIndex - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        setSubmitting(true);
        try {
            const res = await api.post(`/quizzes/${id}/submit`, {
                answers,
                timeTaken: (quiz.timeLimit * 60) - timeLeft
            });
            setResult(res.data);
            toast.success('Quiz submitted successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (result) {
        return (
            <div className="page-container">
                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
                        {result.passed ? '🎉' : '📚'}
                    </div>
                    <h2 className="mb-sm">Quiz Completed!</h2>
                    <div className="mb-lg">
                        <span className={`badge badge-${result.passed ? 'success' : 'danger'}`} style={{ fontSize: '1rem', padding: '8px 16px' }}>
                            Score: {result.score} / {quiz.questions.length} ({result.percentage}%)
                        </span>
                    </div>
                    <p className="text-secondary mb-xl" style={{ maxWidth: '400px', margin: '0 auto 32px auto' }}>
                        {result.passed
                            ? 'Great job! You have demonstrated a solid understanding of this emergency prep topic.'
                            : 'Keep studying! Review the disaster module and try again to improve your score.'}
                    </p>

                    <div className="text-left bg-surface p-lg rounded mb-xl">
                        <h3 className="mb-md border-b border-light pb-sm">Answer Review</h3>
                        {result.results.map((r, i) => (
                            <div key={i} className="mb-md pb-md" style={{ borderBottom: '1px solid var(--border)' }}>
                                <div className="flex gap-sm mb-sm">
                                    <span className={`badge ${r.isCorrect ? 'badge-success' : 'badge-danger'}`}>
                                        {r.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                    <strong>Q{i + 1}: {r.question}</strong>
                                </div>
                                {!r.isCorrect && (
                                    <div className="text-danger mb-sm" style={{ fontSize: '0.9rem' }}>
                                        You selected: {quiz.questions[i].options[r.selected] || 'No answer'}
                                    </div>
                                )}
                                <div className="text-success mb-sm" style={{ fontSize: '0.9rem' }}>
                                    Correct mapping: Option index {r.correct}
                                </div>
                                {r.explanation && (
                                    <div className="text-muted p-sm rounded" style={{ background: 'var(--bg-card)', fontSize: '0.85rem' }}>
                                        ℹ️ {r.explanation}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Link to="/quizzes" className="btn btn-primary">Return to Quizzes</Link>
                </div>
            </div>
        );
    }

    const currentQ = quiz.questions[currentQIndex];

    return (
        <div className="page-container">
            <div className="flex justify-between items-center mb-md">
                <Link to="/quizzes" className="text-muted" style={{ fontSize: '0.9rem' }}>← Exit Quiz</Link>
                <div className="flex items-center gap-md">
                    <span className="text-secondary font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                        Question {currentQIndex + 1} of {quiz.questions.length}
                    </span>
                    <div className="badge badge-warning" style={{ fontSize: '1rem' }}>
                        ⏳ {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="mb-sm text-primary-color">{quiz.title}</h2>
                <div className="mb-xl bg-surface rounded" style={{ height: '6px', overflow: 'hidden' }}>
                    <div
                        style={{ width: `${((currentQIndex + 1) / quiz.questions.length) * 100}%`, height: '100%', background: 'var(--primary-light)', transition: 'width 0.3s ease' }}
                    ></div>
                </div>

                <div className="mb-xl">
                    <h3 className="mb-lg" style={{ fontSize: '1.3rem', lineHeight: '1.5' }}>
                        {currentQIndex + 1}. {currentQ.question}
                    </h3>

                    <div className="flex flex-col gap-sm">
                        {currentQ.options.map((opt, i) => (
                            <label
                                key={i}
                                className={`p-md rounded border flex items-center gap-md cursor-pointer transition-all ${answers[currentQIndex] === i ? 'bg-primary-glow border-primary' : 'bg-surface border-light'}`}
                                style={{
                                    background: answers[currentQIndex] === i ? 'var(--primary-glow)' : 'var(--bg-surface)',
                                    border: `2px solid ${answers[currentQIndex] === i ? 'var(--primary-light)' : 'var(--border)'}`,
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                <input
                                    type="radio"
                                    name={`q${currentQIndex}`}
                                    checked={answers[currentQIndex] === i}
                                    onChange={() => handleSelectOption(i)}
                                    style={{ transform: 'scale(1.2)' }}
                                />
                                <span style={{ fontSize: '1.05rem', color: answers[currentQIndex] === i ? 'white' : 'var(--text-primary)' }}>{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between pt-lg" style={{ borderTop: '1px solid var(--border)' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrev}
                        disabled={currentQIndex === 0}
                    >
                        ← Previous
                    </button>

                    {currentQIndex === quiz.questions.length - 1 ? (
                        <button
                            className="btn btn-success"
                            onClick={handleSubmitQuiz}
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit Quiz ✓'}
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
