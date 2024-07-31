import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectSections,
} from '../../store/setions/reducers';
import { sectionActions } from '../../store/setions/actions';
import { ISection } from '../../types/section.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateSectionComponent } from '../../dialogs/create-section/create-section.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  modal = inject(NgbModal);
  sectionState$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    sections: this.store.select(selectSections),
    errors: this.store.select(selectError),
  });
  constructor(private store: Store) {}
  ngOnInit(): void {}
  submit() {
    const modal = this.modal.open(CreateSectionComponent);
  }

  deleteSection(id: string) {
    this.store.dispatch(sectionActions.deleteSection({ id: id }));
  }
}
