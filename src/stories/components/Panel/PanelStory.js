import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { Layer } from 'components/Layer';
import { Panel } from 'components/Panel';

export const PanelStory = props => {
  const [expanded, setExpanded] = useState(true);
  const expandedProps = {
    expanded,
    onExpandedChange: setExpanded
  };

  return (
    <div className={bem.block(PanelStory)}>
      <Layer>
        <Panel {...props} {...expandedProps}>
          <p style={{ padding: 34 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae arcu nec justo ultricies commodo et
            sed ligula. Nam ullamcorper purus a metus pellentesque, quis semper diam fringilla. Integer lacinia aliquam
            enim, at tempus dui sodales sit amet. Donec at vestibulum turpis. Quisque eget porttitor magna. Morbi sapien
            orci, molestie a blandit eu, sagittis et sapien. Maecenas fringilla, eros eu volutpat sagittis, dui neque
            sollicitudin nisl, sed laoreet justo quam id justo. Curabitur bibendum tortor id ipsum venenatis, vitae
            tempor ante ultrices. Vivamus suscipit ex eu ante pulvinar rutrum. Fusce id felis libero.
          </p>
        </Panel>
      </Layer>
    </div>
  );
};

PanelStory.className = 'PanelStory';

export default storiesOf('components/Panel', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Panel', () => {
    const props = {
      title: text('title', 'title'),
      actions: text('actions', '')
    };

    return <PanelStory {...props} />;
  });
