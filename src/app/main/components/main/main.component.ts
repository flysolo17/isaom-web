import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAdministrator } from '../../../shared/types/administrator.interface';
import { selectAdmin } from '../../../auth/store/reducers';
import { Observable } from 'rxjs';
import { sectionActions } from '../../store/setions/actions';

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
  isExpanded$ = false;

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
      name: 'Logs',
      route: 'logs',
      selectedIcon: 'fa-solid fa-clipboard-list',
      unselectedIcon: 'fa-solid fa-clipboard-list',
    },
  ];
  ngOnInit() {
    this.store.dispatch(sectionActions.getAllSections());
    this.menuItems$.push();
    this.detectScreenSizes();
  }

  expand() {
    this.isExpanded$ = !this.isExpanded$;
  }

  detectScreenSizes() {
    const isLargeScreen = window.matchMedia('(min-width: 992px)').matches;
    this.isExpanded$ = !isLargeScreen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.detectScreenSizes();
  }

  admin$ = this.store.select(selectAdmin);
  constructor(private store: Store) {}
}
