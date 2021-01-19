import { Record } from 'immutable';

/**
 * Entity state values.
 */

enum EntityState {
  Ready = 'ready',
  Pending = 'pending',
}

/**
 * Entity validator function type.
 */

export type EntityValidator = (value: any) => null | any;

/**
 * Shape of entity model.
 */

interface EntityModelShape {
  error?: Error;
  initialValue: any;
  message: string;
  state: EntityState;
  validator: EntityValidator;
  value: any;
  toggle?: boolean;
}

/**
 * Default model value.
 */

export const entityModelDefaultState: EntityModelShape = {
  error: null,
  initialValue: undefined,
  message: undefined,
  state: EntityState.Ready,
  validator: undefined,
  value: undefined,
  toggle: undefined,
};

/**
 * Extended entity model factory.
 */

export class EntityModel extends Record<EntityModelShape>(entityModelDefaultState) {
  /**
   * Check whether passed value is of EntityModel type.
   * @param value - value to check.
   * @return {boolean} - is value EntityModel?
   */
  static isEntity(value: EntityModel) {
    return value instanceof this;
  }

  /**
   * Return entity error.
   * @return {Error | null} - entity error.
   */
  getError() {
    return this.get('error');
  }

  /**
   * Set entity error.
   * @param {Error} error - error to set.
   * @return {EntityModel} - updated entity instance.
   */
  setError(error: Error) {
    return this.set('error', error);
  }

  /**
   * Get entity "toggle" state.
   * @return {boolean} - is toggled?
   */
  getToggle() {
    return this.get('toggle');
  }

  /**
   * Switch entity "toggle" state.
   * @return {EntityModel} - entity with switched "toggle" value.
   */
  switchToggle() {
    return this.set('toggle', !this.getToggle());
  }

  /**
   * Get entity message.
   * @return {string} - entity message.
   */
  getMessage() {
    return this.get('message');
  }

  /**
   * Set entity message.
   * @param message - message value.
   * @return {EntityModel} - updated entity model.
   */
  setMessage(message) {
    return this.set('message', message);
  }

  /**
   * Get entity initial value.
   * @return {any} - initial value.
   */
  getInitialValue() {
    return this.get('initialValue');
  }

  /**
   * Set entity initial value.
   * @param value - value to set.
   * @return {EntityModel} - updated entity.
   */
  setInitialValue(value) {
    return this.set('initialValue', value);
  }

  /**
   * Get entity value.
   * @return {any} - entity value.
   */
  getValue() {
    return this.get('value');
  }

  /**
   * Set entity value.
   * @param value - value to set.
   * @return {EntityModel} - updated entity.
   */
  setValue(value) {
    return this.merge({ value, error: undefined });
  }

  /**
   * Reset entity value.
   * @return {EntityModel} - entity with initial value.
   */
  resetValue() {
    return this.setValue(this.getInitialValue());
  }

  /**
   * Get entity validator.
   * @return {EntityValidator?} - validator function.
   */
  getValidator() {
    return this.get('validator');
  }

  /**
   * Set entity validator function.
   * @param validator - validator function.
   * @return {EntityModel} - updated entity.
   */
  setValidator(validator) {
    return this.set('validator', validator);
  }

  /**
   * Mark entity as ready.
   * @return {EntityModel} - updated entity.
   */
  ready() {
    return this.set('state', EntityState.Ready);
  }

  /**
   * Get entity ready state.
   * @return {boolean} - is entity ready?
   */
  isReady() {
    return this.get('state') === EntityState.Ready;
  }

  /**
   * Mark entity as pending.
   * @return {EntityModel} - updated entity.
   */
  pending() {
    return this.set('state', EntityState.Pending);
  }

  /**
   * Get entity pending state.
   * @return {boolean} - is entity pending?
   */
  isPending() {
    return this.get('state') === EntityState.Pending;
  }

  /**
   * Is entity has error?
   * @return {boolean} - Is entity has error?
   */
  hasError() {
    return !!this.getError();
  }

  /**
   * Check if entity valid.
   * @return {boolean} - is entity valid?
   */
  isValid() {
    const validator = this.getValidator();
    return !validator || !validator(this.getValue());
  }

  /**
   * Validate entity. Set "error" field.
   * @return {EntityModel} - updated entity.
   */
  validate() {
    const validator = this.getValidator();
    return this.setError(validator ? validator(this.getValue()) : null);
  }
}
