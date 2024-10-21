import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsers } from '../../types/users.interface';
import { SectionService } from '../../services/section.service';
import { ToastrService } from 'ngx-toastr';
import { ISection } from '../../types/section.interface';

@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrl: './assign-teacher.component.css',
})
export class AssignTeacherComponent {
  activeModal = inject(NgbActiveModal);
  @Input() section!: ISection;
  @Input() current: IUsers | null = null;
  teachers$ = this.userService.getAllTeachers();
  selectedTeacher$: IUsers | null = null;
  constructor(
    private userService: UsersService,
    private sectionService: SectionService,
    private toastr: ToastrService
  ) {}

  selectTeacher(user: IUsers) {
    this.selectedTeacher$ = user;
  }
  assign() {
    if (this.selectedTeacher$ != null) {
      this.sectionService
        .assignTeacher(this.section.id, this.current, this.selectedTeacher$)
        .then(() => this.toastr.success('Assign Successful'))
        .catch((err) => this.toastr.error(err['message'] ?? 'unknown error'))
        .finally(() => this.activeModal.close());
    }
  }
}
