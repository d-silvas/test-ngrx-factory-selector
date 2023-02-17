import { Action, createReducer } from '@ngrx/store';

import { FeatureState, INITIAL_STATE } from './state';

const reducer = createReducer(INITIAL_STATE);

export const featureReducer = (
  state: FeatureState | undefined,
  action: Action
) => reducer(state, action);
