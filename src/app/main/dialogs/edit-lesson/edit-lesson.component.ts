import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ISignLanguageLesson } from '../../types/sign-language-lessons.interface';
import { SignLanguageService } from '../../services/sign-language.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css',
})
export class EditLessonComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() lesson!: ISignLanguageLesson;
  lessonForm$: FormGroup;
  constructor(
    private fb: FormBuilder,
    private lessonService: SignLanguageService,
    private toastr: ToastrService
  ) {
    this.lessonForm$ = fb.nonNullable.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      videoId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.lessonForm$.patchValue({
      title: this.lesson.title,
      desc: this.lesson.desc,
      videoId: this.lesson.videoId,
    });
  }

  saveLesson() {
    let data = this.lessonForm$.value;
    let result = {
      ...this.lesson,
      title: data.title,
      desc: data.desc,
      videoId: data.videoId,
    };
    if (this.lessonForm$.invalid) {
      this.toastr.error('Please fill up all form');
      return;
    }
    this.lessonService
      .updateSignLanguage(result)
      .then(() => this.toastr.success('Successfully Updated!'))
      .catch((err) => this.toastr.error(err['message']))
      .finally(() => {
        this.lessonForm$.reset();
        this.activeModal.close();
      });
  }
}
