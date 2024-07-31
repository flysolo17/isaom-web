import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignLanguageService } from '../../services/sign-language.service';
import { Injectable } from '@angular/core';
import { lessonActions } from './actions';
import { catchError, delay, exhaustMap, map, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class LessonsEffects {
  getLessonsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(lessonActions.getLessons),
      exhaustMap(() =>
        this.signLanguageService.getAllSignLanguageLessons().pipe(
          map((data) => lessonActions.getLessonsSuccess({ data })),
          catchError((err) =>
            of(
              lessonActions.getLessonsFailed({
                message: err['message'].toString(),
              })
            )
          )
        )
      )
    )
  );

  createLessonEffecct = createEffect(() =>
    this.actions$.pipe(
      ofType(lessonActions.addLesson),
      exhaustMap(({ lesson }) =>
        this.signLanguageService.addSignLanguageLesson(lesson).pipe(
          map(() => lessonActions.addLessonSuccess()),
          catchError((err) =>
            of(
              lessonActions.addLessonFailed({
                message: err['message'].toString(),
              })
            )
          )
        )
      )
    )
  );
  addLessonSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(lessonActions.addLessonSuccess),
        delay(1000),
        tap(() => {
          this.toastr.success('Successfully Added!');
        })
      );
    },
    { functional: true, dispatch: false }
  );
  creationFailuire = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(lessonActions.addLessonFailed),
        delay(1000),
        tap(({ message }) => {
          this.toastr.success(message);
        })
      );
    },
    { functional: true, dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private signLanguageService: SignLanguageService,
    private toastr: ToastrService
  ) {}
}
