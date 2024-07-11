import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';

import { SidebarModule } from 'primeng/sidebar';

import { CheckboxModule } from 'primeng/checkbox';

import { InputTextModule } from 'primeng/inputtext';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenubarModule } from 'primeng/menubar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './presentation/auth/login/login.component';
import { ForgotPasswordComponent } from './presentation/auth/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'isaom-dd242',
        appId: '1:1093266505221:web:5e0f8217880d209435666c',
        storageBucket: 'isaom-dd242.appspot.com',
        apiKey: 'AIzaSyCQMGwI2Ojfci47XJ9Qsi07SGKl-jvP3jY',
        authDomain: 'isaom-dd242.firebaseapp.com',
        messagingSenderId: '1093266505221',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
