import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { authActions } from './actions';
import { catchError, delay, exhaustMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  //login
  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((admin) => authActions.loginSuccess({ currentUser: admin })),
          catchError((err) => {
            console.log(err);
            return of(
              authActions.loginFailed({ message: err['message'].toString() })
            );
          })
        )
      )
    )
  );
  loginSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.loginSuccess),
        delay(1000),
        tap(({ currentUser }) => {
          if (currentUser) {
            this.toastr.success('Successfully Logged in!');
            this.router.navigate(['main']);
          } else {
            this.toastr.error('unknown error');
            this.router.navigate(['login']);
          }
        })
      );
    },
    { functional: true, dispatch: false }
  );
  loginFailed = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.loginFailed),
        tap(({ message }) => {
          if (message !== null) {
            this.toastr.error(message);
          }
          this.router.navigate(['login']);
        })
      );
    },
    { functional: true, dispatch: false }
  );

  getCurrentUserEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getCurrentUser),
      exhaustMap(() =>
        this.authService.getCurrentUser().pipe(
          delay(1000),
          map((admin) => {
            return admin !== null
              ? authActions.loginSuccess({ currentUser: admin })
              : authActions.loginFailed({ message: null });
          }),
          catchError((err) => {
            console.log(err);
            return of(authActions.loginFailed({ message: err['message'] }));
          })
        )
      )
    )
  );

  //sign out
  signOut = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signOut),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map((admin) => authActions.signSuccess()),
          catchError((err) => of(authActions.signFailed()))
        )
      )
    )
  );
  signOutSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.signSuccess),
        tap(() => {
          this.router.navigate(['login']);
        })
      );
    },
    { functional: true, dispatch: false }
  );
  signOutFailed = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authActions.signFailed),
        tap(() => {})
      );
    },
    { functional: true, dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
