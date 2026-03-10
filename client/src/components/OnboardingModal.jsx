import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './OnboardingModal.css';

export default function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Only show if user is logged in and hasn't seen the onboarding yet
        if (user) {
            const hasSeen = localStorage.getItem(`onboarding_${user._id}`);
            if (!hasSeen) {
                // slight delay for better UX
                const timer = setTimeout(() => setIsOpen(true), 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [user]);

    const handleClose = () => {
        localStorage.setItem(`onboarding_${user._id}`, 'true');
        setIsOpen(false);
    };

    const handleGuideRedirection = () => {
        handleClose();
        navigate('/help');
    };

    const handleLinkRedirection = (path) => {
        handleClose();
        navigate(path);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content card fade-in">
                <button className="modal-close" onClick={handleClose}>&times;</button>
                <div className="modal-header">
                    <span style={{ fontSize: '3rem' }}>👋</span>
                    <h2 className="mt-sm">Welcome to DisasterEd!</h2>
                    <p className="text-secondary">The Disaster Preparedness Education Platform</p>
                </div>

                <div className="modal-body mt-md">
                    <p className="mb-md">We're glad you're here to learn about disaster preparedness and response. Here are some quick links to get you started:</p>

                    <div className="quick-links grid grid-2 gap-sm mb-lg">
                        <button className="btn btn-secondary justify-start" onClick={() => handleLinkRedirection('/disasters')}>
                            🌍 Learn about disasters
                        </button>
                        <button className="btn btn-secondary justify-start" onClick={() => handleLinkRedirection('/drills')}>
                            🏃 Join drills
                        </button>
                        <button className="btn btn-secondary justify-start" onClick={() => handleLinkRedirection('/quizzes')}>
                            📝 Take quizzes
                        </button>
                        <button className="btn btn-secondary justify-start text-danger border-danger" onClick={() => handleLinkRedirection('/emergency')}>
                            🚨 Access emergency guide
                        </button>
                    </div>
                </div>

                <div className="modal-footer flex flex-col gap-sm">
                    <button className="btn btn-primary btn-block justify-center" onClick={handleGuideRedirection}>
                        View Full Guide
                    </button>
                    <button className="btn btn-text text-muted btn-block justify-center" onClick={handleClose}>
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
}
