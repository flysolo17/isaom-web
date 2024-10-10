import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import {
  combineLatest,
  from,
  fromEventPattern,
  map,
  mergeMap,
  Observable,
  toArray,
} from 'rxjs';
import {
  ISection,
  ISectionConverter,
  ISectionWithTeachers,
} from '../types/section.interface';
import { generateRandomString } from '../../app.module';
import { USERS_COLLECTION } from './users.service';
import { IUsers, IUsersConverter } from '../types/users.interface';

export const SECTION_COLLECTION = 'sections';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private firestore: Firestore) {}
  getAllSectionWithTeacher(): Observable<ISectionWithTeachers[]> {
    const sectionRef = collection(
      this.firestore,
      SECTION_COLLECTION
    ).withConverter(ISectionConverter);
    const q = query(
      sectionRef,
      orderBy('createdAt', 'desc'),
      orderBy('updatedAt', 'desc')
    );

    return new Observable<ISectionWithTeachers[]>((observer) => {
      onSnapshot(q, (sectionSnapshot) => {
        const sections = sectionSnapshot.docs.map(
          (doc) => doc.data() as ISection
        );
        const sectionObservables = sections.map((section) => {
          const userQuery = query(
            collection(this.firestore, USERS_COLLECTION).withConverter(
              IUsersConverter
            ),
            where('sections', 'array-contains', section.id)
          );

          return new Observable<ISectionWithTeachers>((sectionObserver) => {
            onSnapshot(userQuery, (teacherSnapshot) => {
              const teachers = teacherSnapshot.docs.map(
                (doc) => doc.data() as IUsers
              );
              sectionObserver.next({ section, teachers });
              sectionObserver.complete();
            });
          });
        });

        combineLatest(sectionObservables).subscribe(
          (sectionWithTeachersArray) => {
            observer.next(sectionWithTeachersArray);
          },
          (error) => observer.error(error)
        );
      });
    });
  }
  createSection(section: ISection, teacherID: string) {
    var batch = writeBatch(this.firestore);
    batch.set(
      doc(collection(this.firestore, SECTION_COLLECTION), section.id),
      section
    );
    batch.update(doc(collection(this.firestore, USERS_COLLECTION), teacherID), {
      sections: arrayUnion(section.id),
    });
    return from(batch.commit());
  }
  editSection(sectionId: string, name: string) {
    return updateDoc(doc(this.firestore, SECTION_COLLECTION, sectionId), {
      name: name,
      updatedAt: new Date(),
    });
  }
  deleteSection(id: string) {
    const batch = writeBatch(this.firestore);
    return from(deleteDoc(doc(this.firestore, SECTION_COLLECTION, id)));
  }
}
