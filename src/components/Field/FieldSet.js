import { node } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, unprefixed } from 'utils/props';

import 'components/Field/FieldSet.scss';

export const FieldSetPropTypes = {
  children: node,
  legend: node
};

export const FieldSetDefaultProps = {
  children: null,
  legend: null
};

export class FieldSet extends PureComponent {
  static propTypes = FieldSetPropTypes;

  static defaultProps = FieldSetDefaultProps;

  static className = 'FieldSet';

  renderLegend() {
    const { legend } = this.props;

    return <legend className={bem.element(this, 'legend')}>{legend}</legend>;
  }

  render() {
    const { legend, children, ...props } = unprefixed(this.props, 'legend');
    return (
      <div {...filter(props, ElementPropTypes)} className={bem.block(this, { legend: Boolean(legend) })}>
        {legend ? this.renderLegend() : null}
        {children}
      </div>
    );
  }
}
