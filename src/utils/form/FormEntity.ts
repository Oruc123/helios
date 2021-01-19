import { EntityModel, EntityValidator } from 'utils/entity';

export class FormEntity extends EntityModel {
  constructor(initialValue: any, toggle?: boolean, validator?: EntityValidator) {
    super({
      initialValue,
      toggle,
      validator,
      value: initialValue,
    });
  }
}
