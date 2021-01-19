export const AUTH_STATE = 'auth';

/**
 * Authorization errors.
 */

export const AUTH_PARSE_ERROR = 'parse_error';
export const AUTH_INVALID_REQUEST = 'invalid_request';
export const AUTH_UNAUTHORIZED_CLIENT = 'unauthorized_client';
export const AUTH_UNSUPPORTED_CREDENTIAL_TYPE = 'unsupported_credential_type';
export const AUTH_ACCESS_DENIED = 'access_denied';
export const AUTH_BLOCKED_USER = 'blocked_user';
export const AUTH_PASSWORD_LEAKED = 'password_leaked';
export const AUTH_LOGIN_REQUIRED = 'login_required';

/**
 * Paths.
 */

export const AUTH_PATH = '/auth';
export const AUTH_LOGIN_PATH = `${AUTH_PATH}/login`;
export const AUTH_FORGOT_PATH = `${AUTH_PATH}/forgot`;
export const AUTH_NEW_PASSWORD_PATH = `${AUTH_PATH}/password-reset`;
