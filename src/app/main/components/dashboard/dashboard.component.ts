import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from '../../../auth/store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private store: Store, private router: Router) {}
  click() {
    this.store.dispatch(authActions.signOut());
  }
}
