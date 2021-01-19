import { bool, oneOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { Sprite } from 'components/Sprite';
import { Sized, SizedDefaultProps, SizedPropTypes } from 'components/Sized';
import { SPRITE_CHECK } from 'sprites';
import bem from 'utils/bem';

import './CheckMark.scss';

const FACE_ACTIVE = 'active';
const FACE_DANGER = 'danger';
const FACE_DEFAULT = 'default';

const FACES = [FACE_ACTIVE, FACE_DANGER, FACE_DEFAULT];

export const CheckMarkPropTypes = {
  ...SizedPropTypes,
  flat: bool,
  face: oneOf(FACES),
  rounded: bool,
  checked: bool
};

export const CheckMarkDefaultProps = {
  ...SizedDefaultProps,
  flat: false,
  face: undefined,
  rounded: false,
  checked: false
};

/**
 * @property { React.Ref } inputRef
 * @property { React.Ref } thisRef
 */
export class CheckMark extends PureComponent {
  static className = 'CheckMark';

  static propTypes = {
    ...CheckMarkPropTypes
  };

  static defaultProps = {
    ...CheckMarkDefaultProps
  };

  static FACE_ACTIVE = FACE_ACTIVE;

  static FACE_DANGER = FACE_DANGER;

  static FACE_DEFAULT = FACE_DEFAULT;

  static FACES = FACES;

  static SIZE_SMALL = Sized.SIZE_SMALL;

  static SIZE_MEDIUM = Sized.SIZE_MEDIUM;

  static SIZE_LARGE = Sized.SIZE_LARGE;

  static SIZES = Sized.SIZES;

  render() {
    const { face, flat, checked, rounded, size } = this.props;

    return (
      <Sized size={size}>
        <div className={bem.block(this, { [face]: !!face, checked, flat, rounded })}>
          <Sprite type={SPRITE_CHECK} className={bem.element(this, 'check', { [face]: !!face, checked, flat })} />
        </div>
      </Sized>
    );
  }
}
