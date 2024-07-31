import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'isaom-web';
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
