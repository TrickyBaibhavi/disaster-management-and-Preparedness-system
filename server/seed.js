require('dotenv').config();
const mongoose = require('mongoose');
const Disaster = require('./models/Disaster');
const EmergencyContact = require('./models/EmergencyContact');
const User = require('./models/User');
const Quiz = require('./models/Quiz');

const disastersData = [
    {
        type: 'earthquake',
        title: 'Earthquake',
        icon: '🌍',
        color: '#e67e22',
        severity: 'critical',
        description:
            'An earthquake is a sudden, rapid shaking of the ground caused by the shifting of tectonic plates beneath the earth\'s surface. It is one of the most destructive natural disasters, capable of causing widespread damage to buildings, infrastructure, and loss of life.',
        causes: [
            'Movement of tectonic plates along fault lines',
            'Volcanic activity causing seismic events',
            'Human activities such as mining, reservoir-induced seismicity',
            'Collapse of underground caves',
            'Nuclear explosions',
        ],
        safetyMeasures: [
            'Identify safe spots in every room (under sturdy tables, against interior walls)',
            'Secure heavy furniture and appliances to walls',
            'Store emergency supplies including water, food, and first aid kit',
            'Learn how to shut off gas, water, and electricity',
            'Participate in earthquake drills regularly',
            'Keep a pair of shoes under your bed',
        ],
        beforeDisaster: [
            'Create a family emergency communication plan',
            'Prepare a 72-hour emergency kit (water, food, medications, flashlight, radio)',
            'Identify safe places in each room',
            'Know evacuation routes from home and school',
            'Secure bookcases, refrigerators, and heavy items to walls',
            'Learn first aid and CPR',
        ],
        duringDisaster: [
            'DROP to your hands and knees immediately',
            'Take COVER under a sturdy desk, table, or against an interior wall',
            'HOLD ON until shaking stops',
            'Stay away from windows, outside walls, and doors',
            'Do not run outside during shaking',
            'If outdoors, move away from buildings, trees, streetlights, and power lines',
            'If in a vehicle, pull over safely away from bridges and overpasses',
        ],
        afterDisaster: [
            'Check yourself and others for injuries',
            'Expect aftershocks and be ready to DROP, COVER, HOLD ON again',
            'Check for gas leaks – do not use open flames if you smell gas',
            'Inspect building for structural damage',
            'Listen to local authorities for information',
            'Avoid damaged areas and downed power lines',
            'Document damage for insurance purposes',
        ],
        emergencyKit: ['Water (4 liters per person per day)', 'Non-perishable food (3-day supply)', 'First aid kit', 'Flashlight and extra batteries', 'Whistle', 'Dust masks', 'Plastic sheeting and duct tape', 'Wrench to shut off utilities', 'Manual can opener', 'Local maps', 'Cell phone with chargers', 'Medications', 'Cash'],
    },
    {
        type: 'flood',
        title: 'Flood',
        icon: '🌊',
        color: '#2980b9',
        severity: 'critical',
        description:
            'A flood is an overflow of water that submerges usually dry land. Floods are the most common and widespread natural disaster, affecting millions of people worldwide. They can happen suddenly (flash floods) or build up gradually over days.',
        causes: [
            'Heavy or prolonged rainfall',
            'Rapid snowmelt',
            'Dam or levee failure',
            'Storm surges from cyclones',
            'Blocked drainage systems',
            'Deforestation causing reduced water absorption',
        ],
        safetyMeasures: [
            'Know your flood risk – check if you live in a flood zone',
            'Prepare an emergency kit with important documents in waterproof containers',
            'Never walk, swim, or drive through floodwaters',
            'Move to higher ground when warned of flooding',
            'Install check valves in plumbing to prevent sewage backup',
            'Keep gutters and drains clear',
        ],
        beforeDisaster: [
            'Monitor weather reports and flood alerts',
            'Move valuables to upper floors',
            'Fill sandbags to protect entry points',
            'Disconnect electrical appliances',
            'Know your evacuation route to higher ground',
            'Prepare emergency supplies',
        ],
        duringDisaster: [
            'Move immediately to higher ground or the highest floor',
            'Do not walk through moving water (6 inches can knock you down)',
            'Avoid driving through flooded roads',
            'Turn off utilities at the main switch',
            'Disconnect electrical appliances if not touching water',
            'Listen to emergency broadcasts on battery-powered radio',
            'If trapped, move to the roof and signal for rescue',
        ],
        afterDisaster: [
            'Return home only when authorities say it is safe',
            'Avoid floodwater – it may be contaminated with sewage',
            'Document all damage before cleaning up',
            'Throw out any food that has come in contact with floodwater',
            'Dry out home to prevent mold within 24–48 hours',
            'Check for structural damage before entering',
            'Seek medical attention for anyone who is injured',
        ],
        emergencyKit: ['Portable radio', 'Waterproof bags for documents', 'Drinking water purification tablets', 'Life jackets', 'Rope', 'Rubber boots and gloves', 'Battery power banks', 'Candles and lighters'],
    },
    {
        type: 'fire',
        title: 'Fire',
        icon: '🔥',
        color: '#c0392b',
        severity: 'critical',
        description:
            'Fire is one of the most destructive forces known to humanity. Building fires and wildfires kill thousands of people annually and cause billions in damage. Most fire deaths are caused by smoke inhalation rather than burns.',
        causes: [
            'Cooking accidents',
            'Electrical faults and overloaded circuits',
            'Careless use of candles or open flames',
            'Smoking materials',
            'Lightning strikes',
            'Arson',
            'Wildfire spread due to drought and wind',
        ],
        safetyMeasures: [
            'Install working smoke detectors on every floor',
            'Test smoke alarms monthly and replace batteries annually',
            'Keep a fire extinguisher accessible and learn to use it',
            'Create and practice a home fire escape plan with two exits per room',
            'Never leave cooking unattended',
            'Keep flammable materials away from heat sources',
        ],
        beforeDisaster: [
            'Install and maintain smoke alarms',
            'Plan two escape routes from every room',
            'Practice fire drills with family/class twice a year',
            'Keep fire extinguishers accessible and maintained',
            'Store emergency supplies outside the building',
            'Know where the nearest hydrant and fire station is',
        ],
        duringDisaster: [
            'Get out immediately – do not stop to collect belongings',
            'Crawl low under smoke – cleaner air is near the floor',
            'Before opening a door, feel it with the back of your hand',
            'Do not open a hot door – use alternate escape route',
            'Close doors behind you to slow the spread of fire',
            'Once out, stay out – never re-enter a burning building',
            'Call 101 (Fire Emergency) from a safe location',
        ],
        afterDisaster: [
            'Do not enter the building until fire officials say it is safe',
            'Watch for structural damage, loose boards, and ash pits',
            'Discard any food, medicine or cosmetics exposed to heat, smoke, or water',
            'Contact insurance company to document losses',
            'Seek psychological support if needed',
            'Clean all surfaces exposed to smoke',
        ],
        emergencyKit: ['Smoke detectors', 'Fire extinguisher (ABC type)', 'Fire escape ladder for upper floors', 'Protective gloves', 'Face masks', 'Flashlight', 'Emergency contacts list', 'Important documents in fireproof box'],
    },
    {
        type: 'cyclone',
        title: 'Cyclone / Hurricane',
        icon: '🌀',
        color: '#8e44ad',
        severity: 'critical',
        description:
            'A cyclone (hurricane or typhoon) is a rapidly rotating storm system characterized by a low-pressure center, strong winds, and heavy rain. Cyclones can cause catastrophic damage through high winds, storm surges, and flooding over a large area.',
        causes: [
            'Warm ocean water providing energy to the storm',
            'Low atmospheric pressure conditions',
            'Interaction between warm moist air and the atmosphere',
            'Coriolis effect (Earth\'s rotation) causing spinning',
            'Climate change increasing ocean temperatures',
        ],
        safetyMeasures: [
            'Monitor cyclone alerts and weather forecasts regularly',
            'Know your cyclone category risk area',
            'Board up or secure windows and doors',
            'Prepare emergency kit before cyclone season',
            'Know your local evacuation routes',
            'Move to a cyclone shelter if directed',
        ],
        beforeDisaster: [
            'Listen to official cyclone warnings and updates',
            'Board up windows and secure outdoor furniture',
            'Fill vehicles with fuel; charge all devices',
            'Prepare emergency supplies for 72 hours',
            'Identify the strongest room in the house (interior room)',
            'Know your community cyclone shelter location',
        ],
        duringDisaster: [
            'Stay indoors in the strongest part of the building',
            'Stay away from windows, glass doors, and skylights',
            'If evacuating, leave early – do not wait',
            'Do not go outside during the eye of cyclone – the storm will resume',
            'Listen to emergency broadcasts',
            'If trapped by flooding, move to the roof and signal for help',
        ],
        afterDisaster: [
            'Wait for official all-clear before going outside',
            'Beware of fallen power lines and flooded roads',
            'Do not enter damaged buildings',
            'Use caution with generators (carbon monoxide risk)',
            'Check on neighbors, especially elderly and disabled',
            'Document damage for insurance',
            'Boil or purify water until water supply is declared safe',
        ],
        emergencyKit: ['Battery-powered or hand-crank radio', 'Flashlights with extra batteries', 'Water (at least 4 liters per person per day)', '3-day food supply', 'First aid kit', 'Blankets', 'Waterproof documents container', 'Cash'],
    },
    {
        type: 'pandemic',
        title: 'Pandemic / Disease Outbreak',
        icon: '🦠',
        color: '#27ae60',
        severity: 'high',
        description:
            'A pandemic is an epidemic of infectious disease that has spread across a large region, multiple continents, or worldwide. Pandemics can affect millions of people simultaneously and require coordinated global response. Recent examples include COVID-19 and H1N1 influenza.',
        causes: [
            'Highly contagious pathogen (virus, bacteria, or prion)',
            'Human-to-human transmission',
            'Zoonotic spillover (spreading from animals to humans)',
            'Lack of immunity in the population',
            'Global travel and trade facilitating rapid spread',
            'Poor public health infrastructure',
        ],
        safetyMeasures: [
            'Follow official health guidelines from local health authorities',
            'Maintain hand hygiene – wash hands for at least 20 seconds',
            'Wear appropriate protective masks when required',
            'Maintain physical distance from those who are ill',
            'Get vaccinated against preventable diseases',
            'Stay home when sick to avoid spreading illness',
        ],
        beforeDisaster: [
            'Stock up on essential medicines and medical supplies',
            'Create a household emergency plan including isolation protocols',
            'Stay up to date on vaccinations',
            'Learn symptoms of disease outbreaks in your area',
            'Maintain a 2-week supply of food, water, and medications',
            'Know when and how to seek medical care',
        ],
        duringDisaster: [
            'Follow all guidelines from the health ministry and WHO',
            'Wear recommended PPE (masks, gloves)',
            'Practice strict hand hygiene and respiratory etiquette',
            'Maintain social distancing as instructed',
            'Isolate if you are sick or exposed to the pathogen',
            'Avoid large gatherings',
            'Monitor symptoms and seek medical help if needed',
        ],
        afterDisaster: [
            'Continue hygiene practices even as restrictions ease',
            'Get vaccinated as vaccines become available',
            'Support mental health of yourself and community',
            'Follow advice on when it is safe to resume normal activities',
            'Disinfect commonly touched surfaces regularly',
            'Help community recovery efforts',
        ],
        emergencyKit: ['Prescription medications (30-day supply)', 'Hand sanitizer (60%+ alcohol)', 'Face masks (N95 or surgical)', 'Gloves and disinfectants', 'Thermometer and oximeter', 'Immune-boosting vitamins', 'Bottled water and non-perishables (2-week supply)', 'Emergency contact numbers for healthcare providers'],
    },
    {
        type: 'chemical',
        title: 'Chemical Hazard / Spill',
        icon: '☢️',
        color: '#f39c12',
        severity: 'critical',
        description:
            'Chemical hazards include exposure to toxic chemicals, gases, or radiation that can cause severe health effects, environmental damage, or death. These can occur at industrial facilities, laboratories, during transportation, or intentionally.',
        causes: [
            'Accidental release from industrial plants or factories',
            'Transportation accidents involving hazardous materials',
            'Improper storage or handling of chemicals',
            'Laboratory accidents',
            'Terrorist attacks using chemical weapons',
            'Pipe or storage tank leakage',
        ],
        safetyMeasures: [
            'Know the hazardous materials in your area (industrial facilities nearby)',
            'Understand HAZMAT placards and warning signs',
            'Have a shelter-in-place plan for chemical emergencies',
            'Keep emergency kit including protective masks',
            'Know when and how to evacuate or shelter-in-place',
            'Never approach a chemical spill without proper PPE',
        ],
        beforeDisaster: [
            'Learn about chemical hazards near your school or home',
            'Know the difference between evacuation and shelter-in-place',
            'Prepare an emergency kit with protective equipment',
            'Keep windows and doors sealed properly',
            'Maintain a plastic sheeting and duct tape kit for sealing rooms',
            'Know emergency contact for local hazmat team',
        ],
        duringDisaster: [
            'If outdoors, move upwind and away from the incident',
            'If indoors, shelter-in-place: close all windows, doors, and vents',
            'Turn off HVAC systems to prevent chemical intake',
            'Cover face with a damp cloth if evacuation is necessary',
            'Do not eat, drink or touch anything contaminated',
            'Follow instructions from emergency responders',
            'If exposed, remove clothing and shower with soap and water immediately',
        ],
        afterDisaster: [
            'Do not re-enter the affected area until given all-clear',
            'Follow decontamination procedures if exposed',
            'Seek medical attention immediately if exposed to chemicals',
            'Report all exposures to emergency services',
            'Dispose of potentially contaminated food and water',
            'Watch for delayed health symptoms and seek medical help',
        ],
        emergencyKit: ['Protective masks (N95 or higher)', 'Safety goggles', 'Chemical-resistant gloves', 'Plastic sheeting and duct tape', 'Emergency HAZMAT guidebook', 'Bottled water and food in sealed containers', 'Battery-powered radio for emergency alerts', 'Change of clothes in sealed bag'],
    },
];

