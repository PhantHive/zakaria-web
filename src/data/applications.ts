export interface ApplicationStep {
    date: string;
    status: string;
    description: string;
}

export interface Application {
    id: number;
    date: string;
    company: string;
    position: string;
    country: string;
    status: string;
    steps?: ApplicationStep[];
}

export const applications: Application[] = [
    {
        id: 1,
        date: '2025-02-06',
        company: 'Google',
        position: 'Student Researcher, BS/MS',
        country: 'US',
        status: 'Rejection',
    },
    {
        id: 2,
        date: '2025-02-07',
        company: 'Mistral AI',
        position: 'Applied AI Engineer',
        country: 'US',
        status: 'No response',
    },
    {
        id: 3,
        date: '2025-04-11',
        company: 'Google',
        position: 'Applied AI Customer Engineer (English, French)',
        country: 'FR',
        status: 'Rejection',
    },
    {
        id: 4,
        date: '2025-05-01',
        company: 'Amazon',
        position: 'SDE I',
        country: 'FR',
        status: 'Rejected after evaluation',
        steps: [
            {
                date: '2025-05-01',
                status: 'Applied',
                description: 'Initial application submitted',
            },
            {
                date: '2025-05-10',
                status: 'In Progress',
                description: 'Accepted to evaluation',
            },
            {
                date: '2025-05-15',
                status: 'Rejected',
                description: 'Reject upon evaluation',
            },
        ],
    },
    {
        id: 5,
        date: '2025-06-20',
        company: 'Vibe Code',
        position: 'AI Engineer',
        country: 'FR',
        status: 'No response',
    },
    {
        id: 6,
        date: '2025-06-20',
        company: 'Fever',
        position: 'Software Engineer',
        country: 'SP',
        status: 'No response',
    },
    {
        id: 7,
        date: '2025-06-22',
        company: 'My Pepit',
        position: 'AI Engineer',
        country: 'FR',
        status: 'No response',
    },
    {
        id: 8,
        date: '2025-06-22',
        company: 'SESAmm',
        position: 'Software Engineer',
        country: 'FR',
        status: 'No response',
    },
    {
        id: 9,
        date: '2025-06-23',
        company: 'Jobgether',
        position: 'Junior Software Engineer',
        country: 'FR',
        status: 'No response',
    },
    {
        id: 10,
        date: '2025-06-25',
        company: 'Anthropic',
        position: 'Software Engineer, Safeguards Research',
        country: 'UK',
        status: 'Applied',
    },
    {
        id: 11,
        date: '2025-06-25',
        company: 'Qualibat',
        position:
            "Ingénieur Machine Learning pour le développement d'un Chatbot Intelligent",
        country: 'UK',
        status: 'No response',
    },
    {
        id: 12,
        date: '2025-09-10',
        company: 'Murex',
        position: 'UI Software Engineer',
        country: 'FR',
        status: 'In progress',
        steps: [
            {
                date: '2025-09-10',
                status: 'Applied',
                description: 'Initial application submitted',
            },
            {
                date: '2025-09-15',
                status: 'In Progress',
                description: 'Under review',
            },
        ],
    },
    {
        id: 13,
        date: '2025-09-28',
        company: 'Sanofi',
        position: 'Accelerator Data & AI Engineer',
        country: 'FR',
        status: 'In progress',
        steps: [
            {
                date: '2025-09-28',
                status: 'Applied',
                description: 'Initial application submitted',
            },
            {
                date: '2025-10-01',
                status: 'In Progress',
                description: 'Under review',
            },
        ],
    },
    {
        id: 14,
        date: '2025-09-28',
        company: 'Checkout',
        position: 'Software Engineer',
        country: 'FR',
        status: 'In progress',
    },
    {
        id: 15,
        date: '2025-10-06',
        company: 'SAP',
        position: 'NodeJS/TypeScript Developer - Artificial Intelligence',
        country: 'FR',
        status: 'In progress',
        steps: [
            {
                date: '2025-10-06',
                status: 'Applied',
                description: 'Initial application submitted',
            },
            {
                date: '2025-10-10',
                status: 'In Progress',
                description: 'Under review',
            },
        ],
    },
    {
        id: 16,
        date: '2025-10-15',
        company: 'LegalFly',
        position: 'Full Stack Engineer',
        country: 'FR',
        status: 'In progress',
    },
];
