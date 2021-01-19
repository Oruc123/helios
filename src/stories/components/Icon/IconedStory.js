import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, withKnobs } from '@storybook/addon-knobs';
import zipObject from 'lodash/zipObject';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { Icon, Iconed } from 'components/Icon';

const { FACES, SIZES } = Icon;
const { ICONS, ALIGNS } = Iconed;

export const IconedStory = () => {
  const props = {
    icon: select('icon', zipObject(ICONS, ICONS), ICONS[0]),
    iconAlign: select('iconAlign', { ...zipObject(ALIGNS, ALIGNS) }, ALIGNS[0]),
    'icon-face': select('icon-face', { '---': null, ...zipObject(FACES, FACES) }, null),
    'icon-size': select('icon-size', zipObject(SIZES, SIZES), SIZES[0])
  };

  return (
    <Iconed {...props}>
      <div style={{ width: 150, padding: 10, background: '#efefef', borderRadius: 5 }}>Some text</div>
    </Iconed>
  );
};

export default storiesOf('components/Icon', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Iconed', IconedStory);
