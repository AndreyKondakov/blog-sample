export interface Comment {
  id: string;
  author: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any; //‘any’ for compatibility with Firestore Timestamp
}
