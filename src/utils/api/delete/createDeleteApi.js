import { createApi } from 'utils/api/common';

/**
 * @param { AxiosInstance } apiAxios
 * @param { Partial<AxiosRequestConfig> } apiConfig
 * @return { Api }
 */
function createDeleteApi(apiAxios, apiConfig) {
  const deleteApi = createApi(apiAxios, { method: 'delete', ...apiConfig });

  function abort() {
    // do nothing
  }

  /**
   * @param { FormModel } formModel
   * @returns { Promise<AxiosResponse<any>> }
   */
  function call(formModel) {
    const value = formModel.getValue();

    return deleteApi.call({ data: value });
  }

  return {
    abort,
    call
  };
}

export default createDeleteApi;
