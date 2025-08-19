export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  commentCount: number;
  comments?: Comment[];
}
