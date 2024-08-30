import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface IUsers {
  id: string;
  name: string;
  email: string;
  type: UserType;
  sectionID: string;
  gender: Gender;
  avatar: string;
}

export const IUsersConverter = {
  toFirestore: (data: IUsers) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as IUsers;
    return data;
  },
};

export enum UserType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  GUEST = 'GUEST',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
