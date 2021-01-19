import { TABLES_STORE_ID } from './constants';

export const getTableDataSelector = (path: string) => (state) => {
  const tables = state[TABLES_STORE_ID];
  return tables[path] ?? { loading: false, error: null, data: null };
};
