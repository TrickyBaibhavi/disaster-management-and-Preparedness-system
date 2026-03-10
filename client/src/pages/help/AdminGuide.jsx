import { Link } from 'react-router-dom';

export default function AdminGuide() {
    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/help" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Help Center</Link>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-md">Admin Guide ⚙️</h1>
                <p className="text-secondary mb-xl">
                    As a system administrator, you oversee the entire platform, managing user roles, updating content protocols, and viewing high-level compliance analytics.
                </p>

                <div className="flex flex-col gap-lg">
                    <section>
                        <h3 className="mb-sm text-primary-color">1. How to manage users</h3>
                        <p className="text-secondary mb-sm">To update roles or remove accounts from the system:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Navigate to the <strong>Admin Dashboard</strong> and click <strong>"Manage User Accounts"</strong>.</li>
                            <li>To change a user's role (e.g., promote a student to a teacher), use the dropdown menu in the "Role" column.</li>
                            <li>To remove a user, click the trash can icon on the right side of their row.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">2. How to view analytics</h3>
                        <p className="text-secondary mb-sm">To generate compliance and performance reports:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Navigate to the <strong>Admin Dashboard</strong> and click <strong>"View Analytics & Reports"</strong>.</li>
                            <li>Here you can view charts detailing the Average Scores broken down by Disaster Type.</li>
                            <li>You can also view the total Platform Pass/Fail ratio across all users to determine if additional training is required.</li>
                            <li>A recent submission log is available at the bottom of the page for detailed auditing.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">3. How to manage disaster content (Advanced)</h3>
                        <p className="text-secondary mb-sm">Updating the source material for the platform:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Currently, disaster content and emergency assembly points are seeded via the backend database.</li>
                            <li>A future UI update will allow administrators to directly edit disaster text, upload new maps, and modify emergency contact phone numbers from the web interface.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
