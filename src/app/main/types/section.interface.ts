import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { IUsers } from './users.interface';

export interface ISection {
  id: string;
  name: string;
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

export interface ISectionWithTeachers {
  section: ISection;
  teachers: IUsers[];
}
