import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LevelsService } from '../../services/levels.service';
import { Levels } from '../../types/levels.interface';
import { generateRandomString } from '../../../app.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-level',
  templateUrl: './create-level.component.html',
  styleUrl: './create-level.component.css',
})
export class CreateLevelComponent {
  @Input() gameID: string = '';
  activeModal = inject(NgbActiveModal);

  levelForm$: FormGroup;
  selectedFile: File | null = null;
  fileError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private levelService: LevelsService,
    private toastr: ToastrService
  ) {
    this.levelForm$ = this.fb.group({
      question: ['', Validators.required],
      hint: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(1)]],
      answer: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  submit() {
    if (this.levelForm$.invalid || !this.selectedFile) {
      this.fileError = !this.selectedFile;
      return;
    }

    let level: Levels = {
      id: generateRandomString(12),
      question: this.levelForm$.value.question,
      image: '', // Will be set after upload
      hint: this.levelForm$.value.hint,
      points: this.levelForm$.value.points,
      answer: this.levelForm$.value.answer,
      createdAt: new Date(),
    };

    this.levelService
      .addLevels(this.gameID, level, this.selectedFile)

      .finally(() => {
        this.levelForm$.reset();
        this.selectedFile = null;
        this.activeModal.close();
      });
  }
}
