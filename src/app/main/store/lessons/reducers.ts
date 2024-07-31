import { createFeature, createReducer, on } from '@ngrx/store';
import { ILessonState } from '../../components/sign-language-lessons/lesson.state';
import { lessonActions } from './actions';

const initialLessonState: ILessonState = {
  isLoading: false,
  lessons: [],
  error: null,
};

const lessonFeature = createFeature({
  name: 'lesson',
  reducer: createReducer(
    initialLessonState,
    on(lessonActions.getLessons, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(lessonActions.getLessonsSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      lessons: actions.data,
    })),
    on(lessonActions.getLessonsFailed, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.message,
    })),

    on(lessonActions.addLesson, (state, action) => ({
      ...state,
      isLoading: true,
    })),
    on(lessonActions.addLessonSuccess, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(lessonActions.addLessonFailed, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.message,
    })),

    on(lessonActions.deleteLesson, (state, action) => ({
      ...state,
      isLoading: true,
    })),
    on(lessonActions.deleteLessonSuccess, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(lessonActions.deleteLessonFailed, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.message,
    }))
  ),
});

export const {
  name: lessonFeatureKey,
  reducer: lessonReducer,
  selectIsLoading,
  selectLessons,
  selectError,
} = lessonFeature;
