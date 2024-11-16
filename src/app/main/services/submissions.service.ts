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
import { Observable, switchMap, map, combineLatest, of, mergeMap } from 'rxjs';
import {
  SubmissionsConverter,
  Submissions,
  SubmissionWIthStudentSubjectAndSection,
} from '../types/submission.interface';
import { IUsers, IUsersConverter } from '../types/users.interface';
import { USERS_COLLECTION, UsersService } from './users.service';
import { SubjectService } from '../../services/subject.service';
import { UserWithSection } from '../types/UserWithSection';
import { Subjects } from '../types/subjects';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  constructor(
    private firestore: Firestore,
    private userService: UsersService,
    private subjectService: SubjectService
  ) {}

  getAllSubmissionsWithStudentOrderByDesc(): Observable<
    SubmissionWIthStudentSubjectAndSection[]
  > {
    const submissionsQuery = query(
      collection(this.firestore, 'submissions').withConverter(
        SubmissionsConverter
      ),
      orderBy('createdAt', 'desc')
    );

    return collectionData(submissionsQuery).pipe(
      mergeMap(async (submissions) => {
        const results: SubmissionWIthStudentSubjectAndSection[] = [];
        for (const submission of submissions) {
          const studentID = submission.studentID;
          const subjectID = submission.subjectID;

          const [userWithSection, subject] = await Promise.all([
            studentID
              ? this.userService.getUserWithSection(studentID)
              : Promise.resolve(null),
            subjectID
              ? this.subjectService.getSubjectByID(subjectID)
              : Promise.resolve(null),
          ]);

          results.push({
            student: userWithSection,
            submission: submission,
            subject: subject,
          });
        }
        return results;
      }),
      map((data) => data as SubmissionWIthStudentSubjectAndSection[])
    );
  }
}
