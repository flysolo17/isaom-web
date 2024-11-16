import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../services/submissions.service';
import { FormControl } from '@angular/forms';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';

import { SectionService } from '../../services/section.service';
import { SubjectService } from '../../../services/subject.service';
import { SubmissionWIthStudentSubjectAndSection } from '../../types/submission.interface';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrl: './student-report.component.css',
})
export class StudentReportComponent implements OnInit {
  searchControl = new FormControl('');
  submission$ =
    this.submissionService.getAllSubmissionsWithStudentOrderByDesc();
  filteredSubmissions$: Observable<SubmissionWIthStudentSubjectAndSection[]> =
    of([]);
  constructor(
    private submissionService: SubmissionsService,
    private sectionService: SectionService,
    private subjectService: SubjectService
  ) {}
  ngOnInit(): void {
    this.filteredSubmissions$ = combineLatest([
      this.submission$,
      this.searchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([submissions, searchTerm]) =>
        submissions.filter((submission) =>
          submission.student?.users.name
            .toLowerCase()
            .includes(searchTerm!.toLowerCase())
        )
      ),
      catchError((err) => {
        console.error('Error occurred while filtering submissions:', err);
        // Return an empty array or a suitable fallback value
        return of([]);
      })
    );
  }
}
