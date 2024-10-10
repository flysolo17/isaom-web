import { Component, inject, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITranslations } from '../../types/translation.interface';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { loadBundle } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { EditTranslationComponent } from '../../dialogs/edit-translation/edit-translation.component';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ViewTranslationComponent } from '../../dialogs/view-translation/view-translation.component';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
})
export class LogsComponent implements OnInit {
  modalService = inject(NgbModal);
  translations$: Observable<ITranslations[]> = of([]);

  filter = new FormControl('', { nonNullable: true });

  filteredTranslations$: Observable<ITranslations[]> = of([]);

  constructor(private logService: LogsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.translations$ = this.logService.getTranslations();
    this.filteredTranslations$ = combineLatest([
      this.translations$,
      this.filter.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([translations, text]) =>
        translations.filter(
          (translation) =>
            translation.text.toLowerCase().includes(text.toLowerCase()) ||
            translation.translation.toLowerCase().includes(text.toLowerCase())
        )
      )
    );
  }

  // search(text: string): Observable<ITranslations[]> {
  //   return this.translations$.pipe(
  //     map((translations) =>
  //       translations.filter(
  //         (translation) =>
  //           translation.text.toLowerCase().includes(text.toLowerCase()) ||
  //           translation.translation.toLowerCase().includes(text.toLowerCase())
  //       )
  //     )
  //   );
  // }

  delete(translations: ITranslations) {
    const modal = this.modalService.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delete this translation?`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.deletionConfirmed(translations.id);
      }
    });
  }
  edit(translation: ITranslations) {
    const modal = this.modalService.open(EditTranslationComponent, {});
    modal.componentInstance.translation = translation;
  }
  deletionConfirmed(id: string) {
    this.logService
      .delete(id)
      .then(() => this.toastr.success('Succesfully Deleted!'))
      .catch((err) => this.toastr.error(err['message'] ?? 'unknown error'));
  }

  viewTranslation(translation: ITranslations) {
    const modal = this.modalService.open(ViewTranslationComponent);
    modal.componentInstance.translation = translation;
  }
}
