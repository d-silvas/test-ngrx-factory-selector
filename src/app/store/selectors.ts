import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from './state';

export const getFeatureState = createFeatureSelector<FeatureState>('feature');

// APPROACH #1
// We will mock the parent selector, getFeatureState
export const getName1 = (input: string) =>
  createSelector(getFeatureState, (state): string => {
    console.log('REAL SELECTOR #1', state, input);
    return input + ' ' + state.name;
  });

// APPROACH #2
// Our original problem is that we can not spy on "getName", because "getName" is a property
// of the module. So we just create a wrapper object and spy on factorySelectors.getName2
export const factorySelectors = {
  getName2: (input: string) =>
    createSelector(getFeatureState, (state): string => {
      console.log('REAL SELECTOR #2', state, input);
      return input + ' ' + state.name;
    }),
};

// APPROACH #3
// We will store the selector which is returned by this function in the component
export const getName3 = (input: string) =>
  createSelector(getFeatureState, (state): string => {
    console.log('REAL SELECTOR #3', state, input);
    return input + ' ' + state.name;
  });
