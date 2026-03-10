import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="footer-logo">🛡️ DisasterEd</div>
                    <p className="text-muted">Empowering schools and colleges with critical disaster preparedness training.</p>
                </div>

                <div className="footer-links">
                    <h4>Platform Guide</h4>
                    <ul>
                        <li><Link to="/help">Help Center</Link></li>
                        <li><Link to="/help/student">Student Guide</Link></li>
                        <li><Link to="/help/teacher">Teacher Guide</Link></li>
                        <li><Link to="/help/admin">Admin Guide</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Resources</h4>
                    <ul>
                        <li><Link to="/disasters">Disaster Modules</Link></li>
                        <li><Link to="/emergency">Emergency Response</Link></li>
                        <li><Link to="/drills">Scheduled Drills</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="text-muted">&copy; {new Date().getFullYear()} Disaster Preparedness Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}
