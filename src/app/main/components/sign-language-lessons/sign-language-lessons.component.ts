import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Dificulty,
  ISignLanguageLesson,
} from '../../types/sign-language-lessons.interface';
import { lessonActions } from '../../store/lessons/actions';
import { generateRandomString } from '../../../app.module';
import { combineLatest, map } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectLessons,
} from '../../store/lessons/reducers';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateLessonsComponent } from '../../dialogs/create-lessons/create-lessons.component';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { EditLessonComponent } from '../../dialogs/edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-sign-language-lessons',
  templateUrl: './sign-language-lessons.component.html',
  styleUrl: './sign-language-lessons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignLanguageLessonsComponent implements OnInit {
  modalService = inject(NgbModal);
  lessonState$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  tabs: string[] = [
    'ALL',
    Dificulty.BEGINNER,
    Dificulty.INTERMEDIATE,
    Dificulty.ADVANCED,
  ];
  selectedTab: string = 'ALL';
  lessons$ = this.store.select(selectLessons);

  filteredLessons$ = combineLatest([
    this.lessons$,
    this.store.select(selectLessons),
  ]).pipe(map(([lessons]) => lessons));

  constructor(private store: Store, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.store.dispatch(lessonActions.getLessons());
    console.log(this.filteredLessons$);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    console.log(tab);
    this.filteredLessons$ = this.lessons$.pipe(
      map((lessons) =>
        tab === 'ALL'
          ? lessons
          : lessons.filter((lesson) => lesson.dificulty.trim() === tab.trim())
      )
    );
  }
  addLesson() {
    const modal = this.modalService.open(CreateLessonsComponent);
  }
  editLesson(lesson: ISignLanguageLesson) {
    const modal = this.modalService.open(EditLessonComponent);
    modal.componentInstance.lesson = lesson;
  }

  delete(lesson: ISignLanguageLesson) {
    const modal = this.modalService.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delele ${lesson.title} ?`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.store.dispatch(lessonActions.deleteLesson({ id: lesson.id }));
      }
    });
  }

  getSanitizedUrl(videoId: string): SafeResourceUrl {
    const baseUrl = 'https://www.youtube.com/embed/';
    const autoplay = '0'; // Disable autoplay
    const url = `${baseUrl}${videoId}?autoplay=${autoplay}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
