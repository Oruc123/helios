import { Map } from 'immutable';
import { EntityModel } from 'utils/entity';

class ListModel extends EntityModel {
  constructor(value) {
    super({ value: new Map(value) });
  }

  getById(id) {
    return super.getValue().get(id);
  }
}

export default ListModel;
