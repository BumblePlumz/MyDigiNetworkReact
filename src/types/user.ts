export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    friend?: User | null;
}