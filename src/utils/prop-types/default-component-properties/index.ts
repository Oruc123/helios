import moment from 'moment';

/**
 * Possible component types signatures.
 */

enum ComponentTypes {
  DatePicker = 'PickerWrapper',
}

/**
 * Basic properties inherited by all components.
 */

interface BasicDefaultProperties {
  formatValue?: (value: any) => any;
}

/**
 * Date picker default properties.
 */

type DatePickerDefaultProperties = BasicDefaultProperties

/**
 * Full dictionary shape.
 */

type DefaultPropertiesDictionary = {
  [ComponentTypes.DatePicker]: DatePickerDefaultProperties;
};

/**
 * All combined default properties.
 */

export const ComponentDefaultProperties: DefaultPropertiesDictionary = {
  [ComponentTypes.DatePicker]: {
    formatValue: (value: any) => value ? moment(value) : value,
  },
};
