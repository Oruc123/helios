import { api } from 'modules/api';

export const getUser = () => api.get('/profile').then(({ data }) => data);
