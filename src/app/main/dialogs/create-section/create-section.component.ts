import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ISection } from '../../types/section.interface';

import { generateRandomString } from '../../../app.module';
import { combineLatest, take } from 'rxjs';
import { SectionService } from '../../services/section.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.css',
})
export class CreateSectionComponent implements OnInit, OnChanges {
  activeModal = inject(NgbActiveModal);
  sectionForm$: FormGroup;
  @Input() sections: string[] = [];
  grades: string[] = [
    'GRADE 1-A',
    'GRADE 1-B',
    'GRADE 2-A',
    'GRADE 2-B',
    'GRADE 3-A',
    'GRADE 3-B',
  ];
  filteredGrades: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private toastr: ToastrService
  ) {
    this.sectionForm$ = fb.nonNullable.group({
      name: [null, Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    this.filteredGrades = this.grades.filter(
      (grade) => !this.sections.includes(grade)
    );
  }
  submit() {
    let data = this.sectionForm$.value;

    let section: ISection = {
      id: generateRandomString(),
      name: data.name ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.sectionService
      .createSection(section)
      .then(() => this.toastr.success('Successfully Added'))
      .catch((err) => this.toastr.error(err['message'] ?? 'Unknown Error'))
      .finally(() => {
        this.activeModal.close();
      });
  }
}
