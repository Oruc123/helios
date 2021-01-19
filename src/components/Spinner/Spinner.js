import { bool, string } from 'prop-types';
import React from 'react';

import { Sized, SizedDefaultProps, SizedPropTypes } from 'components/Sized';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import './Spinner.scss';

export const SpinnerPropTypes = {
  ...SizedPropTypes,
  ...ElementPropTypes,
  centered: bool,
  duration: string,
  primaryColor: string,
  secondaryColor: string
};

export const SpinnerDefaultProps = {
  ...SizedDefaultProps,
  centered: false,
  duration: null,
  primaryColor: null,
  secondaryColor: null,
  size: Sized.SIZE_MEDIUM
};

export const Spinner = ({ centered, size, className, duration, primaryColor, secondaryColor, style, ...props }) => {
  let computedStyle = style;

  if (duration) {
    computedStyle = { ...computedStyle, animationDuration: duration };
  }

  if (primaryColor) {
    computedStyle = { ...computedStyle, borderTopColor: primaryColor, borderBottomColor: primaryColor };
  }

  if (secondaryColor) {
    computedStyle = { ...computedStyle, borderLeftColor: secondaryColor, borderRightColor: secondaryColor };
  }

  return (
    <Sized size={size}>
      <div
        {...filter(props, ElementPropTypes)}
        className={bem.block(Spinner, { centered }, className)}
        style={computedStyle}
      />
    </Sized>
  );
};

Spinner.className = 'Spinner';
Spinner.propTypes = SpinnerPropTypes;
Spinner.defaultProps = SpinnerDefaultProps;

Spinner.SIZE_SMALL = Sized.SIZE_SMALL;
Spinner.SIZE_MEDIUM = Sized.SIZE_MEDIUM;
Spinner.SIZE_LARGE = Sized.SIZE_LARGE;
Spinner.SIZES = Sized.SIZES;
