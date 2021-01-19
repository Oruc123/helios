import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import mapValues from 'lodash/mapValues';
import zipObject from 'lodash/zipObject';
import React from 'react';

import { Link } from 'components/Link';
import sprites from 'sprites';
import { withLayout } from 'stories/StoryLayout';

const { FACES } = Link;

export const LinkStory = props => <Link {...props} />;

export default storiesOf('components/Link', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Link', () => {
    const props = {
      button: boolean('button', false),
      children: text('children', 'Helios'),
      face: select('face', { '---': null, ...zipObject(FACES, FACES) }, FACES[0]),
      icon: select('icon', { '---': null, ...mapValues(sprites, (value, key) => key) }, null),
      to: text('to', '/')
    };

    return <LinkStory {...props} />;
  });
