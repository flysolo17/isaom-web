import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ISection } from '../../types/section.interface';
import { sectionActions } from '../../store/setions/actions';
import { generateRandomString } from '../../../app.module';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.css',
})
export class CreateSectionComponent {
  activeModal = inject(NgbActiveModal);
  sectionForm$: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.sectionForm$ = fb.nonNullable.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
    });
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
