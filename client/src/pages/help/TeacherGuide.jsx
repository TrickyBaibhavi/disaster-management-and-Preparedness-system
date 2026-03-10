import { Link } from 'react-router-dom';

export default function TeacherGuide() {
    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/help" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Help Center</Link>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-md">Teacher Guide 👨‍🏫</h1>
                <p className="text-secondary mb-xl">
                    As a teacher, you are responsible for preparing your students for emergencies by scheduling practical drills and monitoring their understanding through quizzes.
                </p>

                <div className="flex flex-col gap-lg">
                    <section>
                        <h3 className="mb-sm text-primary-color">1. How to create and schedule drills</h3>
                        <p className="text-secondary mb-sm">To plan an emergency simulation for your class or school:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Navigate to the <strong>"Scheduled Drills"</strong> page.</li>
                            <li>Click the <strong>"➕ Schedule Drill"</strong> button at the top right.</li>
                            <li>Fill out the form, selecting the disaster type, Date & Time, Assembly Point, and step-by-step instructions.</li>
                            <li>Click <strong>"Schedule Drill"</strong> to notify students.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">2. How to monitor student participation</h3>
                        <p className="text-secondary mb-sm">To see who has acknowledged the drill instructions:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>On the <strong>"Scheduled Drills"</strong> page, locate your scheduled drill card.</li>
                            <li>You can see the total number of participants listed at the bottom of the card.</li>
                            <li>(Note: Detailed participant manifests will be available in future updates).</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">3. How to review quiz results</h3>
                        <p className="text-secondary mb-sm">To gauge knowledge retention across your student base:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Navigate to your <strong>Teacher Dashboard</strong>.</li>
                            <li>While you can see total quiz metrics, you can click <strong>"View Class Quizzes"</strong>.</li>
                            <li>Full analytics on Pass/Fail ratios are available to Administrators via the Admin Panel, but you can monitor total completions here.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
