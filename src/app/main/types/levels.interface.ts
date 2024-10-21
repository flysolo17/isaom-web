import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Levels {
  id: string;
  question: string;
  image: string;
  hint: string;
  points: number;
  answer: string;
  createdAt: Date;
}
export const levelConverter = {
  toFirestore: (data: Levels) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Levels;
    data.createdAt = (data.createdAt as any).toDate();
    return data;
  },
};
