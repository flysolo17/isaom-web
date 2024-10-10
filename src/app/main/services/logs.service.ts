import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  ITranslations,
  ITranslationsConverter,
} from '../types/translation.interface';
import { transition } from '@angular/animations';

export const TRANSLATION_COLLECTION = 'translations';
@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private firestore: Firestore) {}

  getTranslations(): Observable<ITranslations[]> {
    const q = query(
      collection(this.firestore, TRANSLATION_COLLECTION).withConverter(
        ITranslationsConverter
      ),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q);
  }
  delete(id : string) {
    return deleteDoc(doc(this.firestore,TRANSLATION_COLLECTION,id))
  }
  update(id : string,text : string) {
    return updateDoc(
      doc(this.firestore,TRANSLATION_COLLECTION,id),
      {
        translation: text
      }
    )
  }
}
