import mapValues from 'lodash/mapValues';
import zipObject from 'lodash/zipObject';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { boolean, optionsKnob as options, select, text, withKnobs } from '@storybook/addon-knobs';

import { Button } from 'components/Button';
import sprites from 'sprites';
import { withLayout } from 'stories/StoryLayout';
import notes from './ButtonStory.md';

const { FACES, ICON_ALIGNS, SIZES } = Button;
const inline = { display: 'inline-radio' };

export const ButtonStory = props =>
  FACES.map(face => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={`button-${face}`} style={{ width: 100 }}>
        {face}:
      </label>
      <Button {...props} id={`button-${face}`} face={face} onClick={action('onClick')} />
    </div>
  ));

export default storiesOf('components/Button', module)
  .addDecorator(withInfo)
  .addDecorator(withLayout())
  .addDecorator(withKnobs)
  .add(
    'Button',
    () => {
      const props = {
        children: text('children', 'My Button'),
        type: options('type', { button: 'button', reset: 'reset', submit: 'submit' }, 'button', inline),
        disabled: boolean('disabled', false),
        size: options('size', zipObject(SIZES, SIZES), 'medium', inline),
        rounded: boolean('rounded', false),
        icon: select('icon', { '---': null, ...mapValues(sprites, (value, key) => key) }, null),
        iconAlign: options('iconAlign', zipObject(ICON_ALIGNS, ICON_ALIGNS), 'left', inline)
      };

      return <ButtonStory {...props} />;
    },
    { notes: { markdown: notes } }
  );
