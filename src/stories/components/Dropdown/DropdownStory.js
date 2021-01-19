import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { boolean, withKnobs } from '@storybook/addon-knobs';

import { Avatar } from 'components/Avatar';
import { Dropdown } from 'components/Dropdown';
import { withLayout } from 'stories/StoryLayout';
import notes from './DropdownStory.md';

const dataSource = [
  {
    'icon-type': 'settings-stroke',
    label: 'Account Settings',
    action: action('click Account Settings')
  },
  {
    'icon-type': 'logout',
    label: 'Log Out',
    action: action('click Log Out')
  }
];

const avatarProps = {
  userName: 'Evgeny Shmakov',
  image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
};

const DropdownStory = () => {
  const dropdownProps = {
    disabled: boolean('disabled', false),
    onVisibleChange: action('visibleChange'),
    dataSource
  };

  return (
    <Dropdown {...dropdownProps}>
      <span>
        <Avatar {...avatarProps} />
      </span>
    </Dropdown>
  );
};

export default storiesOf('components', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout())
  .add('Dropdown', DropdownStory, { notes: { markdown: notes } });
