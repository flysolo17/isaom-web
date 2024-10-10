import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITranslations } from '../../types/translation.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LogsService } from '../../services/logs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-translation',
  templateUrl: './edit-translation.component.html',
  styleUrl: './edit-translation.component.css',
})
export class EditTranslationComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() translation!: ITranslations;
  translationForm$: FormGroup;

  constructor(
    private fb: FormBuilder,
    private logService: LogsService,
    private toastr: ToastrService
  ) {
    this.translationForm$ = fb.nonNullable.group({
      text: [''],
      translation: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.translationForm$.patchValue({
      text: this.translation.text,
      translation: this.translation.translation,
    });
  }
  submit(): void {
    if (this.translationForm$.valid) {
      const text =
        this.translationForm$.get('translation')?.value ??
        this.translation.translation;
      this.logService
        .update(this.translation.id, text)
        .then(() => this.toastr.success('Successfully Updated!'))
        .catch((err) => this.toastr.error(err['message'] ?? 'unknown error'))
        .finally(() => {
          this.translationForm$.reset();
          this.activeModal.close();
        });
    } else {
      this.toastr.error('Something went wrong!');
    }
  }
}
