import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface Data {
  apiData: any;
  registerData: any;
}
export const featureKey = createFeatureSelector<Data>('data');

export const houseData = createSelector(featureKey, (state) => state.apiData);
export const registerApiData = createSelector(featureKey,(state) => state.registerData)
