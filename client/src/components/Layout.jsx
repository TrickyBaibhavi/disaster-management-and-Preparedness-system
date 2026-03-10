import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import OnboardingModal from './OnboardingModal';

export default function Layout() {
    return (
        <div className="page-layout">
            <Sidebar />
            <div className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ flex: 1 }}>
                    <Outlet />
                </div>
                <Footer />
            </div>
            <OnboardingModal />
        </div>
    );
}
