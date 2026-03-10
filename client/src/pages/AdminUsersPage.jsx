import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminUsersPage() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        api.get('/admin/users')
            .then(res => setUsers(res.data))
            .catch(err => toast.error('Failed to load users'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const userToUpdate = users.find(u => u._id === userId);
            await api.put(`/admin/users/${userId}`, { ...userToUpdate, role: newRole });
            toast.success('User role updated');
            fetchUsers();
        } catch (err) {
            toast.error('Failed to update role');
        }
    };

    const handleDelete = async (userId) => {
        if (userId === currentUser._id) {
            toast.error('You cannot delete your own account');
            return;
        }
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            await api.delete(`/admin/users/${userId}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete user');
        }
    };

    const getRoleBadgeClass = (role) => {
        if (role === 'admin') return 'badge-danger';
        if (role === 'teacher') return 'badge-warning';
        return 'badge-success';
    };

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/admin" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Dashboard</Link>
            </div>

            <div className="section-header mb-lg">
                <div>
                    <h1 className="mb-sm">User Management 👥</h1>
                    <p className="text-secondary">Manage platform access, roles, and school assignments.</p>
                </div>
                <button className="btn btn-primary" disabled>➕ Add User</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Institution</th>
                            <th>Role</th>
                            <th>Joined Date</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td style={{ fontWeight: 500 }}>{u.name}</td>
                                <td className="text-secondary">{u.email}</td>
                                <td className="text-secondary">{u.institution || '-'}</td>
                                <td>
                                    <select
                                        className={`badge ${getRoleBadgeClass(u.role)}`}
                                        style={{ border: 'none', appearance: 'none', paddingRight: '20px', cursor: 'pointer', outline: 'none' }}
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                        disabled={u._id === currentUser._id}
                                    >
                                        <option value="student">STUDENT</option>
                                        <option value="teacher">TEACHER</option>
                                        <option value="admin">ADMIN</option>
                                    </select>
                                </td>
                                <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        style={{ background: 'transparent', border: 'none', color: 'var(--danger)', padding: '4px 8px' }}
                                        onClick={() => handleDelete(u._id)}
                                        disabled={u._id === currentUser._id}
                                        title={u._id === currentUser._id ? "Cannot delete yourself" : "Delete User"}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
