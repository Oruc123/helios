import { createApi } from 'utils/api/common';
import { clean } from 'utils/common';

/**
 * @param { AxiosInstance } apiAxios
 * @param { Partial<AxiosRequestConfig> } apiConfig
 * @return { Api }
 */
function createReadApi(apiAxios, apiConfig) {
  const readApi = createApi(apiAxios, { method: 'post', ...apiConfig });

  function abort() {
    return readApi.abort();
  }

  /**
   * @param { FormModel } filterModel
   * @returns { Promise<AxiosResponse<any>> }
   */
  function call(filterModel) {
    const { active, ...props } = clean(filterModel.getValue() || {});
    const data = { active: active ? !!+active : undefined, ...props };
    const value = filterModel ? data : null;

    return readApi.call({ data: value });
  }

  return {
    abort,
    call
  };
}

export default createReadApi;
