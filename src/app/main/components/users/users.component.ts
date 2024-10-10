import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { map, Observable } from 'rxjs';
import {
  IUsers,
  UsersWithSections,
  UserType,
} from '../../types/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  activeTab = 0;

  selectTab(index: number) {
    this.activeTab = index;
  }
  users$ = this.userService.getAllUsersWithSections();
  students$: Observable<UsersWithSections[]> = this.users$.pipe(
    map((users) => users.filter((user) => user.users.type === UserType.STUDENT))
  );

  teachers$: Observable<UsersWithSections[]> = this.users$.pipe(
    map((users) => users.filter((user) => user.users.type === UserType.TEACHER))
  );

  constructor(private userService: UsersService) {}
}
