import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import {
  Dificulty,
  ISignLanguageLesson,
  ISignLanguageLessonsConverter,
} from '../types/sign-language-lessons.interface';
import { from, Observable } from 'rxjs';
export const SIGN_LANGUAGE_COLLECTIONS = 'sign-language-lessons';
@Injectable({
  providedIn: 'root',
})
export class SignLanguageService {
  constructor(private firestore: Firestore) {}

  //used only to when i add dificulty field
  // async addDificultyField() {
  //   let batch = writeBatch(this.firestore);
  //   const lessons = await getDocs(
  //     collection(this.firestore, SIGN_LANGUAGE_COLLECTIONS).withConverter(
  //       ISignLanguageLessonsConverter
  //     )
  //   );
  //   lessons.forEach((e) => {
  //     batch.update(e.ref, { dificulty: Dificulty.BEGINNER });
  //   });
  //   return batch.commit();
  // }
  addSignLanguageLesson(signLanguageLesson: ISignLanguageLesson) {
    return from(
      setDoc(
        doc(this.firestore, SIGN_LANGUAGE_COLLECTIONS, signLanguageLesson.id),
        signLanguageLesson
      )
    );
  }

  getAllSignLanguageLessons(): Observable<ISignLanguageLesson[]> {
    const q = query(
      collection(this.firestore, SIGN_LANGUAGE_COLLECTIONS).withConverter(
        ISignLanguageLessonsConverter
      ),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q);
  }

  deleteSignLanguageLesson(id: string) {
    return from(deleteDoc(doc(this.firestore, SIGN_LANGUAGE_COLLECTIONS, id)));
  }
  updateSignLanguage(lesson: ISignLanguageLesson) {
    return updateDoc(
      doc(this.firestore, SIGN_LANGUAGE_COLLECTIONS, lesson.id).withConverter(
        ISignLanguageLessonsConverter
      ),
      lesson
    );
  }
}
