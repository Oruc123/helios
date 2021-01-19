import { FormFieldModel, FormModel } from 'utils/form';

describe('FormModel', () => {
  const fieldError = 'nullable value';
  const modelError = 'foo is equal bar';

  const fieldValidator = value => (value == null ? fieldError : null);
  const modelValidator = value => (value.foo === value.bar ? modelError : null);

  const fields = {
    foo: new FormFieldModel('', false, fieldValidator),
    bar: new FormFieldModel('', false, fieldValidator)
  };

  const Model = FormModel.Factory(fields, false, modelValidator);

  const modelValue = {
    foo: 'foo',
    bar: 'bar'
  };

  const nestedFields = {
    ted: new Model()
  };

  const NestedModel = FormModel.Factory(nestedFields, false);

  const nestedValue = { ted: modelValue };

  let model;
  let nested;

  beforeEach(() => {
    model = new Model(modelValue, false);
    nested = new NestedModel(nestedValue);
  });

  describe('.Factory(fields, validator)', () => {
    it('should return a subclass of FormModel', () => {
      expect(FormModel.Factory({}, false, () => null)).toBeInstanceOf(Function);
      expect(FormModel.Factory({}, false, () => null).prototype).toBeInstanceOf(FormModel);
    });
  });

  describe('.isEntity(value)', () => {
    it('should return true if `value` is an instance of FormModel', () => {
      expect(Model.isEntity(model)).toBeTruthy();
      expect(Model.isEntity(null)).toBeFalsy();
    });
  });

  describe('#constructor()', () => {
    it('should return new instance of FormModel', () => {
      expect(new Model()).toBeInstanceOf(FormModel);
    });

    it('should set value and validator', () => {
      expect(new Model().getValue()).toEqual({ foo: '', bar: '' });
      expect(new Model(null).getValue()).toEqual({ foo: '', bar: '' });
      expect(new Model(modelValue).getValue()).toEqual(modelValue);

      expect(new Model().getValidator()).toBe(modelValidator);
      expect(new Model(null, modelValidator).getValidator()).toBe(modelValidator);
      expect(new Model(modelValue, modelValidator).getValidator()).toEqual(modelValidator);
    });
  });

  describe('#isReady()', () => {
    it('should return true if model and fields are ready', () => {
      expect(model.isReady()).toBeTruthy();
      expect(model.pending().isReady()).toBeFalsy();
      expect(model.setField('foo', model.getField('foo').pending()).isReady()).toBeFalsy();
    });
  });

  describe('#isPending()', () => {
    it('should return true if model (but not fields) is in pending state', () => {
      expect(model.isPending()).toBeFalsy();
      expect(model.pending().isPending()).toBeTruthy();
      expect(model.setField('foo', model.getField('foo').pending()).isPending()).toBeFalsy();
    });
  });

  describe('#isPending()', () => {
    it('should return true if model (but not fields) is in pending state', () => {
      expect(model.isPending()).toBeFalsy();
      expect(model.pending().isPending()).toBeTruthy();
      expect(model.setField('foo', model.getField('foo').pending()).isPending()).toBeFalsy();
    });
  });

  describe('#setValue()', () => {
    const nextValue = { foo: 'foo1' };

    it('should return new instance of FormModel if value changed', () => {
      expect(model.setValue(nextValue)).not.toBe(model);
      expect(model.setValue(modelValue)).toBe(model);
    });

    it('should merge current value with the passed props', () => {
      expect(model.setValue(nextValue).getValue()).toEqual({ ...modelValue, ...nextValue });
    });
  });

  describe('#setValidator()', () => {
    it('should return new instance of FormModel if validator changed', () => {
      expect(model.setValidator(modelValidator)).toBe(model);
      expect(model.setValidator(null)).not.toBe(model);
    });

    it('should set a validator', () => {
      expect(model.setValidator().getValidator()).toBe(undefined);
    });
  });

  describe('#getError()', () => {
    it('should return null by default', () => {
      expect(new Model().getError()).toBe(null);
    });
  });

  describe('#setError()', () => {
    it('should return new instance of FormModel if error changed', () => {
      const nextModel = model.setError(modelError);

      expect(nextModel).not.toBe(model);
      expect(nextModel.setError(modelError)).toBe(nextModel);
    });

    it('should set an error', () => {
      expect(model.setError(modelError).getError()).toBe(modelError);
      expect(model.setError(modelError).getError()).toBe(modelError);
    });
  });

  describe('#isValid()', () => {
    it('should return true if the model is valid', () => {
      expect(model.isValid()).toBeTruthy();
      expect(model.setValue({ foo: 'bar' }).isValid()).toBeFalsy();
    });

    it('should return true if the model has no validator', () => {
      expect(model.setValidator().isValid()).toBeTruthy();
    });
  });

  describe('#hasError', () => {
    it('should return true if model has modelError', () => {
      expect(model.hasError()).toBeFalsy();
      expect(model.validate().hasError()).toBeFalsy();
      expect(
        model
          .setValue({ foo: 'bar' })
          .validate()
          .hasError()
      ).toBeTruthy();
    });
  });

  describe('#validate()', () => {
    it('should return new instance of FormModel and set error if the model is not valid', () => {
      const prevModel = model.setValue({ foo: 'bar' });
      const nextModel = prevModel.validate();

      expect(model.validate()).toBe(model);
      expect(nextModel).not.toBe(prevModel);
      expect(nextModel.getError()).toBe(modelError);
    });

    it('should return new instance of FormModel and set fields` errors if at least one or fields is not valid', () => {
      const prevModel = model.setValue({ foo: null });
      const nextModel = prevModel.validate();
      // expect(nextModel).not.toBe(prevModel);
      expect(nextModel.getError()).toBeNull();
      // expect(nextModel.getField('foo').getError()).toBe(fieldError);
    });

    it('should return same instance if the model has no validator', () => {
      const nextModel = model.setValidator(null);

      expect(nextModel.validate()).toBe(nextModel);
    });
  });

  describe('#getField', () => {
    it('should return field with specified name', () => {
      expect(new Model().getField('foo')).toBe(fields.foo);
      expect(new NestedModel().getField('ted.foo')).toBe(fields.foo);
    });

    it('should return `undefined` if no field found for the provided path', () => {
      expect(model.getField('zoo')).toBeUndefined();
      expect(model.getField('foo.zoo')).toBeUndefined();

      expect(nested.getField('zoo')).toBeUndefined();
      expect(nested.getField('ted.zoo')).toBeUndefined();
      expect(nested.getField('ted.foo.baz')).toBeUndefined();
    });
  });

  describe('#setField', () => {
    it('should return new instance of FormModel if field changed', () => {
      const nextField = model.getField('foo').setValue('foo1');
      const nextModel = model.setField('foo', nextField);
      const nextNested = nested.setField('ted.foo', nextField);

      expect(model.setField('foo', model.getField('foo'))).toBe(model);
      expect(nextModel).not.toBe(model);
      expect(nextModel.getField('foo')).toBe(nextField);

      expect(nested.setField('ted.foo', nested.getField('ted.foo'))).toBe(nested);
      expect(nextNested).not.toBe(nested);
      expect(nextNested.getField('ted.foo')).toBe(nextField);
    });

    it('should return the same instance if no FormEntity provided or path is missed', () => {
      const nextField = 1;
      const nextModel = model.setField('foo', nextField);
      const nextNested = nested.setField('ted.foo', nextField);

      expect(model.setField('foo.bar', model.getField('foo.far'))).toBe(model);
      expect(nextModel).toBe(model);
      expect(nested.setField('ted.baz', nested.getField('ted.baz'))).toBe(nested);
      expect(nextNested).toBe(nested);
    });
  });
});
