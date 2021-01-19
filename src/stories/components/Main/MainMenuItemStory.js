import { withInfo } from '@storybook/addon-info';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import mapValues from 'lodash/mapValues';
import React from 'react';

import { MainMenuItem } from 'components/Main';
import sprites from 'sprites';
import { withLayout } from 'stories/StoryLayout';

export const MainMenuItemStory = () => {
  const to = text('to', '/test');
  const label = text('label', 'Test Item');
  const iconType = select('icon-type', { '---': '', ...mapValues(sprites, (value, key) => key) }, '');

  // noinspection RequiredAttributes
  return (
    <MainMenuItem to={to} icon-type={iconType}>
      {label}
    </MainMenuItem>
  );
};

export default storiesOf('components/Main', module)
  .addDecorator(withLayout({ style: { width: 320 } }))
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('MainMenuItem', MainMenuItemStory);
