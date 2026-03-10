import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function CreateDrillPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        disasterType: 'earthquake',
        description: '',
        scheduledDate: '',
        instructions: '',
        assemblyPoint: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Split instructions by newlines
            const payload = {
                ...formData,
                instructions: formData.instructions.split('\n').filter(i => i.trim() !== '')
            };

            await api.post('/drills', payload);
            toast.success('Drill scheduled successfully');
            navigate('/drills');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create drill');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/drills" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Drills</Link>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="mb-lg">Schedule New Drill 📅</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
                    <div className="grid grid-2 gap-md">
                        <div className="form-group">
                            <label className="form-label">Drill Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                placeholder="e.g. Q3 Fire Evacuation Procedure"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Disaster Type</label>
                            <select name="disasterType" className="form-select" value={formData.disasterType} onChange={handleChange}>
                                <option value="earthquake">Earthquake</option>
                                <option value="fire">Fire</option>
                                <option value="flood">Flood</option>
                                <option value="cyclone">Cyclone</option>
                                <option value="pandemic">Pandemic / Outbreak</option>
                                <option value="chemical">Chemical / Hazmat</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description / Scenario</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Describe the simulated scenario for this emergency drill..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="grid grid-2 gap-md">
                        <div className="form-group">
                            <label className="form-label">Scheduled Date & Time</label>
                            <input
                                type="datetime-local"
                                name="scheduledDate"
                                className="form-input"
                                value={formData.scheduledDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Assembly Point Location</label>
                            <input
                                type="text"
                                name="assemblyPoint"
                                className="form-input"
                                placeholder="e.g. Main Playground Field"
                                value={formData.assemblyPoint}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Step-by-Step Instructions (One per line)</label>
                        <textarea
                            name="instructions"
                            className="form-textarea"
                            placeholder="1. Hear the alarm&#10;2. Leave belongings behind&#10;3. Follow exit route to assembly point"
                            value={formData.instructions}
                            onChange={handleChange}
                            rows="5"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-md pt-lg" style={{ borderTop: '1px solid var(--border)' }}>
                        <Link to="/drills" className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Scheduling...' : 'Schedule Drill'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
