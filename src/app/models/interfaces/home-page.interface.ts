export interface IHomePage {
    _id?: string;
    projectId?: string;
    background: string;
    about: {
        title: string;
        description: string;
        router?: string;
        btn?: string;
    };
    cards: {
        title: string;
        descriptions: {
            description: string;
        }[];
        router: string;
        btn: string;
    }[];
}