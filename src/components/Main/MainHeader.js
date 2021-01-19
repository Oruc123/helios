import React, { PureComponent } from 'react';
import bem from 'utils/bem';

import 'components/Main/MainHeader.scss';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

export const MainHeaderPropTypes = {
  ...ElementPropTypes
};

export const MainHeaderDefaultProps = {};

export class MainHeader extends PureComponent {
  static propTypes = MainHeaderPropTypes;

  static defaultProps = MainHeaderDefaultProps;

  static className = 'MainHeader';

  render() {
    const { ...props } = this.props;

    return <div {...filter(props, ElementPropTypes)} className={bem.block(this)} />;
  }
}
