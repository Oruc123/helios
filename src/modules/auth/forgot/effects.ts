import { AuthorizationClient } from 'modules/auth/api';

export const resetPassword = (apiConfig, login: string) => {
  const client = new AuthorizationClient(apiConfig);
  return client.resetPassword(login);
};
