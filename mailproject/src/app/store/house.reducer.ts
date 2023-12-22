import { createReducer, on } from '@ngrx/store';
import { loadApi, loadSuccess, signdataSuccess, signinload } from './house.action';
import { state } from '@angular/animations';

export const initialState = {
  apiData: [],
  registerData:[]
};

export const apiReducer = createReducer(
  initialState,
  on(loadApi, (state) => state),
  on(loadSuccess, (state, action) => ({ ...state, apiData: action.apiData })),
  on(signinload, (state) => state),
  on(signdataSuccess,(state,action) =>({...state,registerData:action.registerData}))
);

export function api_Reducer(state: any, action: any) {
  return apiReducer(state, action);
}
