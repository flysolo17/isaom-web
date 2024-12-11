import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Dificulty,
  ISignLanguageLesson,
} from '../../types/sign-language-lessons.interface';
import { generateRandomString } from '../../../app.module';
import { Store } from '@ngrx/store';
import { lessonActions } from '../../store/lessons/actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-lessons',
  templateUrl: './create-lessons.component.html',
  styleUrl: './create-lessons.component.css',
})
export class CreateLessonsComponent {
  activeModal = inject(NgbActiveModal);
  lessonForm$: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService
  ) {
    this.lessonForm$ = fb.nonNullable.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      videoId: ['', Validators.required],
      dificulty: [Dificulty.BEGINNER, Validators.required],
    });
  }
  createLesson() {
    let data = this.lessonForm$.value;
    let lesson: ISignLanguageLesson = {
      id: generateRandomString(),
      title: data.title ?? '',
      desc: data.desc ?? '',
      videoId: data.videoId ?? '',
      createdAt: new Date(),
      dificulty: data.dificulty ?? Dificulty.BEGINNER,
    };
    if (this.lessonForm$.invalid) {
      this.toastr.error('Please fill up all form');
      return;
    }
    this.store.dispatch(lessonActions.addLesson({ lesson }));
  }
}
