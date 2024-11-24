import { User } from './user';

export interface Room {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    author: User;
}