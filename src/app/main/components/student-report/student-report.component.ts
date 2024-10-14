import { Component } from '@angular/core';
import { SubmissionsService } from '../../services/submissions.service';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css',
})
export class StudentReportComponent {
  submission$ =
    this.submissionService.getAllSubmissionsWithStudentOrderByDesc();
  constructor(private submissionService: SubmissionsService) {}
}
