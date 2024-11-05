import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';
import {
  IUsers,
  IUsersConverter,
  UsersWithSections,
  UserType,
} from '../types/users.interface';
import { ISectionConverter, ISection } from '../types/section.interface';
import { SECTION_COLLECTION } from './section.service';

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

  getAllUsersWithSections(): Observable<UsersWithSections[]> {
    const q = query(
      collection(this.firestore, USERS_COLLECTION).withConverter(
        IUsersConverter
      ),
      where('type', 'in', [UserType.STUDENT, UserType.GUEST, UserType.TEACHER])
    );

    return from(getDocs(q)).pipe(
      mergeMap((userSnapshot) => {
        const users = userSnapshot.docs.map((doc) => doc.data() as IUsers);

        return from(users).pipe(
          mergeMap((user: IUsers) => {
            if (user.sections.length === 0) {
              return from([{ users: user, sections: [] }]);
            }

            const sectionQuery = query(
              collection(this.firestore, SECTION_COLLECTION).withConverter(
                ISectionConverter
              ),
              where('id', 'in', user.sections)
            );

            return from(getDocs(sectionQuery)).pipe(
              map((sectionSnapshot) => {
                const sections = sectionSnapshot.docs.map(
                  (doc) => doc.data() as ISection
                );
                return { users: user, sections };
              })
            );
          }),
          toArray()
        );
      })
    );
  }

  getUserByID(uid: string): Observable<IUsers | null> {
    const userDocRef = doc(
      collection(this.firestore, USERS_COLLECTION),
      uid
    ).withConverter(IUsersConverter);

    return docData(userDocRef, { idField: 'id' }) as Observable<IUsers | null>;
  }
}
