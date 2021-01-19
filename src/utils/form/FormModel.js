import { Record } from 'immutable';
import has from 'lodash/has';
import { FormEntity } from 'utils/form/FormEntity';

const { isArray } = Array;

const $private = Symbol('private');

/**
 * @param { string | Array } key
 *
 * @return { string[] }
 */
const toPath = key => (isArray(key) ? key : String(key).split('.'));

const getFieldsValue = fields =>
  fields
    .toSeq()
    .map(field => field.getValue())
    .toJS();

const setFieldsValue = (fields, value) =>
  fields.merge(fields.toSeq().map((field, key) => (has(value, key) ? field.setValue(value[key]) : field)));

/**
 * @class
 */
class FormModel extends FormEntity {
  static Factory(fields, toggle = false, validator = null, displayName = '') {
    const FieldsRecord = Record(fields);

    return class FormModel extends this {
      static get name() {
        return displayName || super.name;
      }

      /**
       * @param { * } initialValue
       */
      constructor(initialValue) {
        super(FieldsRecord(), toggle, validator, $private);

        return initialValue == null ? this : this.setInitialValue(initialValue).setValue(initialValue);
      }
    };
  }

  /**
   * @param { Symbol } initialFields
   * @param { Record<Object<string, FormEntity>> } initialFields
   * @param { function(Object): ?Error } validator
   * @param { ?Symbol } privateSymbol
   */
  constructor(initialFields, toggle = false, validator = null, privateSymbol = null) {
    if (privateSymbol !== $private) {
      throw new Error('Dont use FormModel to create model. Use FormModel.Factory instead.');
    }

    super(initialFields, toggle, validator);
  }

  /**
   * @return { Seq.Keyed<string, FormEntity> }
   */
  toSeq() {
    return super.getValue().toSeq();
  }

  /**
   * @return { boolean }
   */
  isReady() {
    return super.isReady() && this.toSeq().every(field => field.isReady());
  }

  /**
   * @return { boolean }
   */
  isValid() {
    return super.isValid() && this.toSeq().every(field => field.isValid());
  }

  /**
   * @return { boolean }
   */
  hasError() {
    return super.hasError() || this.toSeq().some(field => field.hasError());
  }

  /**
   * @return { Object<string, *> }
   */
  getInitialValue() {
    return getFieldsValue(super.getInitialValue());
  }

  /**
   * @param { Object<string, *> } value
   *
   * @return { FormModel }
   */
  setInitialValue(value) {
    return super.setInitialValue(setFieldsValue(super.getInitialValue(), value));
  }

  /**
   * @return { Object<string, *> }
   */
  getValue() {
    return getFieldsValue(super.getValue());
  }

  /**
   * @param { Object<string, *> } value
   *
   * @return { FormModel }
   */
  setValue(value) {
    return super.setValue(setFieldsValue(super.getValue(), value));
  }

  /**
   * @return { FormModel }
   */
  resetValue() {
    return super.setValue(super.getInitialValue());
  }

  /**
   * @param { string | Array } key
   *
   * @return { ?FormEntity }
   */
  getField(key) {
    const path = toPath(key);
    const { length } = path;

    let field;

    if (length > 0) {
      field = super.getValue().get(path[0]);

      if (length > 1) {
        field = FormModel.isEntity(field) ? field.getField(path.slice(1)) : undefined;
      }
    }

    return field;
  }

  /**
   * @param { string | Array } key
   * @param { FormEntity } field
   *
   * @return { this }
   */
  setField(key, field) {
    const path = toPath(key);
    const { length } = path;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let next = this;

    if (length > 0 && FormEntity.isEntity(field)) {
      const value = super.getValue();
      const ownKey = path[0];

      if (value.has(ownKey)) {
        let nextField = field;

        if (length > 1) {
          const currField = value.get(ownKey);

          nextField = FormModel.isEntity(currField) ? currField.setField(path.slice(1), field) : currField;
        }

        next = super.setValue(value.set(ownKey, nextField));
      }
    }

    return next;
  }

  /**
   * @return { this }
   */
  validate() {
    const next = this.toSeq().reduce((model, value, key) => {
      const field = model.getField(key);

      return field ? model.setField(key, field.validate()) : model;
    }, this);

    return next === this ? super.validate() : next.setError(null);
  }
}

export default FormModel;
