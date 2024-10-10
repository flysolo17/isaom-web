import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface ITranslations {
  createdAt: Date;
  id: string;
  source: string;
  target: string;
  text: string;
  translation: string;
  userID: string;
}

export const ITranslationsConverter = {
  toFirestore: (data: ITranslations) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as ITranslations;
    data.createdAt = (data.createdAt as any).toDate();
    return data;
  },
};
