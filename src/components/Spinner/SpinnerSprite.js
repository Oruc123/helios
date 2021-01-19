import React from 'react';

import { Sprite, SpriteDefaultProps, SpritePropTypes } from 'components/Sprite';
import bem from 'utils/bem';
import { filter } from 'utils/props';

import './SpinnerSprite.scss';

export const SpinnerSpritePropTypes = {
  ...SpritePropTypes
};

export const SpinnerSpriteDefaultProps = {
  ...SpriteDefaultProps,
  type: 'spinner'
};

export const SpinnerSprite = ({ className, ...props }) => (
  <Sprite {...filter(props, SpritePropTypes)} className={bem.block(SpinnerSprite, null, className)} />
);

SpinnerSprite.className = 'SpinnerSprite';
SpinnerSprite.propTypes = SpinnerSpritePropTypes;
SpinnerSprite.defaultProps = SpinnerSpriteDefaultProps;
