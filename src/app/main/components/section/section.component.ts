import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectSections,
} from '../../store/setions/reducers';
import { sectionActions } from '../../store/setions/actions';
import { ISection, ISectionWithTeachers } from '../../types/section.interface';
import {
  NgbModal,
  NgbOffcanvas,
  NgbOffcanvasConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { CreateSectionComponent } from '../../dialogs/create-section/create-section.component';
import { IUsers, UserType } from '../../types/users.interface';
import { EditSectionComponent } from '../../dialogs/edit-section/edit-section.component';
import { ViewSectionComponent } from '../../dialogs/view-section/view-section.component';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  modal = inject(NgbModal);
  private offcanvasService = inject(NgbOffcanvas);
  sectionState$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    sections: this.store.select(selectSections),
    errors: this.store.select(selectError),
  });
  constructor(private store: Store, config: NgbOffcanvasConfig) {
    config.position = 'end';
  }
  ngOnInit(): void {
    this.store.dispatch(sectionActions.getAllSections());
  }
  viewSection(section: ISectionWithTeachers) {
    const canvas = this.offcanvasService.open(ViewSectionComponent, {});
    canvas.componentInstance.section = section;
  }
  submit() {
    const modal = this.modal.open(CreateSectionComponent);
  }

  getTeacher(section: ISectionWithTeachers): IUsers[] {
    return section.teachers.filter((e) => e.type == UserType.TEACHER);
  }

  deleteSection(section: ISection) {
    const modal = this.modal.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delete this section ? 
    By doing so, all data about this
     section will be deleted including subjects,modules and activities.`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.store.dispatch(sectionActions.deleteSection({ id: section.id }));
      }
    });
  }
  getStudentCount(section: ISectionWithTeachers): number {
    let students = section.teachers.filter((e) => e.type == UserType.STUDENT);
    return students.length;
  }
  editSection(section: ISectionWithTeachers) {
    const modal = this.modal.open(EditSectionComponent);
    modal.componentInstance.section = section.section;
  }
}
