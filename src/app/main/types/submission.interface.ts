import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { IUsers } from './users.interface';

export interface SubmissionWIthStudent {
  student?: IUsers;
  submission: Submissions;
}
export interface Submissions {
  id?: string;
  subjectID?: string;
  studentID?: string;
  activityID?: string;
  activityName?: string;
  points: number;
  maxPoints: number;
  answerSheet: { [key: string]: string };
  createdAt: Date;
}

export const SubmissionsConverter = {
  toFirestore: (data: Submissions) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Submissions;
    data.createdAt = (data.createdAt as any).toDate();
    return data;
  },
};
