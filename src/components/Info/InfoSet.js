import { node, oneOf } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import 'components/Info/InfoSet.scss';

const DIRECTION_ROW = 'row';
const DIRECTION_COLUMN = 'column';

const DIRECTIONS = [DIRECTION_ROW, DIRECTION_COLUMN];

export const InfoSetPropTypes = {
  children: node,
  legend: node,
  direction: oneOf(DIRECTIONS),
  ...prefixBy('legend', ElementPropTypes)
};

export const InfoSetDefaultProps = {
  children: null,
  legend: null,
  direction: DIRECTION_COLUMN
};

export class InfoSet extends PureComponent {
  static propTypes = InfoSetPropTypes;

  static defaultProps = InfoSetDefaultProps;

  static className = 'InfoSet';

  static DIRECTION_ROW = DIRECTION_ROW;

  static DIRECTION_COLUMN = DIRECTION_COLUMN;

  static DIRECTIONS = DIRECTIONS;

  renderLegend() {
    const { legend, ...props } = this.props;
    const legendProps = prefixed(props, 'legend');

    return (
      <legend {...legendProps} className={bem.element(this, 'legend', null, legendProps.className)}>
        {legend}
      </legend>
    );
  }

  render() {
    const { legend, children, direction, ...props } = unprefixed(this.props, 'legend');
    return (
      <div
        {...filter(props, ElementPropTypes)}
        className={bem.block(this, { legend: Boolean(legend), [direction]: !!direction })}
      >
        {legend ? this.renderLegend() : null}
        {children}
      </div>
    );
  }
}
