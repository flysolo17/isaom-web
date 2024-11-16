import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { subjectConverter, Subjects } from '../main/types/subjects';

export const SUBJECTS_COLLECTION = 'subjects';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private firestore: Firestore) {}

  async getSubjectByID(id: string): Promise<Subjects | null> {
    const docRef = doc(this.firestore, SUBJECTS_COLLECTION, id).withConverter(
      subjectConverter
    );
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
}
