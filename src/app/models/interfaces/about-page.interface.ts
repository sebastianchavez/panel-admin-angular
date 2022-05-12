export interface IAboutPage {
    _id?: string;
    projectId?: string;
    background: string;
    about: {
        title: string;
        description: string;
    };
    cards: {
        image: string;
        nameImage: string;
        text: string;
    }[];
    teamTitle: string;
    team: {
        title: string;
        description: string;
        image: string;
    }[];
}
