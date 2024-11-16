import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Subjects {
  id?: string | null;
  name?: string | null;
  cover?: string | null;
  sectionID?: string | null;
  code?: string | null;
  students: string[];
  createdAt?: Date | null;
}

export const subjectConverter = {
  toFirestore: (data: Subjects) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Subjects;
    data.createdAt = (data.createdAt as any).toDate();
    return data;
  },
};
