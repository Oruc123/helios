import { CONFIG_STATE } from './config-constants';

/**
 * @param { Object } state
 *
 * @return { ConfigState }
 */
export const configSelector = state => state[CONFIG_STATE];

/**
 * @param { Object } state
 *
 * @return { ConfigState }
 */
export const configDataSelector = state => configSelector(state).data;

/**
 * @param { Object } state
 *
 * @return { ConfigApi }
 */
export const configApiSelector = state => configDataSelector(state).api;

/**
 * @param { Object } state
 *
 * @return { ConfigAuth0 }
 */
export const configAuth0Selector = state => configDataSelector(state).auth0;

/**
 * @param { Object } state
 *
 * @return { ConfigPlaid }
 */
export const configPlaidSelector = state => configDataSelector(state).plaid;

/**
 * @param { Object } state
 *
 * @return { string }
 */
export const configPlaidPublicKeySelector = state => configPlaidSelector(state).publicKey;

/**
 * @param { Object } state
 *
 * @return { string }
 */
export const configPlaidEnvironmentSelector = state => configPlaidSelector(state).environment;

/**
 * @param { Object } state
 *
 * @return { ConfigStripe }
 */
export const configStripeSelector = state => configDataSelector(state).stripe;

/**
 * @param { Object } state
 *
 * @return { string }
 */
export const configStripePublicKeySelector = state => configStripeSelector(state).publicKey;
