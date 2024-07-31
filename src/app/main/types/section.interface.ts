import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface ISection {
  id: string;
  name: string;
  teacher: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ISectionConverter = {
  toFirestore: (data: ISection) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as ISection;
    data.createdAt = (data.createdAt as any).toDate();
    data.updatedAt = (data.updatedAt as any).toDate();
    return data;
  },
};
