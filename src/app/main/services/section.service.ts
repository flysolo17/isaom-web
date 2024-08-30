import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import {
  from,
  fromEventPattern,
  map,
  mergeMap,
  Observable,
  toArray,
} from 'rxjs';
import { ISection, ISectionConverter } from '../types/section.interface';
import { generateRandomString } from '../../app.module';
import { USERS_COLLECTION } from './users.service';
import { IUsers } from '../types/users.interface';

export const SECTION_COLLECTION = 'sections';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private firestore: Firestore) {}
  getAllSectionWithTeacher(): Observable<ISection[]> {
    const q = query(
      collection(this.firestore, SECTION_COLLECTION).withConverter(
        ISectionConverter
      ),
      orderBy('createdAt', 'desc'),
      orderBy('updatedAt', 'desc')
    );

    return collectionData(q).pipe(
      mergeMap((sections) => {
        return from(sections).pipe(
          mergeMap((section: ISection) =>
            from(
              getDoc(doc(this.firestore, USERS_COLLECTION, section.teacher))
            ).pipe(
              map((teacherDoc) => {
                const teacher = teacherDoc.data() as IUsers;
                return { ...section, teacher: teacher.name };
              })
            )
          ),
          toArray()
        );
      })
    );
  }
  createSection(section: ISection) {
    return from(
      setDoc(
        doc(collection(this.firestore, SECTION_COLLECTION), section.id),
        section
      )
    );
  }
  deleteSection(id: string) {
    return from(deleteDoc(doc(this.firestore, SECTION_COLLECTION, id)));
  }
}
