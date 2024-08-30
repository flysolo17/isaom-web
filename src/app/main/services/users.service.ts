import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUsers, IUsersConverter, UserType } from '../types/users.interface';

export const USERS_COLLECTION = 'users';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore) {}

  getAllTeachers(): Observable<IUsers[]> {
    const q = query(
      collection(this.firestore, USERS_COLLECTION).withConverter(
        IUsersConverter
      ),
      where('type', '==', UserType.TEACHER)
    );
    return collectionData(q) as Observable<IUsers[]>;
  }

  getAllStudents(): Observable<IUsers[]> {
    const q = query(
      collection(this.firestore, USERS_COLLECTION).withConverter(
        IUsersConverter
      ),
      where('type', '==', UserType.STUDENT)
    );
    return collectionData(q) as Observable<IUsers[]>;
  }

  getAllUsers(): Observable<IUsers[]> {
    const q = query(
      collection(this.firestore, USERS_COLLECTION).withConverter(
        IUsersConverter
      ),
      where('type', 'in', [UserType.STUDENT, UserType.GUEST])
    );
    return collectionData(q) as Observable<IUsers[]>;
  }
}
