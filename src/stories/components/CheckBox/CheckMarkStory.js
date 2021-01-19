import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { CheckMark } from 'components/CheckBox';
import zipObject from 'lodash/zipObject';

const { FACES } = CheckMark;

export const CheckMarkStory = props => <CheckMark {...props} />;

export default storiesOf('components/CheckBox', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('CheckMark', () => {
    const props = {
      flat: boolean('flat', false),
      checked: boolean('checked', false),
      rounded: boolean('rounded', false),
      face: select('face', { '---': null, ...zipObject(FACES, FACES) }, null)
    };

    return <CheckMarkStory {...props} />;
  });
