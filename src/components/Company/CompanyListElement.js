/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { Iconed, IconedDefaultProps, IconedPropTypes } from 'components/Icon';
import { func, number, string } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import './CompanyListElement.scss';

export const CompanyListElementPropTypes = {
  ...IconedPropTypes,
  ...ElementPropTypes,
  ...prefixBy('label', ElementPropTypes),
  id: number,
  name: string,
  onSelect: func
};

export const CompanyListElementDefaultProps = {
  ...IconedDefaultProps,
  id: undefined,
  name: undefined,
  onSelect: undefined
};

export class CompanyListElement extends PureComponent {
  static className = 'CompanyListElement';

  static propTypes = {
    ...CompanyListElementPropTypes
  };

  static defaultProps = {
    ...CompanyListElementDefaultProps
  };

  handleClick = () => {
    const { id, onSelect } = this.props;

    if (typeof onSelect === 'function') {
      onSelect(id);
    }
  };

  renderLabel() {
    const { name, ...props } = this.props;
    const labelProps = prefixed(props, 'label');

    return (
      <span
        {...filter(labelProps, ElementPropTypes)}
        className={bem.element(this, 'label', null, labelProps.className)}
      >
        {name}
      </span>
    );
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <Iconed
        {...filter(props, IconedPropTypes)}
        icon-className={bem.element(this, 'icon', null, props['icon-className'])}
      >
        <div
          {...unprefixed(filter(props, ElementPropTypes), 'icon', 'label')}
          className={bem.block(this)}
          onClick={this.handleClick}
        >
          {this.renderLabel()}
          {children}
        </div>
      </Iconed>
    );
  }
}
