import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ISection } from '../../types/section.interface';
import { sectionActions } from '../../store/setions/actions';
import { generateRandomString } from '../../../app.module';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectTeachers,
} from '../../store/setions/reducers';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.css',
})
export class CreateSectionComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  sectionForm$: FormGroup;

  createSectionState = combineLatest({
    teachers: this.store.select(selectTeachers),
    error: this.store.select(selectError),
    loading: this.store.select(selectIsLoading),
  });
  constructor(private fb: FormBuilder, private store: Store) {
    this.sectionForm$ = fb.nonNullable.group({
      name: ['', Validators.required],
      teacher: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.store.dispatch(sectionActions.getAllTeachers());
  }
  submit() {
    let data = this.sectionForm$.value;
    let section: ISection = {
      id: generateRandomString(),
      name: data.name ?? '',
      teacher: data.teacher ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.store.dispatch(sectionActions.createSection({ section }));
    this.activeModal.close();
  }
}
