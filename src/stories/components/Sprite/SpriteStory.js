import React from 'react';
import { storiesOf } from '@storybook/react';

import { Markdown } from 'components/Markdown';
import { Sprite } from 'components/Sprite';
import bem from 'utils/bem';
import sprites from 'sprites';
import { Story } from 'stories/Story';

import story from './SpriteStory.md';
import './SpriteStory.scss';

const { keys } = Object;

const SpriteStory = () => (
  <Story className={bem.block(SpriteStory)}>
    <Markdown source={story} />

    <div className={bem.element(SpriteStory, 'example')}>
      <div className={bem.element(SpriteStory, 'exampleItem')}>
        Default
        <Sprite type="envelop" />
      </div>

      <div className={bem.element(SpriteStory, 'exampleItem')}>
        Size: 48px
        <Sprite type="lock" style={{ width: 48, height: 48 }} />
        <Sprite type="arrow-right-long" style={{ width: 48, height: 'auto' }} />
      </div>

      <div className={bem.element(SpriteStory, 'exampleItem')}>
        Primary color: red
        <Sprite type="lock" style={{ fill: 'red' }} />
      </div>

      <div className={bem.element(SpriteStory, 'exampleItem')}>
        Primary color: lightgreen
        <br />
        Secondary color: green
        <Sprite type="group" style={{ fill: 'lightgreen', color: 'green' }} />
      </div>
    </div>

    <div className={bem.element(SpriteStory, 'spriteList')}>
      {keys(sprites).map(key => (
        <div key={key} className={bem.element(SpriteStory, 'spriteItem')}>
          <Sprite type={key} className={bem.element(SpriteStory, 'spriteItemSprite')} />
          <div className={bem.element(SpriteStory, 'spriteItemTitle')}>{key}</div>
        </div>
      ))}
    </div>
  </Story>
);

SpriteStory.className = 'SpriteStory';

export default storiesOf('components', module).add('Sprite', () => <SpriteStory />);
