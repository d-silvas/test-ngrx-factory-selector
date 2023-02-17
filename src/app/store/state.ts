export interface FeatureState {
  name: string;
}

export const INITIAL_STATE: FeatureState = {
  name: '',
};

export interface RootState {
  feature: FeatureState;
}
