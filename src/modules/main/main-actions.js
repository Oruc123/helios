import { MAIN_COLLAPSE_BAR, MAIN_EXPAND_BAR, MAIN_TOGGLE_BAR } from './main-constants';

export const mainExpandBarAction = () => ({
  type: MAIN_EXPAND_BAR
});

export const mainCollapseBarAction = () => ({
  type: MAIN_COLLAPSE_BAR
});

export const mainToggleBarAction = payload => ({
  type: MAIN_TOGGLE_BAR,
  payload
});
