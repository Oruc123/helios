import lowerFirst from 'lodash/lowerFirst';
import mapKeys from 'lodash/mapKeys';
import pickBy from 'lodash/pickBy';

/**
 * @typedef { Object } ConfigData
 * @property { string } environment
 * @property { string } version
 * @property { string } apiBaseURL
 * @property { string } auth0ClientID
 * @property { string } auth0Domain
 * @property { string } auth0Audience
 * @property { string } plaidPublicKey
 * @property { string } plaidEnvironment
 * @property { string } stripePublicKey
 * @property { ?string } logRocketAppId
 * @property { ?string } zendeskWebWidgetKey
 */

/**
 * @typedef { Object } ConfigApi
 * @property { string } baseURL
 */

/**
 * @typedef { Object } ConfigAuth0
 * @property { string } clientId
 * @property { string } connection
 * @property { string } domain
 * @property { string } audience
 */

/**
 * @typedef { Object } ConfigPlaid
 * @property { string } publicKey
 * @property { string } environment
 */

/**
 * @typedef { Object } ConfigStripe
 * @property { string } publicKey
 */

/**
 * @typedef { Object } ConfigLogRocket
 * @property { string } appId
 */

/**
 * @typedef { Object } ConfigZendesk
 * @property { string } webWidgetKey
 */

const { assign, defineProperty, hasOwnProperty } = Object;

function memoize(target, prop, func) {
  if (!hasOwnProperty.call(target, prop)) {
    defineProperty(target, prop, { value: func.call(target) });
  }

  return target[prop];
}

function pickPrefixed(data, prefix) {
  const { length } = prefix;

  return mapKeys(pickBy(data, (v, k) => k.startsWith(prefix)), (v, k) => lowerFirst(k.substr(length)));
}

const $data = Symbol('Config.data');
const $api = Symbol('Config.api');
const $auth0 = Symbol('Config.auth0');
const $logRocket = Symbol('Config.logRocket');
const $plaid = Symbol('Config.plaid');
const $stripe = Symbol('Config.stripe');
const $zendesk = Symbol('Config.zendesk');

class ConfigModel {
  /**
   * @param { * } value
   *
   * @return { boolean }
   */
  static isConfig(value) {
    return value instanceof this;
  }

  /**
   * @param { * } value
   *
   * @return { ConfigModel }
   */
  static toConfig(value) {
    return this.isConfig(value) ? value : new this(value);
  }

  /**
   * @return { string }
   */
  get environment() {
    return this[$data].environment || 'development';
  }

  /**
   * @return { boolean }
   */
  get isProduction() {
    return this.environment === 'production';
  }

  /**
   * @return { string }
   */
  get version() {
    return this[$data].version || 'dev';
  }

  /**
   * @return { ConfigApi }
   */
  get api() {
    return memoize(this, $api, () => pickPrefixed(this[$data], 'api'));
  }

  /**
   * @return { ConfigAuth0 }
   */
  get auth0() {
    return memoize(this, $auth0, () => pickPrefixed(this[$data], 'auth0'));
  }

  /**
   * @return { ConfigPlaid }
   */
  get plaid() {
    return memoize(this, $plaid, () => pickPrefixed(this[$data], 'plaid'));
  }

  /**
   * @return { ConfigStripe }
   */
  get stripe() {
    return memoize(this, $stripe, () => pickPrefixed(this[$data], 'stripe'));
  }

  /**
   * @return { ?ConfigLogRocket }
   */
  get logRocket() {
    return memoize(this, $logRocket, () => {
      const logRocket = pickPrefixed(this[$data], 'logRocket');

      return logRocket.appId ? logRocket : null;
    });
  }

  /**
   * @return { ?ConfigZendesk }
   */
  get zendesk() {
    return memoize(this, $zendesk, () => {
      let zendesk = null;

      if (!this.isProduction) {
        const zendeskProps = pickPrefixed(this[$data], 'zendesk');

        if (zendeskProps.webWidgetKey) {
          zendesk = zendeskProps;
        }
      }

      return zendesk;
    });
  }

  /**
   * @param { ConfigData } data
   */
  constructor(data) {
    if (data != null && typeof data !== 'object') {
      throw new TypeError('new Config(): object expected');
    }

    defineProperty(this, $data, { value: assign({}, data) });
  }
}

export default ConfigModel;
