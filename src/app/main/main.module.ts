import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SectionComponent } from './components/section/section.component';
import { QuarterComponent } from './components/quarter/quarter.component';
import { UsersComponent } from './components/users/users.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { LogsComponent } from './components/logs/logs.component';
import { MainComponent } from './components/main/main.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CreateSectionComponent } from './dialogs/create-section/create-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignLanguageLessonsComponent } from './components/sign-language-lessons/sign-language-lessons.component';
import { lessonFeatureKey, lessonReducer } from './store/lessons/reducers';
import { LessonsEffects } from './store/lessons/effects';
import { CreateLessonsComponent } from './dialogs/create-lessons/create-lessons.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component';
import { EditTranslationComponent } from './dialogs/edit-translation/edit-translation.component';
import { ViewTranslationComponent } from './dialogs/view-translation/view-translation.component';
import { EditLessonComponent } from './dialogs/edit-lesson/edit-lesson.component';
import { EditSectionComponent } from './dialogs/edit-section/edit-section.component';
import { ViewSectionComponent } from './dialogs/view-section/view-section.component';
import { GamesComponent } from './components/games/games.component';
import { CreateGameComponent } from './dialogs/create-game/create-game.component';
import { ViewGameComponent } from './components/view-game/view-game.component';
import { CreateLevelComponent } from './dialogs/create-level/create-level.component';
import { AssignTeacherComponent } from './dialogs/assign-teacher/assign-teacher.component';
import { EditLevelComponent } from './dialogs/edit-level/edit-level.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SectionComponent,
    QuarterComponent,
    UsersComponent,
    StudentReportComponent,
    LogsComponent,
    MainComponent,
    CreateSectionComponent,
    SignLanguageLessonsComponent,
    CreateLessonsComponent,
    DeleteConfirmationComponent,
    EditTranslationComponent,
    ViewTranslationComponent,
    EditLessonComponent,
    EditSectionComponent,
    ViewSectionComponent,
    GamesComponent,
    CreateGameComponent,
    ViewGameComponent,
    CreateLevelComponent,
    AssignTeacherComponent,
    EditLevelComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,

    StoreModule.forFeature(lessonFeatureKey, lessonReducer),
    EffectsModule.forFeature([LessonsEffects]),
  ],
})
export class MainModule {}
