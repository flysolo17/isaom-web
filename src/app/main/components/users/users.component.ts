import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { map, Observable } from 'rxjs';
import {
  IUsers,
  UsersWithSections,
  UserType,
} from '../../types/users.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  activeTab = 0;
  searchControl = new FormControl(''); // Create a FormControl for the search term

  selectTab(index: number) {
    this.activeTab = index;
  }

  users$ = this.userService.getAllUsersWithSections();

  // Initialize students$ and teachers$ as observables
  students$: Observable<UsersWithSections[]> = this.getFilteredStudents();
  teachers$: Observable<UsersWithSections[]> = this.getFilteredTeachers();

  constructor(private userService: UsersService) {
    // Listen for changes on the search control
    this.searchControl.valueChanges.subscribe(() => {
      // Reassign the filtered observables
      this.students$ = this.getFilteredStudents();
      this.teachers$ = this.getFilteredTeachers();
    });
  }

  private getFilteredStudents(): Observable<UsersWithSections[]> {
    return this.users$.pipe(
      map((users) =>
        users
          .filter((user) => user.users.type === UserType.STUDENT)
          .filter((user) => this.isUserMatchingSearch(user.users))
      )
    );
  }

  private getFilteredTeachers(): Observable<UsersWithSections[]> {
    return this.users$.pipe(
      map((users) =>
        users
          .filter((user) => user.users.type === UserType.TEACHER)
          .filter((user) => this.isUserMatchingSearch(user.users))
      )
    );
  }

  private isUserMatchingSearch(user: any): boolean {
    const searchTermLower = this.searchControl.value?.toLowerCase(); // Use the value from FormControl
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  }
}
