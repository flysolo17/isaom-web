import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  orderBy,
  query,
  setDoc,
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
import { gameConverter, Games } from '../types/games.interface';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { generateRandomString } from '../../app.module';
import { LEVELS_COLLECTION, LevelsService } from './levels.service';

export const GAME_COLLECTION = 'games';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameRef$: CollectionReference;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private toastr: ToastrService,
    private levelService: LevelsService
  ) {
    this.gameRef$ = collection(firestore, GAME_COLLECTION);
  }

  async createGame(game: Games, file: File): Promise<void> {
    try {
      const fireRef = ref(
        this.storage,
        `${GAME_COLLECTION}/${generateRandomString(8)}`
      );

      const snapshot = await uploadBytes(fireRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Create the game entry in Firestore
      const newGame: Games = {
        ...game,
        cover: downloadURL,
        createdAt: new Date(),
      };

      await setDoc(doc(this.gameRef$, game.id), newGame);
      this.toastr.success('Games created!');
    } catch (error) {
      this.toastr.error('error creating game');
      console.error('Error creating game: ', error);
    }
  }

  async deleteGame(game: Games): Promise<void> {
    try {
      const batch = writeBatch(this.firestore);
      const levelRef = collection(
        this.firestore,
        `${GAME_COLLECTION}/${game.id}/${LEVELS_COLLECTION}`
      );

      const levelsSnapshot = await getDocs(levelRef);
      levelsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      // Delete the cover image from Firebase Storage
      await deleteObject(ref(this.storage, game.cover));

      // Delete the game document from Firestore
      await deleteDoc(doc(this.gameRef$, game.id));

      this.toastr.success('Successfully Deleted');
    } catch (error) {
      this.toastr.error('Error deleting game');
    }
  }

  getAllGames(): Observable<Games[]> {
    const q = query(
      this.gameRef$.withConverter(gameConverter),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q);
  }

  getGameByID(id: string) {
    const q = doc(this.gameRef$, id);
    return docData(q.withConverter(gameConverter));
  }
}
