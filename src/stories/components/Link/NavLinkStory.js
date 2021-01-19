import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import mapValues from 'lodash/mapValues';
import zipObject from 'lodash/zipObject';
import React from 'react';

import { NavLink } from 'components/Link';
import sprites from 'sprites';
import { withLayout } from 'stories/StoryLayout';

const { FACES } = NavLink;

export const NavLinkStory = props => <NavLink {...props} />;

export default storiesOf('components/Link', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('NavLink', () => {
    const props = {
      children: text('children', 'Helios'),
      face: select('face', { '---': null, ...zipObject(FACES, FACES) }, FACES[0]),
      icon: select('icon', { '---': null, ...mapValues(sprites, (value, key) => key) }, null),
      to: text('to', '/to')
    };

    return <NavLinkStory {...props} />;
  });
