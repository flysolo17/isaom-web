import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ISignLanguageLesson } from '../../types/sign-language-lessons.interface';

export const lessonActions = createActionGroup({
  source: 'lessons',
  events: {
    'Get Lessons': emptyProps(),
    'Get Lessons Success': props<{ data: ISignLanguageLesson[] }>(),
    'Get Lessons Failed': props<{ message: string }>(),
    'Add Lesson': props<{ lesson: ISignLanguageLesson }>(),
    'Add Lesson Success': emptyProps(),
    'Add Lesson Failed': props<{ message: string }>(),

    'Delete Lesson': props<{ id: string }>(),
    'Delete Lesson Success': emptyProps(),
    'Delete Lesson Failed': props<{ message: string }>(),
  },
});
