import { User } from "./user";

export interface Subscription {
    id: string;
    ownerID: string;
    targetID: string;
    created_at: string;
    updated_at: string;
    friend: User;
}