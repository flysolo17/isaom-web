import { Component, inject, Input } from '@angular/core';
import { ITranslations } from '../../types/translation.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-translation',
  templateUrl: './view-translation.component.html',
  styleUrl: './view-translation.component.css',
})
export class ViewTranslationComponent {
  @Input() translation!: ITranslations;
  activeModal = inject(NgbActiveModal);
}
