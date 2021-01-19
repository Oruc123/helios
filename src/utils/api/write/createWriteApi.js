import { createApi } from 'utils/api/common';
// import { clean } from 'utils/common';

/**
 * @typedef { Object } WriteApi
 */

/**
 * @param { AxiosInstance } apiAxios
 * @param { Partial<AxiosRequestConfig> } apiConfig
 * @return { Api }
 */
function createWriteApi(apiAxios, apiConfig) {
  const writeApi = createApi(apiAxios, { ...apiConfig });

  function abort() {
    // do nothing
  }

  /**
   * @param { FormModel } formModel
   * @param { ?{ company: { id: number } } } auth
   * @returns { Promise<AxiosResponse<any>> }
   */
  function call(formModel, auth) {
    const { active, ...props } = formModel.getValue() || {};
    const data = { active: active ? !!+active : undefined, ...props };
    const value = formModel ? data : null;

    return writeApi.call({
      method: value.id ? 'put' : 'post',
      data: { ...value, organization_id: value.organization_id || (auth ? auth.organization.id : undefined) }
    });
  }

  return {
    abort,
    call
  };
}

export default createWriteApi;
