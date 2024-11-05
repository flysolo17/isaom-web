import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { IUsers } from './users.interface';

export interface GameSubmission {
  id: string;
  userID: string;
  gameID: string;
  score: number;
}

export const GameSubmissionConverter = {
  toFirestore: (data: GameSubmission) => data, // to json
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    // from json
    const data = snap.data() as GameSubmission;
    return data;
  },
};

export interface UserWithGameSubmissions {
  user: IUsers;
  submissions: GameSubmission[];
  totalScore: number;
}
