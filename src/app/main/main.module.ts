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
import { sectionFeatureKey, sectionReducer } from './store/setions/reducers';
import { SectionEffects } from './store/setions/effects';
import { CreateSectionComponent } from './dialogs/create-section/create-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignLanguageLessonsComponent } from './components/sign-language-lessons/sign-language-lessons.component';
import { lessonFeatureKey, lessonReducer } from './store/lessons/reducers';
import { LessonsEffects } from './store/lessons/effects';
import { CreateLessonsComponent } from './dialogs/create-lessons/create-lessons.component';

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
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(sectionFeatureKey, sectionReducer),
    StoreModule.forFeature(lessonFeatureKey, lessonReducer),
    EffectsModule.forFeature([SectionEffects, LessonsEffects]),
  ],
})
export class MainModule {}
