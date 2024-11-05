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
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
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
import {
  catchError,
  combineLatest,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { generateRandomString } from '../../app.module';
import { LEVELS_COLLECTION, LevelsService } from './levels.service';
import { User } from '@angular/fire/auth';
import {
  UserWithGameSubmissions,
  GameSubmission,
  GameSubmissionConverter,
} from '../types/game.submissions';
import { USERS_COLLECTION } from './users.service';
import { IUsersConverter } from '../types/users.interface';
import { MatchesWithGame } from '../types/MatchWithGame';

export const GAME_COLLECTION = 'games';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private GAME_SUBMISSIONS = 'matches';
  private USERS_COLLECTION = 'users';
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

  async updateGame(game: Games, file?: File): Promise<void> {
    try {
      let downloadURL = game.cover;

      if (file) {
        const fireRef = ref(
          this.storage,
          `${GAME_COLLECTION}/${generateRandomString(8)}`
        );

        const snapshot = await uploadBytes(fireRef, file);
        downloadURL = await getDownloadURL(snapshot.ref);
      }

      // Update the game entry in Firestore
      const updatedGame: Games = {
        ...game,
        cover: downloadURL,
      };

      await setDoc(doc(this.gameRef$, game.id), updatedGame);
      this.toastr.success('Game updated successfully!');
    } catch (error) {
      this.toastr.error('Error updating game');
      console.error('Error updating game:', error);
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

      await deleteObject(ref(this.storage, game.cover));

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

  getScores(): Observable<UserWithGameSubmissions[]> {
    const subQuery = query(
      collection(this.firestore, this.GAME_SUBMISSIONS).withConverter(
        GameSubmissionConverter
      )
    );
    const userQuery = query(
      collection(this.firestore, this.USERS_COLLECTION).withConverter(
        IUsersConverter
      )
    );
    const submissions$ = collectionData(subQuery);
    const users$ = collectionData(userQuery);

    return combineLatest([submissions$, users$]).pipe(
      map(([submissions, users]) => {
        const groupedSubmissions = submissions.reduce((acc, submission) => {
          const userGroup = acc[submission.userID] || [];
          userGroup.push(submission);
          acc[submission.userID] = userGroup;
          return acc;
        }, {} as { [userID: string]: GameSubmission[] });

        const userWithScores: UserWithGameSubmissions[] = Object.entries(
          groupedSubmissions
        )
          .map(([userID, userSubmissions]) => {
            const user = users.find((u) => u.id === userID);
            if (!user) return null;

            const highestScoresPerGame = this.getHighestScores(userSubmissions);
            const totalScore = highestScoresPerGame.reduce(
              (sum, sub) => sum + sub.score,
              0
            );

            return { user, submissions: highestScoresPerGame, totalScore };
          })
          .filter((entry): entry is UserWithGameSubmissions => entry !== null);

        return userWithScores;
      }),
      catchError((error) => {
        console.error('Error fetching data', error);
        return of([]);
      })
    );
  }

  private getHighestScores(submissions: GameSubmission[]): GameSubmission[] {
    const gameScoresMap = new Map<string, GameSubmission>();
    submissions.forEach((submission) => {
      const existing = gameScoresMap.get(submission.gameID);
      if (!existing || submission.score > existing.score) {
        gameScoresMap.set(submission.gameID, submission);
      }
    });
    return Array.from(gameScoresMap.values());
  }
  getMatchesByUID(uid: string): Observable<MatchesWithGame[]> {
    const q = query(
      collection(this.firestore, this.GAME_SUBMISSIONS).withConverter(
        GameSubmissionConverter
      ),
      where('userID', '==', uid)
    );
    return collectionData(q).pipe(
      switchMap((submissions: GameSubmission[]) => {
        console.log('Game Submissions : ', submissions);
        const uniqueGameIDs = [
          ...new Set(submissions.map((submission) => submission.gameID)),
        ];
        const gameQuery = query(
          collection(this.firestore, GAME_COLLECTION).withConverter(
            gameConverter
          ),
          where('id', 'in', uniqueGameIDs)
        );
        const games$ = from(getDocs(gameQuery)).pipe(
          map((snapshot) => snapshot.docs.map((doc) => doc.data() as Games))
        );
        return combineLatest([games$]).pipe(
          map(([games]) => {
            const matchesWithGames: MatchesWithGame[] = games.map((game) => ({
              game: game || null,
              matches: submissions.filter(
                (submission) => submission.gameID === game.id
              ),
            }));
            return matchesWithGames;
          })
        );
      })
    );
  }
}
