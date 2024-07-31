import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { from, fromEventPattern, Observable } from 'rxjs';
import { ISection, ISectionConverter } from '../types/section.interface';
import { generateRandomString } from '../../app.module';

export const SECTION_COLLECTION = 'sections';
@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private firestore: Firestore) {}

  getAllSections(): Observable<ISection[]> {
    const q = query(
      collection(this.firestore, SECTION_COLLECTION).withConverter(
        ISectionConverter
      ),
      orderBy('createdAt', 'desc'),
      orderBy('updatedAt', 'desc')
    );
    return collectionData(q) as Observable<ISection[]>;
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
