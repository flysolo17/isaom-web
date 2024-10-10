import { Component, Inject, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ISectionWithTeachers } from '../../types/section.interface';
import { IUsers, UserType } from '../../types/users.interface';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrl: './view-section.component.css',
})
export class ViewSectionComponent {
  activeOffCanvas = inject(NgbActiveOffcanvas);
  @Input() section!: ISectionWithTeachers;

  getTeachers(): IUsers[] {
    return this.section.teachers.filter((e) => e.type == UserType.TEACHER);
  }

  getStudents(): IUsers[] {
    return this.section.teachers.filter((e) => e.type == UserType.STUDENT);
  }
}
