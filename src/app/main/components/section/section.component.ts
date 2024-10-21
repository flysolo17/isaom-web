import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';

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
import { SectionService } from '../../services/section.service';
import { AssignTeacherComponent } from '../../dialogs/assign-teacher/assign-teacher.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  modal = inject(NgbModal);
  private offcanvasService = inject(NgbOffcanvas);
  sectionWithUsers$: Observable<ISectionWithTeachers[]> =
    this.sectionService.getAllSectionWithTeacher();

  constructor(
    private store: Store,
    config: NgbOffcanvasConfig,
    private sectionService: SectionService
  ) {
    config.position = 'end';
  }
  ngOnInit(): void {}
  viewSection(section: ISectionWithTeachers) {
    const canvas = this.offcanvasService.open(ViewSectionComponent, {});
    canvas.componentInstance.section = section;
  }
  submit() {
    const modal = this.modal.open(CreateSectionComponent);
    this.sectionWithUsers$
      .pipe(map((state) => state.map((section) => section.section.name)))
      .subscribe((sectionNames) => {
        modal.componentInstance.sections = sectionNames;
      });
  }

  getTeacher(section: ISectionWithTeachers): IUsers[] {
    return section.teachers.filter((e) => e.type == UserType.TEACHER);
  }

  openAssign(section: ISectionWithTeachers) {
    const modal = this.modal.open(AssignTeacherComponent);
    (modal.componentInstance.section = section.section),
      (modal.componentInstance.current = section.teachers[0] ?? null);
  }
  deleteSection(section: ISection) {
    const modal = this.modal.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delete this section ? 
    By doing so, all data about this
     section will be deleted including subjects,modules and activities.`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.sectionService.deleteSection(section.id);
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
