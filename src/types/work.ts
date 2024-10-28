export interface Work {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    demoUrl?: string;
    codeUrl?: string;
    category?: string;
    featured?: boolean;
    completionDate?: string;
}
