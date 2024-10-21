import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';
import { levelConverter, Levels } from '../types/levels.interface';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GAME_COLLECTION } from './game.service';
import { generateRandomString } from '../../app.module';
export const LEVELS_COLLECTION = 'levels';
@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private levelsRef$: CollectionReference;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private toastr: ToastrService
  ) {
    this.levelsRef$ = collection(firestore, LEVELS_COLLECTION);
  }

  async addLevels(gameID: string, levels: Levels, file: File): Promise<void> {
    try {
      const fireRef = ref(
        this.storage,
        `${LEVELS_COLLECTION}/${generateRandomString(8)}`
      );

      const snapshot = await uploadBytes(fireRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Create the question entry in Firestore
      const newQuestion: Levels = {
        ...levels,
        image: downloadURL,
        createdAt: new Date(),
      };

      await setDoc(
        doc(
          collection(
            this.firestore,
            `${GAME_COLLECTION}/${gameID}/${LEVELS_COLLECTION}`
          ),
          newQuestion.id
        ),
        newQuestion
      );

      this.toastr.success('Successfully Added!');
    } catch (error) {
      this.toastr.error('Error creating question');
    }
  }

  async deleteLevels(gameID: string, level: Levels): Promise<void> {
    try {
      // Delete the question document from Firestore
      await deleteDoc(
        doc(
          collection(
            this.firestore,
            `${GAME_COLLECTION}/${gameID}/${LEVELS_COLLECTION}`
          ),
          level.id
        )
      );
      // Delete the question image from Firebase Storage
      await deleteObject(ref(this.storage, level.image));

      this.toastr.success('Successfully Deleted!');
    } catch (error) {
      console.log(error);
      this.toastr.error('Error Deleting question');
    }
  }

  getAllQuestions(gameID: string): Observable<Levels[]> {
    const q = query(
      collection(
        this.firestore,
        `${GAME_COLLECTION}/${gameID}/${LEVELS_COLLECTION}`
      ).withConverter(levelConverter),
      orderBy('createdAt', 'asc')
    );
    return collectionData(q);
  }
}
