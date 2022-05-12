export interface IRequestUser {
    email: string;
    password: string;
}

export interface IUser {
    userId: string;
    email: string;
    accessToken: string;
    profileImage?: string;
    clienteId?: string;
    projectId?: string;
}