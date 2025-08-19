export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: any; //‘any’ for compatibility with Firestore Timestamp
}
