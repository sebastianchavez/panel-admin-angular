export interface IServicePage {
    _id?: string;
    projectId?: string;
    background: string;
    title: string;
    description: string;
    services: {
        id: number;
        title: string;
        description: string;
        smallDescription: string;
        image: string;
    }[];
}