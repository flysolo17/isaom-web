import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable, switchMap, map, combineLatest } from 'rxjs';
import {
  SubmissionsConverter,
  Submissions,
  SubmissionWIthStudent,
} from '../types/submission.interface';
import { IUsers, IUsersConverter } from '../types/users.interface';
import { USERS_COLLECTION } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  constructor(private firestore: Firestore) {}
  getAllSubmissionsWithStudentOrderByDesc(): Observable<
    SubmissionWIthStudent[]
  > {
    const submissionsQuery = query(
      collection(this.firestore, 'submissions').withConverter(
        SubmissionsConverter
      ),
      orderBy('createdAt', 'desc')
    );

    return collectionData(submissionsQuery).pipe(
      switchMap((submissions: Submissions[]) => {
        const userObservables = submissions.map((submission) => {
          const userDocRef = doc(
            this.firestore,
            USERS_COLLECTION,
            submission.studentID ?? ''
          ).withConverter(IUsersConverter);
          return docData(userDocRef).pipe(
            map((student: IUsers | undefined) => ({
              student,
              submission,
            }))
          );
        });
        return combineLatest(userObservables);
      })
    );
  }
}
