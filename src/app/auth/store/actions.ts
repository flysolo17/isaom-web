import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAdministrator } from '../../shared/types/administrator.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ currentUser: IAdministrator | null }>(),
    'Login Failed': props<{ message: string | null }>(),
    'Get Current User': emptyProps(),
    'Sign Out': emptyProps(),
    'Sign Success': emptyProps(),
    'Sign Failed': emptyProps(),
  },
});
