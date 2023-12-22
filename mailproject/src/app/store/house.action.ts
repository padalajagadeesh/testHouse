import { createAction, props } from '@ngrx/store';

export const loadApi = createAction('[App component] , load api');
export const loadSuccess = createAction(
  '[App component] , load success',
  props<{ apiData: any }>()
);

export const signinload = createAction('[Signin Component], signin load');
export const signdataSuccess = createAction('[signin component], signin success',props<{registerData:any}>());