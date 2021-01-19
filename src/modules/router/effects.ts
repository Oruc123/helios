import { history } from './history';

/**
 * Push new window location to history.
 * @param {string} path
 * @return {any}
 */
export const push = (path: string) => history.push(path);

/**
 * Replace window location with new value.
 * @param {string} path
 * @return {any}
 */
export const replace = (path: string) => history.replace(path);
