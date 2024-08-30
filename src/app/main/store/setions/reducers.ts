import { createFeature, createReducer, on } from '@ngrx/store';
import { ISectionState } from '../../components/section/section.state';
import { sectionActions } from './actions';

const initialSectionState: ISectionState = {
  isLoading: false,
  sections: [],
  error: null,
  teachers: [],
};

const sectionFeature = createFeature({
  name: 'section',
  reducer: createReducer(
    initialSectionState,
    on(sectionActions.getAllSections, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(sectionActions.getSectionsSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      sections: actions.sections,
    })),
    on(sectionActions.getSectionsFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.message,
    })),
    on(sectionActions.creationSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(sectionActions.creationFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.message,
    })),
    on(sectionActions.deleteSection, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(sectionActions.deleteSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(sectionActions.deleteFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.message,
    })),

    on(sectionActions.getAllTeachers, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(sectionActions.getAllTeachersSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      teachers: actions.data,
    })),
    on(sectionActions.getAllTeachersFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.message,
    }))
  ),
});

export const {
  name: sectionFeatureKey,
  reducer: sectionReducer,
  selectIsLoading,
  selectSections,
  selectError,
  selectTeachers,
} = sectionFeature;
