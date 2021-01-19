import { api } from 'modules/api';

export const getOrganization = () => api.get('/organization').then(({ data }) => data);
