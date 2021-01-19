import { InputText } from 'components/Input';
import React, { PureComponent } from 'react';
import { SPRITE_SEARCH } from 'sprites';
import bem from 'utils/bem';

import './Search.scss';

export const SearchPropTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...InputText.propTypes
};

export const SearchDefaultProps = {
  ...InputText.defaultProps,
  clearable: true,
  placeholder: 'Type something',
  rounded: true,
  icon: SPRITE_SEARCH
};

export class Search extends PureComponent {
  static className = 'Search';

  static propTypes = { ...SearchPropTypes };

  static defaultProps = { ...SearchDefaultProps };

  render() {
    return <InputText {...this.props} className={bem.block(this)} wrapper-className={bem.element(this, 'wrapper')} />;
  }
}
