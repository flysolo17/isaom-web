import { createFeature, createReducer, on } from '@ngrx/store';
import { ILoginState } from '../types/login.state';
import { authActions } from './actions';

const initialLoginState: ILoginState = {
  isLoading: false,
  admin: undefined,
  error: null,
};

export const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(
    initialLoginState,
    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.loginSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      admin: actions.currentUser,
    })),
    on(authActions.loginFailed, (state, actions) => ({
      ...state,
      isLoading: false,
      errors: actions.message,
    })),
    on(authActions.signOut, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.signSuccess, (state) => ({
      ...state,
      isLoading: false,
      admin: undefined,
    })),
    on(authActions.signFailed, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});

export const {
  name: loginFeatureKey,
  reducer: loginReducer,
  selectIsLoading,
  selectAdmin,
  selectError,
} = loginFeature;
