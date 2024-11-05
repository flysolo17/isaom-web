import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { IUsers } from './users.interface';

export interface GameSubmission {
  answerSheet: Record<string, string>;
  createdAt: Date;
  gameID: string;
  id: string;
  maxScore: number;
  score: number;
  userID: string;
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
