export interface IProject {
    title: string;
    category: string;
    createdAt: Date;
    description: string;
    images: {
        image: string;
        imageName: string;
    }[];
    links: {
        name: string;
        url: string;
    }[];
    technologies: {
        color: string;
        title: string;
    }[];
    selected?: number;
}

export interface IResponseProject {
    data: any;
    projects: any[];
    countProjects: number;
}