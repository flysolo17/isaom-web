import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISignLanguageLesson } from '../../types/sign-language-lessons.interface';
import { lessonActions } from '../../store/lessons/actions';
import { generateRandomString } from '../../../app.module';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectLessons,
} from '../../store/lessons/reducers';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateLessonsComponent } from '../../dialogs/create-lessons/create-lessons.component';

@Component({
  selector: 'app-sign-language-lessons',
  templateUrl: './sign-language-lessons.component.html',
  styleUrl: './sign-language-lessons.component.css',
})
export class SignLanguageLessonsComponent implements OnInit {
  modalService = inject(NgbModal);
  lessonState$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    lessons: this.store.select(selectLessons),
    error: this.store.select(selectError),
  });

  constructor(private store: Store, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.store.dispatch(lessonActions.getLessons());
  }

  addLesson() {
    const modal = this.modalService.open(CreateLessonsComponent);
  }

  getSanitizedUrl(videoId: string): SafeResourceUrl {
    const baseUrl = 'https://www.youtube.com/embed/';
    const autoplay = '0'; // Disable autoplay
    const url = `${baseUrl}${videoId}?autoplay=${autoplay}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
