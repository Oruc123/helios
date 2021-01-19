import { AuthorizationClient } from '../api';

export const sendUsernamePassword = (apiConfig, login: string, password: string) => {
  const client = new AuthorizationClient(apiConfig);
  return client.sendUsernamePassword(login, password);
};

export const createDevice = (apiConfig, token: string, type: string, name: string) => {
  const client = new AuthorizationClient(apiConfig);
  return client.createDevice(token, type, name);
};

export const sendChallenge = (apiConfig, token: string, deviceId: number) => {
  const client = new AuthorizationClient(apiConfig);
  return client.sendChallenge(token, deviceId);
};

export const sendSecurityCode = (apiConfig, token: string, challengeId: string, code: string) => {
  const client = new AuthorizationClient(apiConfig);
  return client.sendSecurityCode(token, challengeId, code);
};

export const setDeviceAsDefault = (apiConfig, token: string, id: number) => {
  const client = new AuthorizationClient(apiConfig);
  return client.setDeviceAsDefault(token, id);
};
