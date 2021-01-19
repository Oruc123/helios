import { createSelector } from 'reselect';
import { MAIN_STATE } from 'modules/main/main-constants';

export const mainSelector = state => state[MAIN_STATE];

export const mainBarMinimizedSelector = state => mainSelector(state).get('barMinimized');

export const mainMenuItemsSelector = state => mainSelector(state).get('menuItems');

export const mainMenuItemsArraySelector = createSelector(
  [mainMenuItemsSelector],
  menuItems => menuItems.toArray()
);
