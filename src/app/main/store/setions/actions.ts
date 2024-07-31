import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ISection } from '../../types/section.interface';

export const sectionActions = createActionGroup({
  source: 'section',
  events: {
    'Get All Sections': emptyProps(),
    'Get Sections Success': props<{ sections: ISection[] }>(),
    'Get Sections Failure': props<{ message: string }>(),
    'Create Section': props<{ section: ISection }>(),
    'Creation Success': props<{ section: ISection }>(),
    'Creation Failure': props<{ message: string }>(),
    'Delete Section': props<{ id: string }>(),
    'Delete Success': emptyProps(),
    'Delete Failure': props<{ message: string }>(),
  },
});
