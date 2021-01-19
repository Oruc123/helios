import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { Focusable } from 'components/Focus';

import './FocusableStory.scss';

export const FocusableStory = props => (
  <div className={bem.block(FocusableStory)}>
    <input type="checkbox" />
    <Focusable {...props} defaultFocused={false}>
      <div className={bem.element(FocusableStory, 'test')}>
        <span />
        1
        <br />2
      </div>
    </Focusable>
  </div>
);

FocusableStory.className = 'FocusableStory';

export default storiesOf('components/Focusable', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Focusable', () => {
    const props = {
      disabled: boolean('disabled', false),
      outline: boolean('outline', true)
    };

    return <FocusableStory {...props} />;
  });
