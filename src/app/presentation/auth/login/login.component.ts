import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

  providers: [MessageService, DialogService],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm$: FormGroup | undefined;
  ref: DynamicDialogRef | undefined;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loginForm$ = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  login() {
    this.messageService.add({
      severity: 'success',
      summary: 'Logged in',
      detail: `Welcome ${this.loginForm$?.value.email}`,
    });
  }

  forgotPassword(event: Event): void {
    this.ref = this.dialogService.open(ForgotPasswordComponent, {
      width: '50vw',
      modal: true,

      contentStyle: { overflow: 'auto', padding: '1rem' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      header: 'Forgot Password',
    });
  }
}
