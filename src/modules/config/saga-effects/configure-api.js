import { setApiConfig } from 'modules/api';

export default function configureApi(config) {
  return setApiConfig(config.api);
}
