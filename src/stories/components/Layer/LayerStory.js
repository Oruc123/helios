import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { Layer } from 'components/Layer';

export const LayerStory = () => {
  const props = {
    rounded: boolean('rounded', true),
    shadowed: boolean('shadowed', true)
  };

  // noinspection RequiredAttributes
  return (
    <div className={bem.block(LayerStory)}>
      <Layer {...props} style={{ margin: 30, height: 100 }} />
    </div>
  );
};

LayerStory.className = 'LayerStory';

export default storiesOf('components/Layer', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Layer', LayerStory);
