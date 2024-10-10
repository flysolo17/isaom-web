import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  @Input() message : string=  ""
  activeModal = inject(NgbActiveModal)
  
  confirm() {
    this.activeModal.close("YES")
  }
  cancelled() {
    this.activeModal.close()
  }
}