const emergencyContactsData = [
    { name: 'National Emergency', number: '112', category: 'disaster', description: 'India National Emergency Number', isNational: true },
    { name: 'Fire Brigade', number: '101', category: 'fire', description: 'National Fire Emergency', isNational: true },
    { name: 'Police', number: '100', category: 'police', description: 'National Police Emergency', isNational: true },
    { name: 'Ambulance / Medical', number: '108', category: 'medical', description: 'Emergency Medical Services', isNational: true },
    { name: 'National Disaster Response Force (NDRF)', number: '011-24363260', category: 'disaster', description: 'India NDRF Control Room', isNational: true },
    { name: 'Disaster Management Helpline', number: '1078', category: 'disaster', description: 'Centralized Disaster Helpline', isNational: true },
    { name: 'Women Helpline', number: '1091', category: 'other', description: 'Women Emergency Helpline', isNational: true },
    { name: 'Child Helpline', number: '1098', category: 'other', description: 'CHILDLINE India Foundation', isNational: true },
    { name: 'Poison Control Center', number: '1800-116-117', category: 'medical', description: 'National Poison Control Center', isNational: true },
    { name: 'School Emergency Contact', number: '1800-XXX-0001', category: 'school', description: 'School Admin Emergency Number', isNational: false },
];

const sampleQuizData = [
    {
        title: 'Earthquake Safety Basics',
        disasterType: 'earthquake',
        description: 'Test your knowledge on earthquake preparedness and response.',
        timeLimit: 10,
        questions: [
            {
                question: 'What should you do first when an earthquake begins?',
                options: ['Run outside immediately', 'Drop, Cover, and Hold On', 'Call emergency services', 'Open all windows'],
                correctAnswer: 1,
                explanation: 'DROP to your hands and knees, take COVER under a sturdy surface, and HOLD ON until shaking stops.',
            },
            {
                question: 'What does the Drop, Cover, Hold On method mean?',
                options: ['Drop your belongings, cover yourself with a blanket, hold your breath', 'Drop to your knees, cover under a table, hold on until shaking stops', 'Drop to the floor, cover your head, hold onto the door', 'None of the above'],
                correctAnswer: 1,
                explanation: 'Drop to hands and knees, take cover under a sturdy table or against an interior wall, and hold on until shaking stops.',
            },
            {
                question: 'What should you avoid during an earthquake?',
                options: ['Staying under a table', 'Running outside', 'Crawling away from windows', 'Covering your head'],
                correctAnswer: 1,
                explanation: 'Running outside during shaking is dangerous due to falling debris and glass.',
            },
            {
                question: 'What is an aftershock?',
                options: ['An earthquake that occurs before the main earthquake', 'A smaller earthquake after the main earthquake', 'A flood caused by an earthquake', 'A type of building damage'],
                correctAnswer: 1,
                explanation: 'Aftershocks are smaller earthquakes that follow the main earthquake and can cause additional damage.',
            },
            {
                question: 'What should you NOT do after an earthquake?',
                options: ['Check for gas leaks', 'Return to a damaged building immediately', 'Listen to emergency broadcasts', 'Check others for injuries'],
                correctAnswer: 1,
                explanation: 'Never re-enter a damaged building until authorities declare it safe.',
            },
        ],
    },
    {
        title: 'Fire Safety & Evacuation',
        disasterType: 'fire',
        description: 'Test your knowledge on fire safety procedures.',
        timeLimit: 10,
        questions: [
            {
                question: 'What should you do before opening a door during a fire?',
                options: ['Open it quickly to let in air', 'Feel it with the back of your hand', 'Break it down', 'Shout for help through it'],
                correctAnswer: 1,
                explanation: 'Feel the door with the back of your hand. If it is hot, the fire is on the other side – use another escape route.',
            },
            {
                question: 'How low should you crawl to avoid smoke inhalation?',
                options: ['Stay standing', 'Crouch at waist height', 'Crawl on hands and knees, keeping head below 30cm from the floor', 'Lie flat on the ground'],
                correctAnswer: 2,
                explanation: 'Cleaner air is near the floor. Crawl on hands and knees with head below 30cm from the floor.',
            },
            {
                question: 'What is the emergency fire number in India?',
                options: ['108', '112', '101', '100'],
                correctAnswer: 2,
                explanation: '101 is the national fire emergency number in India.',
            },
            {
                question: 'Once you are out of a burning building, what should you do?',
                options: ['Go back in to get belongings', 'Stay near the building to watch', 'Stay out and call the fire brigade', 'Wait inside for firefighters'],
                correctAnswer: 2,
                explanation: 'Once out, stay out. Call the fire brigade (101) from a safe distance.',
            },
            {
                question: 'How often should you replace smoke alarm batteries?',
                options: ['Every 5 years', 'Every month', 'Once a year', 'When they stop beeping'],
                correctAnswer: 2,
                explanation: 'Replace smoke alarm batteries at least once a year, and test alarms monthly.',
            },
        ],
    },
    {
        title: 'Flood Preparedness',
        disasterType: 'flood',
        description: 'Test your understanding of flood safety.',
        timeLimit: 10,
        questions: [
            {
                question: 'How much moving water can knock an adult off their feet?',
                options: ['3 feet', '2 feet', '6 inches', '1 foot'],
                correctAnswer: 2,
                explanation: 'Just 6 inches of moving water can knock a person off their feet. Never walk through floodwater.',
            },
            {
                question: 'What should you do immediately when a flood warning is issued?',
                options: ['Wait to see if the flood is serious', 'Move to higher ground immediately', 'Stay near the water to monitor levels', 'Pack valuables into your car'],
                correctAnswer: 1,
                explanation: 'Move to higher ground immediately. Do not wait for the flood to arrive.',
            },
            {
                question: 'Is floodwater safe to drink?',
                options: ['Yes, it comes from rain', 'No, it is contaminated with sewage and chemicals', 'Yes if it looks clear', 'Only if filtered'],
                correctAnswer: 1,
                explanation: 'Floodwater is never safe to drink or touch. It is contaminated with sewage, chemicals, and pathogens.',
            },
            {
                question: 'What is a flash flood?',
                options: ['A flood that occurs during a thunderstorm', 'A rapidly rising flood occurring within 6 hours of heavy rain', 'A flood caused by a dam break only', 'A flood with lightning'],
                correctAnswer: 1,
                explanation: 'A flash flood is a rapid flood that occurs within 6 hours of heavy or excessive rainfall.',
            },
            {
                question: 'Where should you go if your car is being swept away by floodwater?',
                options: ['Stay in the car with the seatbelt on', 'Open a window and escape to higher ground', 'Honk the horn for help', 'Turn on headlights and wait'],
                correctAnswer: 1,
                explanation: 'Open a window and escape to higher ground as quickly as possible.',
            },
        ],
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected for seeding');

        // Clear existing data
        await Promise.all([
            Disaster.deleteMany(),
            EmergencyContact.deleteMany(),
            Quiz.deleteMany(),
        ]);
        console.log('🗑️  Cleared existing seed data');

        // Seed disasters
        await Disaster.insertMany(disastersData);
        console.log(`✅ Seeded ${disastersData.length} disaster types`);

        // Seed emergency contacts
        await EmergencyContact.insertMany(emergencyContactsData);
        console.log(`✅ Seeded ${emergencyContactsData.length} emergency contacts`);

        // Create admin user
        let admin = await User.findOne({ email: 'admin@school.edu' });
        if (!admin) {
            admin = await User.create({
                name: 'System Administrator',
                email: 'admin@school.edu',
                password: 'Admin@123',
                role: 'admin',
                institution: 'Demo School',
            });
            console.log('✅ Created admin user: admin@school.edu / Admin@123');
        }

        // Create teacher
        let teacher = await User.findOne({ email: 'teacher@school.edu' });
        if (!teacher) {
            teacher = await User.create({
                name: 'Mrs. Priya Sharma',
                email: 'teacher@school.edu',
                password: 'Teacher@123',
                role: 'teacher',
                institution: 'Demo School',
            });
            console.log('✅ Created teacher user: teacher@school.edu / Teacher@123');
        }

        // Seed quizzes
        const quizzesWithCreator = sampleQuizData.map((q) => ({ ...q, createdBy: teacher._id }));
        await Quiz.insertMany(quizzesWithCreator);
        console.log(`✅ Seeded ${sampleQuizData.length} sample quizzes`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📋 Demo Credentials:');
        console.log('  Admin:   admin@school.edu   / Admin@123');
        console.log('  Teacher: teacher@school.edu / Teacher@123');
        console.log('  (Create student accounts via Signup page as role: student)');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exit(1);
    }
}

seed();
