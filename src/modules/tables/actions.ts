import { GET_TABLE_DATA } from './constants';

export const getTableData = (path: string,
                             dataSources: { [key: string]: { url: string; payload: any; }; }) => ({
                               type: GET_TABLE_DATA,
                               payload: { path, dataSources },
                             });
