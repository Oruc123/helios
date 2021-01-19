import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import zipObject from 'lodash/zipObject';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { Icon } from 'components/Icon';

const { FACES, SIZES, SIZE_MEDIUM, TYPES } = Icon;

export const IconStory = props => TYPES.map(type => <Icon {...props} type={type} style={{ margin: 5 }} />);

export default storiesOf('components/Icon', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Icon', () => {
    const props = {
      face: select('face', { '---': null, ...zipObject(FACES, FACES) }, FACES[0]),
      size: select('size', { '---': null, ...zipObject(SIZES, SIZES) }, SIZE_MEDIUM),
      bordered: boolean('bordered', false),
      rounded: boolean('rounded', false),
      light: boolean('light', false)
    };

    return <IconStory {...props} />;
  });
