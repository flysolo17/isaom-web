import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
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
import { gameConverter } from '../types/games.interface';
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
      const batch = writeBatch(this.firestore);

      const fireRef = ref(
        this.storage,
        `${LEVELS_COLLECTION}/${generateRandomString(8)}`
      );
      const snapshot = await uploadBytes(fireRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const newQuestion: Levels = {
        ...levels,
        image: downloadURL,
        createdAt: new Date(),
      };

      const gameRef = doc(
        this.firestore,
        GAME_COLLECTION,
        gameID
      ).withConverter(gameConverter);

      batch.update(gameRef, {
        questions: arrayUnion(newQuestion.id),
      });

      const levelDocRef = doc(
        collection(
          this.firestore,
          `${GAME_COLLECTION}/${gameID}/${LEVELS_COLLECTION}`
        ),
        newQuestion.id
      );
      batch.set(levelDocRef, newQuestion);

      await batch.commit();

      this.toastr.success('Successfully Added!');
    } catch (error) {
      console.error('Error adding levels:', error);
      this.toastr.error('Error creating question');
    }
  }

  async deleteLevels(gameID: string, level: Levels): Promise<void> {
    try {
      const batch = writeBatch(this.firestore);

      const levelDocRef = doc(
        collection(
          this.firestore,
          `${GAME_COLLECTION}/${gameID}/${LEVELS_COLLECTION}`
        ),
        level.id
      );

      batch.delete(levelDocRef);

      const gameRef = doc(
        this.firestore,
        GAME_COLLECTION,
        gameID
      ).withConverter(gameConverter);
      batch.update(gameRef, {
        questions: arrayRemove(level.id),
      });

      await batch.commit();

      await deleteObject(ref(this.storage, level.image));

      this.toastr.success('Successfully Deleted!');
    } catch (error) {
      console.error('Error deleting level:', error);
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
  async editItem(newItem: Levels,newImage : File | null , gameID: string) {
  
    if (newImage !== null) {
      const fireRef = ref(
        this.storage,
        `${LEVELS_COLLECTION}/${generateRandomString(8)}`
      );
      const snapshot = await uploadBytes(fireRef, newImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      newItem.image = downloadURL
    }

    const docRef = doc(
      this.firestore,
      `${GAME_COLLECTION}/${gameID}/${LEVELS_COLLECTION}`,
      newItem.id 
    );
  
    return updateDoc(docRef, { ...newItem });
  }
  
}
