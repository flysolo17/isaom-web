import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuarterComponent } from './components/quarter/quarter.component';
import { UsersComponent } from './components/users/users.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { LogsComponent } from './components/logs/logs.component';
import { MainComponent } from './components/main/main.component';
import { SectionComponent } from './components/section/section.component';
import { SignLanguageLessonsComponent } from './components/sign-language-lessons/sign-language-lessons.component';
import { GamesComponent } from './components/games/games.component';
import { ViewGameComponent } from './components/view-game/view-game.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewLeaderboardComponent } from './components/view-leaderboard/view-leaderboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'section',
    component: SectionComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'student-report',
    component: StudentReportComponent,
  },
  {
    path: 'logs',
    component: LogsComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'games/matches/:id',
    component: ViewLeaderboardComponent,
  },
  {
    path: 'games/:id',
    component: ViewGameComponent,
  },
  {
    path: 'lessons',
    component: SignLanguageLessonsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
