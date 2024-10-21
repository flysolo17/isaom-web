import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Games {
  id: string;
  title: string;
  timer: number;
  cover: string;
  createdAt: Date;
}
export const gameConverter = {
  toFirestore: (data: Games) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Games;
    data.createdAt = (data.createdAt as any).toDate();
    return data;
  },
};
