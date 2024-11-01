import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { IUsers } from './users.interface';

export interface GameSubmission {
  id: string;
  userID: string;
  gameID: string;
  score: number;
}
export const GameSubmissionConverter = {
  toFirestore: (data: GameSubmission) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as GameSubmission;
    return data;
  },
};

export interface UserWithGameSubmissions {
  user: IUsers;
  submissions: GameSubmission[];
  totalScore: number;
}
