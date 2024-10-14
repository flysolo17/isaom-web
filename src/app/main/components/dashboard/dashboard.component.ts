import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from '../../../auth/store/actions';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Observable, map } from 'rxjs';
import { UsersWithSections, UserType } from '../../types/users.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  users$ = this.userService.getAllUsersWithSections();

  students$: Observable<UsersWithSections[]> = this.users$.pipe(
    map((users) => users.filter((user) => user.users.type === UserType.STUDENT))
  );

  teachers$: Observable<UsersWithSections[]> = this.users$.pipe(
    map((users) => users.filter((user) => user.users.type === UserType.TEACHER))
  );
  constructor(
    private store: Store,
    private router: Router,
    private userService: UsersService
  ) {}
  click() {
    this.store.dispatch(authActions.signOut());
  }
}
