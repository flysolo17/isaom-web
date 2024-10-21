import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISection } from '../../types/section.interface';

import { SectionService } from '../../services/section.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrl: './edit-section.component.css',
})
export class EditSectionComponent implements OnInit {
  @Input() section!: ISection;
  activeModal = inject(NgbActiveModal);
  sectionForm$: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private toastr: ToastrService
  ) {
    this.sectionForm$ = fb.nonNullable.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.sectionForm$.patchValue({
      name: [this.section.name],
    });
  }

  submit() {
    let data = this.sectionForm$.value;

    this.sectionService
      .editSection(this.section.id, data.name)
      .then((data) => {
        this.toastr.success('Succesfully updated!');
      })
      .catch((err) => this.toastr.error(err['message']))
      .finally(() => {
        this.activeModal.close();
      });
  }
}
