import { organizationActionTypes } from './constants';

export const getOrganization = () => ({ type: organizationActionTypes.GET_ORGANIZATION });

export const setOrganization = payload => ({
  payload,
  type: organizationActionTypes.SET_ORGANIZATION,
});
