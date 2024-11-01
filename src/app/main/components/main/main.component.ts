import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAdministrator } from '../../../shared/types/administrator.interface';
import { selectAdmin } from '../../../auth/store/reducers';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  name: string;
  route: string;
  selectedIcon: string;
  unselectedIcon: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  isExpanded$ = new BehaviorSubject<boolean>(false);

  menuItems$: MenuItem[] = [
    {
      name: 'Dashboard',
      route: 'dashboard',
      selectedIcon: 'fa-solid fa-house',
      unselectedIcon: 'fa-regular fa-house',
    },
    {
      name: 'Section',
      route: 'section',
      selectedIcon: 'fa-solid fa-layer-group',
      unselectedIcon: 'fa-regular fa-layer-group',
    },

    {
      name: 'Users',
      route: 'users',
      selectedIcon: 'fa-solid fa-users',
      unselectedIcon: 'fa-regular fa-users',
    },
    {
      name: 'Student Report',
      route: 'student-report',
      selectedIcon: 'fa-solid fa-book',
      unselectedIcon: 'fa-regular fa-book',
    },
    {
      name: 'Sign Language',
      route: 'lessons',
      selectedIcon: 'fa-solid fa-book',
      unselectedIcon: 'fa-regular fa-book',
    },

    {
      name: 'Games',
      route: 'games',
      selectedIcon: 'fa-solid fa-dice',
      unselectedIcon: 'fa-solid fa-dice',
    },
    {
      name: 'Logs',
      route: 'logs',
      selectedIcon: 'fa-solid fa-clipboard-list',
      unselectedIcon: 'fa-solid fa-clipboard-list',
    },

    {
      name: 'Profile',
      route: 'profile',
      selectedIcon: 'fa-solid fa-user',
      unselectedIcon: 'fa-solid fa-user',
    },
  ];
  ngOnInit() {
    this.menuItems$.push();
  }

  expand() {
    // Toggle the current value by emitting the opposite value
    this.isExpanded$.next(!this.isExpanded$.value);
  }

  admin$ = this.store.select(selectAdmin);
  constructor(private store: Store) {}
}
