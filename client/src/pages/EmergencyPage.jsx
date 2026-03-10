import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';
import L from 'leaflet';

// Fix for default leaflet marker icon in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Assembly point icon
const assemblyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function EmergencyPage() {
    const [contacts, setContacts] = useState([]);
    const [firstAid, setFirstAid] = useState([]);
    const [evacSteps, setEvacSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/emergency/contacts'),
            api.get('/emergency/firstaid'),
            api.get('/emergency/evacuation')
        ])
            .then(([contactsRes, firstAidRes, evacRes]) => {
                setContacts(contactsRes.data);
                setFirstAid(firstAidRes.data);
                setEvacSteps(evacRes.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

    const schoolCenter = [28.6139, 77.2090]; // Demo coordinates
    const assemblyPoints = [
        { id: 1, pos: [28.6145, 77.2095], name: "Primary Assembly Point (Main Field)" },
        { id: 2, pos: [28.6130, 77.2080], name: "Secondary Assembly Point (North Gate)" }
    ];

    const getContactIcon = (cat) => {
        switch (cat) {
            case 'fire': return '🚒';
            case 'police': return '🚓';
            case 'medical': return '🚑';
            case 'disaster': return '🚁';
            case 'school': return '🏫';
            default: return '📞';
        }
    };

    return (
        <div className="page-container">
            <div className="section-header mb-xl">
                <div>
                    <h1 className="mb-sm text-danger flex items-center gap-sm">
                        <span className="pulse-icon" style={{ animation: 'pulseGlow 2s infinite' }}>🚨</span>
                        Emergency Response Dashboard
                    </h1>
                    <p className="text-secondary">Quick access to life-saving contacts, first-aid procedures, and evacuation maps.</p>
                </div>
            </div>

            <div className="grid grid-2 mb-xl">
                {/* Contacts column */}
                <div className="flex flex-col gap-lg">
                    <div className="card" style={{ borderTop: '4px solid var(--danger)' }}>
                        <h3 className="mb-md flex items-center gap-sm">📞 Emergency Contacts</h3>
                        <div className="grid grid-2 gap-sm">
                            {contacts.map(c => (
                                <div key={c._id || c.name} className="bg-surface p-sm rounded" style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex justify-between items-start mb-sm">
                                        <span style={{ fontSize: '1.5rem' }}>{getContactIcon(c.category)}</span>
                                        <a href={`tel:${c.number}`} className="btn btn-danger btn-sm" style={{ padding: '4px 10px', fontSize: '0.9rem' }}>Call</a>
                                    </div>
                                    <div className="font-heading" style={{ fontWeight: 700 }}>{c.name}</div>
                                    <div className="text-danger" style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '1px' }}>{c.number}</div>
                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>{c.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ borderTop: '4px solid var(--warning)' }}>
                        <h3 className="mb-md flex items-center gap-sm">🏃 Evacuation Plan</h3>
                        <div className="flex flex-col gap-sm">
                            {evacSteps.map(step => (
                                <div key={step.step} className="flex gap-md p-sm" style={{ borderBottom: '1px solid var(--border)' }}>
                                    <div className="text-warning font-heading" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{step.step}</div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{step.title}</div>
                                        <div className="text-secondary" style={{ fontSize: '0.85rem' }}>{step.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map & First Aid Column */}
                <div className="flex flex-col gap-lg">
                    <div className="card h-full" style={{ padding: 0, overflow: 'hidden', borderTop: '4px solid var(--info)' }}>
                        <div className="p-md" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                            <h3 className="flex items-center gap-sm">📍 Evacuation Assembly Points</h3>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Navigate to the nearest green marker during an emergency.</p>
                        </div>
                        <div style={{ height: '400px', width: '100%', background: '#252840' }}>
                            <MapContainer center={schoolCenter} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={schoolCenter}>
                                    <Popup><strong>School Main Building</strong><br />Evacuate from here.</Popup>
                                </Marker>
                                {assemblyPoints.map(ap => (
                                    <Marker key={ap.id} position={ap.pos} icon={assemblyIcon}>
                                        <Popup><strong>{ap.name}</strong><br />Safe zone.</Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>

                    <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
                        <h3 className="mb-md flex items-center gap-sm">🚑 First Aid Quick Guide</h3>
                        <div className="flex flex-col gap-sm">
                            {firstAid.map(guide => (
                                <details key={guide.id} style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                                    <summary className="font-medium flex items-center gap-sm" style={{ outline: 'none' }}>
                                        {guide.icon} <span>{guide.title}</span>
                                    </summary>
                                    <ul className="mt-sm pl-xl text-secondary" style={{ fontSize: '0.9rem', paddingLeft: '32px' }}>
                                        {guide.steps.map((step, i) => (
                                            <li key={i} className="mb-sm">{step}</li>
                                        ))}
                                    </ul>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
