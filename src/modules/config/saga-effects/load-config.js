import axios from 'axios';
import ConfigModel from 'modules/config/model/config-model';

export default function loadConfig(configUrl) {
  return axios(configUrl).then(({ data }) => ConfigModel.toConfig(data));
}
