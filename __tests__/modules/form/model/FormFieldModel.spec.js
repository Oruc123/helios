import { FormFieldModel } from 'utils/form';

describe('modules/write/model', () => {
  const error = 'nullable value';
  const validator = value => (value == null ? error : null);

  let field;
  let fieldWithValidator;

  beforeEach(() => {
    field = new FormFieldModel();
    fieldWithValidator = new FormFieldModel(null, false, validator);
  });

  describe('.isEntity(value)', () => {
    it('should return true if `value` is an instance of FormFieldModel', () => {
      expect(FormFieldModel.isEntity(field)).toBeTruthy();
      expect(FormFieldModel.isEntity(null)).toBeFalsy();
    });
  });

  describe('#constructor()', () => {
    it('should return new instance of FormFieldModel', () => {
      expect(new FormFieldModel()).toBeInstanceOf(FormFieldModel);
    });

    it('should set value and validator', () => {
      expect(new FormFieldModel('foo').getValue()).toBe('foo');
      expect(new FormFieldModel('foo', false, validator).getValidator()).toBe(validator);
    });
  });

  describe('#isPending()', () => {
    it('should return `false` by default', () => {
      expect(new FormFieldModel().isPending()).toBeFalsy();
    });
  });

  describe('#pending()', () => {
    it('should return new instance of FormFieldModel if internal state changed', () => {
      const nextField = field.pending();

      expect(nextField).not.toBe(field);
      expect(nextField.pending()).toBe(nextField);
    });

    it('should set internal state to `PENDING`', () => {
      expect(field.pending().isPending()).toBeTruthy();
      expect(field.pending().isReady()).toBeFalsy();
    });
  });

  describe('#isReady()', () => {
    it('should return `true` by default', () => {
      expect(new FormFieldModel().isReady()).toBeTruthy();
    });
  });

  describe('#ready()', () => {
    it('should return new instance of FormFieldModel if internal state changed', () => {
      const prevField = field.pending();
      const nextField = prevField.ready();

      expect(nextField).not.toBe(prevField);
      expect(nextField.ready()).toBe(nextField);
    });

    it('should set internal state to `READY`', () => {
      expect(
        field
          .pending()
          .ready()
          .isReady()
      ).toBeTruthy();
      expect(
        field
          .pending()
          .ready()
          .isPending()
      ).toBeFalsy();
    });
  });

  describe('#getValue()', () => {
    it('should return value passed to constructor by default', () => {
      expect(new FormFieldModel().getValue()).toBe(undefined);
      expect(new FormFieldModel('foo').getValue()).toBe('foo');
    });
  });

  describe('#setValue()', () => {
    it('should return new instance of FormFieldModel if value changed', () => {
      expect(field.setValue('foo')).not.toBe(field);
    });

    it('should set a value', () => {
      expect(field.setValue('foo').getValue()).toBe('foo');
    });
  });

  describe('#getValidator()', () => {
    it('should return null by default', () => {
      expect(new FormFieldModel().getValidator()).toBe(undefined);
    });
  });

  describe('#setValidator()', () => {
    it('should return new instance of FormFieldModel if validator changed', () => {
      expect(field.setValidator(validator)).not.toBe(field);
      expect(fieldWithValidator.setValidator(null)).not.toBe(field);
      expect(field.setValidator(undefined)).toBe(field);
    });

    it('should set a validator', () => {
      expect(field.setValidator().getValidator()).toBe(undefined);
    });
  });

  describe('#getError()', () => {
    it('should return null by default', () => {
      expect(new FormFieldModel().getError()).toBe(null);
    });
  });

  describe('#setError()', () => {
    it('should return new instance of FormFieldModel if error changed', () => {
      const nextField = field.setError(error);

      expect(nextField).not.toBe(field);
      expect(nextField.setError(error)).toBe(nextField);
    });

    it('should set an error', () => {
      expect(field.setError(error).getError()).toBe(error);
      expect(field.setError(error).getError()).toBe(error);
    });
  });

  describe('#isValid()', () => {
    it('should return true if the field is valid', () => {
      expect(fieldWithValidator.isValid()).toBeFalsy();
      expect(fieldWithValidator.setValue('foo').isValid()).toBeTruthy();
    });

    it('should return true if the field has no validator', () => {
      expect(field.isValid()).toBeTruthy();
    });
  });

  describe('#hasError', () => {
    it('should return true if field has error', () => {
      expect(fieldWithValidator.hasError()).toBeFalsy();
      expect(fieldWithValidator.validate().hasError()).toBeTruthy();
    });
  });

  describe('#validate()', () => {
    it('should return new instance of FormFieldModel and set error if the field is not valid', () => {
      const nextField = fieldWithValidator.validate();

      expect(nextField).not.toBe(fieldWithValidator);
      expect(nextField.getError()).toBe(error);
    });

    it('should return same instance if the field has no validator', () => {
      expect(field.validate()).toBe(field);
    });
  });
});
