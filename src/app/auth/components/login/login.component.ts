import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { combineLatest } from 'rxjs';
import {
  selectAdmin,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  modalService = inject(NgbModal);
  loginState$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    admin: this.store.select(selectAdmin),
    errors: this.store.select(selectError),
  });
  loginForm$: FormGroup;
  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm$ = fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {}

  login() {
    if (this.loginForm$.valid) {
      this.store.dispatch(authActions.login(this.loginForm$.getRawValue()));
    }
  }
  forgotPassword() {
    const modal = this.modalService.open(ForgotPasswordComponent);
  }
}
