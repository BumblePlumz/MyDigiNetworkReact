import { User } from './user';
import { Comment } from './comment';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}