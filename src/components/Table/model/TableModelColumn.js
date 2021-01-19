import { Record } from 'immutable';

/**
 * @callback TableModelColumnValidator
 * @param { * } value
 * @return { ?Error }
 */

/**
 * @typedef { Object } TableModelColumnProps
 * @property { ?Error } error
 * @property { string } state
 * @property { ?TableModelColumnValidator } validator
 * @property { * } value
 */

/**
 * @type { TableModelColumnProps }
 */
const TableModelColumnRecordProps = {
  key: null,
  field: null
};

class TableModelColumn extends Record(TableModelColumnRecordProps) {}

export default TableModelColumn;
