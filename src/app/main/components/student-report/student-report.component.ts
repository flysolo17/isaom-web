import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../services/submissions.service';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, of, startWith } from 'rxjs';
import { SubmissionWIthStudent } from '../../types/submission.interface';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css',
})
export class StudentReportComponent implements OnInit {
  searchControl = new FormControl('');
  submission$ =
    this.submissionService.getAllSubmissionsWithStudentOrderByDesc();
  filteredSubmissions$: Observable<SubmissionWIthStudent[]> = of([]);
  constructor(private submissionService: SubmissionsService) {}
  ngOnInit(): void {
    this.filteredSubmissions$ = combineLatest([
      this.submission$,
      this.searchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([submissions, searchTerm]) =>
        submissions.filter((submission) =>
          submission.student?.name
            .toLowerCase()
            .includes(searchTerm!.toLowerCase())
        )
      )
    );
  }
}
