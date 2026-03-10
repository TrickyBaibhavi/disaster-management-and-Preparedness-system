import { Link } from 'react-router-dom';

export default function HowToUsePlatform() {
    return (
        <div className="page-container">
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-md">How to Use the DisasterEd Platform 📘</h1>
                <p className="text-secondary mb-lg">
                    Welcome to the Disaster Preparedness and Response Education Platform. This system is designed to equip you with the knowledge and tools needed to respond to emergencies effectively.
                    Please select the guide that matches your role to learn more about how to navigate and utilize the platform.
                </p>

                <div className="grid grid-3 gap-md">
                    <Link to="/help/student" className="btn btn-secondary flex-col items-center p-lg" style={{ height: 'auto', gap: '12px' }}>
                        <span style={{ fontSize: '2rem' }}>👨‍🎓</span>
                        <strong>Student Guide</strong>
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>Learn how to study modules and take quizzes.</span>
                    </Link>

                    <Link to="/help/teacher" className="btn btn-secondary flex-col items-center p-lg" style={{ height: 'auto', gap: '12px' }}>
                        <span style={{ fontSize: '2rem' }}>👨‍🏫</span>
                        <strong>Teacher Guide</strong>
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>Learn how to schedule drills and track progress.</span>
                    </Link>

                    <Link to="/help/admin" className="btn btn-secondary flex-col items-center p-lg" style={{ height: 'auto', gap: '12px' }}>
                        <span style={{ fontSize: '2rem' }}>⚙️</span>
                        <strong>Admin Guide</strong>
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>Learn how to manage users and view analytics.</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
