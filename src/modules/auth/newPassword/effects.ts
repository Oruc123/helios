import { AuthorizationClient } from 'modules/auth/api';

export const setNewPassword = (apiConfig, key: string, password: string) => {
  const client = new AuthorizationClient(apiConfig);
  return client.setNewPassword(key, password);
};
