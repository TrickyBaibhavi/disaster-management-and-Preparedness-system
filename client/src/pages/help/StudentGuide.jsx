import { Link } from 'react-router-dom';

export default function StudentGuide() {
    return (
        <div className="page-container">
            <div className="mb-md">
                <Link to="/help" className="text-muted" style={{ fontSize: '0.9rem' }}>← Back to Help Center</Link>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="mb-md">Student Guide 👨‍🎓</h1>
                <p className="text-secondary mb-xl">
                    As a student, your primary goal is to educate yourself on disaster preparedness protocols, participate in scheduled drills, and test your knowledge through quizzes.
                </p>

                <div className="flex flex-col gap-lg">
                    <section>
                        <h3 className="mb-sm text-primary-color">1. How to access disaster learning modules</h3>
                        <p className="text-secondary mb-sm">To read up on different types of emergencies:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Click on <strong>"Disaster Education"</strong> in the sidebar.</li>
                            <li>Select a specific disaster (e.g., Earthquake, Fire) from the grid.</li>
                            <li>Navigate through the tabs ("Before", "During", "After") to learn the specific safety measures.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">2. How to participate in drills</h3>
                        <p className="text-secondary mb-sm">When your teacher schedules a drill, you need to acknowledge your participation:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Go to the <strong>"Scheduled Drills"</strong> page from the sidebar.</li>
                            <li>Find an upcoming drill and review the instructions and assembly point.</li>
                            <li>Click the <strong>"Join Drill"</strong> button to register your participation for your teacher to see.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">3. How to take quizzes</h3>
                        <p className="text-secondary mb-sm">Test your knowledge to ensure you are ready:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Navigate to the <strong>"Quizzes"</strong> page.</li>
                            <li>Click <strong>"Take Quiz"</strong> on an available topic.</li>
                            <li>Answer the multiple-choice questions before the timer runs out.</li>
                            <li>Once submitted, you can review the correct answers and explanations immediately.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-sm text-primary-color">4. How to access emergency response guide</h3>
                        <p className="text-secondary mb-sm">In case of a real emergency or for quick reference:</p>
                        <ul className="text-secondary pl-xl" style={{ listStyleType: 'disc' }}>
                            <li>Click the red <strong>"Emergency"</strong> button in the top navigation bar, or select <strong>"Emergency Dashboard"</strong> from the sidebar.</li>
                            <li>Use the interactive map to locate assembly points, review first aid procedures, or access direct dial links for emergency services.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
