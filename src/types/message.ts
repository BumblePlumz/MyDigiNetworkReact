import { User } from './user';

export interface Message {
    id: string;
    content: string;
    author?: User;
}