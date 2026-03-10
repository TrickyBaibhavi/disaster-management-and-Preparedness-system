import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DisastersPage from './pages/DisastersPage';
import DisasterDetailPage from './pages/DisasterDetailPage';
import DrillsPage from './pages/DrillsPage';
import CreateDrillPage from './pages/CreateDrillPage';
import EmergencyPage from './pages/EmergencyPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizDetailPage from './pages/QuizDetailPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminReportsPage from './pages/AdminReportsPage';

// Help Pages
import HowToUsePlatform from './pages/help/HowToUsePlatform';
import StudentGuide from './pages/help/StudentGuide';
import TeacherGuide from './pages/help/TeacherGuide';
import AdminGuide from './pages/help/AdminGuide';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="loading-center" style={{ minHeight: '100vh' }}>
      <div className="spinner"></div>
      <p className="text-muted">Loading...</p>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
  return <Navigate to="/student" replace />;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <DashboardRedirect />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected routes inside Layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* Student */}
        <Route path="/student" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />

        {/* Teacher */}
        <Route path="/teacher" element={<ProtectedRoute roles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><AdminReportsPage /></ProtectedRoute>} />

        {/* Shared */}
        <Route path="/disasters" element={<DisastersPage />} />
        <Route path="/disasters/:type" element={<DisasterDetailPage />} />
        <Route path="/drills" element={<DrillsPage />} />
        <Route path="/drills/create" element={<ProtectedRoute roles={['teacher', 'admin']}><CreateDrillPage /></ProtectedRoute>} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/:id" element={<QuizDetailPage />} />

        {/* Help Pages */}
        <Route path="/help" element={<HowToUsePlatform />} />
        <Route path="/help/student" element={<StudentGuide />} />
        <Route path="/help/teacher" element={<TeacherGuide />} />
        <Route path="/help/admin" element={<AdminGuide />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e2235',
              color: '#f0f2ff',
              border: '1px solid rgba(255,255,255,0.08)',
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
