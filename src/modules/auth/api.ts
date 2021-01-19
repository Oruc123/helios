import * as Axios from 'axios';

export class AuthorizationClient {
  private readonly config = null;

  public constructor(config) {
    this.config = config;
  }

  /**
   * Sanitize response a little bit.
   * @param {Promise<any>} request - pending request to be handled.
   * @return {Promise<any>} - Promise with transformed response.
   */
  // eslint-disable-next-line class-methods-use-this
  private handle(request: Promise<any>) {
    return request
      .then(response => response.data)
      .catch((error) => { throw new Error(error.response.data); });
  }

  /**
   * First step - send username&password credentials.
   * @param {string} login - username
   * @param {string} password - password
   * @return {Promise<any>} - operation response.
   */
  public sendUsernamePassword(login: string, password: string) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/login`,
      { login, password }));
  }

  /**
   * Create new MFA device.
   * @param {string} token - MFA (or regular) token to authorize operation.
   * @param {string} type - device type (currently email or sms).
   * @param {string} name - email address or phone number.
   * @return {Promise<any>} - operation response.
   */
  public createDevice(token: string, type: string, name: string) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/mfa/device`,
      {
        type,
        phone_number: type === 'sms' ? name : undefined,
        email: type === 'email' ? name : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ));
  }

  /**
   * Set device with given ID as default.
   * @param {number} id - device ID.
   * @return {Promise<any>} - operation response.
   */
  public setDeviceAsDefault(token: string, id: number) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/mfa/device-default`,
      {
        device_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ));
  }

  /**
   * Send security code to chosen device.
   * @param {string} token - MFA token to authorize operation.
   * @param {number} deviceId - device ID.
   * @return {Promise<any>} - operation response.
   */
  public sendChallenge(token: string, deviceId: number) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/mfa/challenge`,
      {
        device_id: deviceId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ));
  }

  /**
   * Send security code to API.
   * @param {string} token - MFA token to authorize operation.
   * @param {string} challengeId - ID of current challenge ID.
   * * @param {string} code - security code to be checked.
   * @return {Promise<any>} - operation response.
   */
  public sendSecurityCode(token: string, challengeId: string, code: string) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/mfa/login`,
      {
        code,
        challenge_id: challengeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ));
  }

  /**
   * Send password reset link.
   * @param {string} login - email address
   * @return {Promise<any>} - operation response.
   */
  public resetPassword(login: string) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/password-reset`,
      { login },
    ));
  }

  /**
   * Set new password.
   * @param {string} key - secret key from url
   * @param {string} password - password to be set
   * @return {Promise<any>} - operation response.
   */
  public setNewPassword(key: string, password: string) {
    return this.handle(Axios.default.post(
      `${this.config.baseURL}/bank/auth/password`,
      { key, password },
    ));
  }
}
