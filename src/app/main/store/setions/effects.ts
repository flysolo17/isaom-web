import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SectionService } from '../../services/section.service';
import { Injectable } from '@angular/core';
import { sectionActions } from './actions';
import { catchError, delay, exhaustMap, map, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

@Injectable()
export class SectionEffects {
  getSectionsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(sectionActions.getAllSections),
      exhaustMap(() =>
        this.sectionService.getAllSectionWithTeacher().pipe(
          map((data) => {
            console.log(data);
            return sectionActions.getSectionsSuccess({ sections: data });
          }),
          catchError((err) => {
            return of(
              sectionActions.getSectionsFailure({
                message: err.message.toString(),
              })
            );
          })
        )
      )
    )
  );

  getAllTeachersEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(sectionActions.getAllTeachers),
      exhaustMap(() =>
        this.usersService.getAllTeachers().pipe(
          map((data) => {
            console.log(data);
            return sectionActions.getAllTeachersSuccess({ data: data });
          }),
          catchError((err) => {
            return of(
              sectionActions.getAllTeachersFailure({
                message: err.message.toString(),
              })
            );
          })
        )
      )
    )
  );

  createSectionEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(sectionActions.createSection),
      exhaustMap(({ section }) =>
        this.sectionService.createSection(section).pipe(
          map(() => sectionActions.creationSuccess({ section: section })),
          catchError((err) =>
            of(
              sectionActions.creationFailure({
                message: err['message'].toString(),
              })
            )
          )
        )
      )
    )
  );
  creationSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sectionActions.creationSuccess),
        delay(1000),
        tap(({ section }) => {
          this.toastr.success('Successfully Added!');
        })
      );
    },
    { functional: true, dispatch: false }
  );
  creationFailuire = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sectionActions.creationFailure),
        delay(1000),
        tap(({ message }) => {
          this.toastr.success(message);
        })
      );
    },
    { functional: true, dispatch: false }
  );

  deleteSectionEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(sectionActions.deleteSection),
      exhaustMap(({ id }) =>
        this.sectionService.deleteSection(id).pipe(
          map(() => sectionActions.deleteSuccess()),
          catchError((err) =>
            of(
              sectionActions.deleteFailure({
                message: err['message'].toString(),
              })
            )
          )
        )
      )
    )
  );

  deleteSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sectionActions.deleteSuccess),
        delay(1000),
        tap(() => {
          this.toastr.success('Successfully Deleted!');
        })
      );
    },
    { functional: true, dispatch: false }
  );
  deleteFailed = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sectionActions.deleteFailure),
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
    private sectionService: SectionService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}
}
