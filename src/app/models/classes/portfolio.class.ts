import { IProject } from '../interfaces/portfolio.interfaces';
export class Portfolio implements IProject {

    _id: string = '';
    category: string = '';
    createdAt: Date = new Date();
    description: string = '';
    images: { image: string; imageName: string; }[] = [];
    links: { name: string; url: string; }[] = [];
    selected: number = 0;
    technologies: { color: string; title: string; }[] = [];
    title: string = '';
}