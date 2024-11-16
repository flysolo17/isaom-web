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
  throwError,
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
import { ToastrService } from 'ngx-toastr';

export const SECTION_COLLECTION = 'sections';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private firestore: Firestore, private toastr: ToastrService) {}
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
  async createSection(section: ISection) {
    const q = query(
      collection(this.firestore, SECTION_COLLECTION).withConverter(
        ISectionConverter
      ),
      where('name', '==', section.name)
    );

    const querySnapshot = await getDocs(q);
    const isAlreadyCreated = !querySnapshot.empty;

    if (isAlreadyCreated) {
      throw new Error('Section already exists.');
    }

    return setDoc(
      doc(collection(this.firestore, SECTION_COLLECTION), section.id),
      section
    );
  }

  editSection(sectionId: string, name: string) {
    return updateDoc(doc(this.firestore, SECTION_COLLECTION, sectionId), {
      name: name,
      updatedAt: new Date(),
    });
  }
  async deleteSection(id: string): Promise<void> {
    try {
      const batch = writeBatch(this.firestore);
      const userDocs = await getDocs(
        collection(this.firestore, USERS_COLLECTION).withConverter(
          IUsersConverter
        )
      );

      userDocs.forEach((userDoc) => {
        batch.update(userDoc.ref, {
          sections: arrayRemove(id),
        });
      });

      batch.delete(doc(this.firestore, SECTION_COLLECTION, id));
      await batch.commit();

      this.toastr.success('Successfully Deleted!');
    } catch (error) {
      this.toastr.error('Error deleting section');
    }
  }

  assignTeacher(sectionID: string, current: IUsers | null, newTeacher: IUsers) {
    const batch = writeBatch(this.firestore);

    if (current !== null) {
      batch.update(
        doc(collection(this.firestore, USERS_COLLECTION), current.id),
        {
          sections: arrayRemove(sectionID),
        }
      );
    }

    batch.update(doc(this.firestore, USERS_COLLECTION, newTeacher.id), {
      sections: arrayUnion(sectionID),
    });

    return batch.commit();
  }
  async getSectionByID(id: string): Promise<ISection | null> {
    const docRef = doc(this.firestore, SECTION_COLLECTION, id).withConverter(
      ISectionConverter
    );
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
}
