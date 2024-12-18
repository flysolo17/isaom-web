import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface ISignLanguageLesson {
  id: string;
  title: string;
  desc: string;
  videoId: string;
  dificulty: Dificulty;
  createdAt: Date;
}

export enum Dificulty {
  BEGINNER = 'BEGINNER ',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export const ISignLanguageLessonsConverter = {
  toFirestore: (data: ISignLanguageLesson) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as ISignLanguageLesson;
    data.createdAt = (data.createdAt as any).toDate();
    return data;
  },
};
