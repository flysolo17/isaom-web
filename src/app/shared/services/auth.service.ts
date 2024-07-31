import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import {
  IAdministrator,
  IAdministratorConventer,
} from '../types/administrator.interface';
import { delay, from, map, Observable, of, switchMap } from 'rxjs';

export const ADMINISTRATOR_COLLECTION = 'administrator';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  login(email: string, password: string): Observable<IAdministrator> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((data) => {
        const docRef = doc(
          this.firestore,
          ADMINISTRATOR_COLLECTION,
          data.user.uid
        ).withConverter(IAdministratorConventer);
        return docData(docRef) as Observable<IAdministrator>;
      })
    );
  }

  getCurrentUser(): Observable<IAdministrator | null> {
    return authState(this.auth).pipe(
      switchMap((data) => {
        if (data !== null) {
          const docRef = doc(
            this.firestore,
            ADMINISTRATOR_COLLECTION,
            data?.uid ?? ''
          ).withConverter(IAdministratorConventer);
          return docData(docRef) as Observable<IAdministrator>;
        }
        return of(null);
      })
    );
  }

  logout() {
    return from(signOut(this.auth));
  }
}