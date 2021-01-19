import axios from 'axios';
import get from 'lodash/get';

let apiConfig = {};
let apiStore;

const configInterceptor = config => Promise.resolve(apiConfig).then(api => ({ ...config, ...api }));

const makePathInterceptor = basePath => config => ({ ...config, baseURL: config.baseURL + basePath });

const authInterceptor = config => {
  const token = get(apiStore.getState(), 'auth.token.accessToken', null);

  return token === null ? config : { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
};

export const API_PATH = '/bank/v1';
export const MFA_AUTH_API_PATH = '/bank/auth';
export const API_DOCUMENTS_PATH = '/documents/v1';
export const SALESFORCE_API_PATH = '/salesforce';

/**
 * @param { Object } store
 */
export function setApiStore(store) {
  apiStore = store;
}

/**
 * @param { Object | Promise<Object> } config
 */
export function setApiConfig(config) {
  apiConfig = config;
}

/**
 * @param { string } basePath
 * @param { boolean } auth
 *
 * @return { AxiosInstance }
 */
export function createApi(basePath = '', auth = true) {
  const api = axios.create({ withCredentials: true });
  const { request } = api.interceptors;

  if (auth) {
    request.use(authInterceptor);
  }

  if (basePath !== '') {
    request.use(makePathInterceptor(basePath));
  }

  request.use(configInterceptor);

  return api;
}

/**
 * @type { AxiosInstance }
 */
export const api = createApi(API_PATH);

/**
 * @type { AxiosInstance }
 */
export const noAuthApi = createApi(API_PATH, false);

/**
 * @type { AxiosInstance }
 */
export const documentsApi = createApi(API_DOCUMENTS_PATH);

/**
 * @type { AxiosInstance }
 */
export const mfaAuthApi = createApi(MFA_AUTH_API_PATH);

/**
 * @type { AxiosInstance }
 */
export const salesforceApi = createApi(SALESFORCE_API_PATH);
