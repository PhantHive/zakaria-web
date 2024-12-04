// src/data/timeline.ts

export interface TimelineItem {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    category: string;
    rowPosition: number;
    tags: string[];
    experienceId?: number;
    milestone?: Milestone;
}

export interface Milestone {
    id: number;
    date: string;
    title: string;
    description: string;
    icon: string;
    section: string;
    experienceId: number;
}

export const professionalExperience: TimelineItem[] = [
    {
        id: 1,
        title: 'Telespazio AI Intern',
        startDate: '2024-02-01',
        endDate: '2024-07-31',
        description:
            'Working on innovative Large Language Models for the space industry! 🚀 Implementing cutting-edge NLP solutions.',
        category: 'internship',
        rowPosition: 0,
        tags: ['AI', 'LLM', 'Space Tech', 'NLP', 'RAG'],
    },
    {
        id: 2,
        title: 'FCM Lab Barcelona',
        startDate: '2023-06-01',
        endDate: '2023-09-30',
        description:
            'Developed AI-powered web extensions for business travel solutions in Barcelona! 🌞 Applied LLMs to travel industry.',
        category: 'internship',
        rowPosition: 1,
        tags: ['Web Dev', 'Extension', 'LLM'],
    },
    {
        id: 3,
        title: 'Scrypt',
        startDate: '2021-08-01',
        endDate: '2024-07-31',
        description:
            'Leading AI collective at IPSA! 🤖 Working on project BB, helping members learn NLP and AI fundamentals. Prepared and delivered workshops related to sentiment analysis and chatbots.',
        category: 'project',
        rowPosition: 2,
        tags: ['ML', 'Leadership', 'NLP', 'Education', 'SFT'],
    },
    {
        id: 4,
        title: 'Student IT Assistant',
        startDate: '2021-07-01',
        endDate: '2021-07-31',
        description:
            'Assisted with IT operations at Bayerische Landesbank. 💼 Applied V.Bank patches and system maintenance.',
        category: 'internship',
        rowPosition: 3,
        tags: ['IT Support', 'Banking', 'System Admin'],
    },
    {
        id: 5,
        title: 'Phearion',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        description:
            'Creating custom Discord bots and AI solutions! 🤖 Building innovative applications as a freelancer.',
        category: 'project',
        rowPosition: 4,
        tags: ['Discord Bots', 'AI', 'Freelance', 'Development', 'SFT'],
    },
];

export const education: TimelineItem[] = [
    {
        id: 1,
        title: 'Computer Engineering',
        startDate: '2018-09-01',
        endDate: '2019-06-30',
        description:
            'Intensive year of computer engineering studies in classe préparatoire! 💻 Building strong foundations.',
        category: 'education-prep',
        rowPosition: 0,
        tags: ['Engineering', 'Computer Science', 'OCaml', 'C#', 'Python'],
    },
    {
        id: 2,
        title: 'Aerospace Engineering',
        startDate: '2019-09-01',
        endDate: '2024-02-29',
        description:
            '5-year program specializing in AI and Aerospace Engineering! 🛸 Mastering cutting-edge technologies.',
        category: 'education-main',
        rowPosition: 1,
        tags: [
            'Aerospace',
            'AI',
            'Engineering',
            'Innovation',
            'Matlab',
            'VHDL',
            'Python',
        ],
    },
    {
        id: 3,
        title: 'Latvia Exchange',
        startDate: '2022-09-01',
        endDate: '2023-01-31',
        description:
            'International semester studying telecommunications and intelligent systems in Latvia! 🌍 Broadening horizons.',
        category: 'education-exchange',
        rowPosition: 2,
        tags: [
            'Telecommunications',
            'International',
            'C++',
            'AI',
            'Python',
            'Javascript',
        ],
    },
];

export const milestones = [
    {
        id: 1,
        date: '2022-09-01',
        title: 'International Exchange',
        description: 'Started my journey in Latvia! 🌍',
        icon: '✈️',
        section: 'education',
        experienceId: 1, // Add this if needed
    },
    {
        id: 2,
        date: '2024-07-31',
        title: 'Graduation',
        description: 'Completed Aerospace Engineering! 🎓',
        icon: '🎓',
        section: 'education',
        experienceId: 2, // Add this if needed
    },
    {
        id: 3,
        date: '2021-07-01',
        title: 'International Internship',
        description: 'Internship in Barcelona! 🌞',
        icon: '🌞',
        section: 'professional',
        experienceId: 4,
    },
    {
        id: 4,
        date: '2024-01-01',
        title: 'Freelance Journey',
        description: 'Started Phearion! 🚀',
        icon: '💼',
        section: 'professional',
        experienceId: 3, // Add this if needed
    },
];
