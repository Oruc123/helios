import { axios, createCancelToken } from 'utils/axios';

/**
 * @typedef { Object } Api
 * @property { function(...args: *[]): Promise<AxiosResponse<any>> } call
 * @property { function(): void } abort
 */

/**
 * @param { AxiosInstance } apiAxios
 * @param { Partial<AxiosRequestConfig> } apiConfig
 * @return { Api }
 */
function createApi(apiAxios, apiConfig) {
  let cancelApi;

  const abort = () => {
    if (typeof cancelApi === 'function') {
      cancelApi();
    }
  };

  /**
   * @param { ?Partial<AxiosRequestConfig> } config
   * @return { Promise<AxiosResponse<any>> }
   */
  const call = config => {
    const [cancelToken, cancel] = createCancelToken();

    cancelApi = cancel;

    return apiAxios
      .request({ ...apiConfig, ...config, cancelToken })
      .then(response => response.data)
      .catch(error => {
        throw axios.isCancel(error) ? null : error;
      })
      .finally(() => {
        cancelApi = null;
      });
  };

  return {
    abort,
    call
  };
}

export default createApi;
