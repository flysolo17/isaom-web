import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import {
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
}
