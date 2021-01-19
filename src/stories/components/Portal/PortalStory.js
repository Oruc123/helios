import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { Portal } from 'components/Portal';

export const PortalStory = props => (
  <Portal {...props}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae arcu nec justo ultricies commodo et sed
    ligula. Nam ullamcorper purus a metus pellentesque, quis semper diam fringilla. Integer lacinia aliquam enim, at
    tempus dui sodales sit amet. Donec at vestibulum turpis. Quisque eget porttitor magna. Morbi sapien orci, molestie a
    blandit eu, sagittis et sapien. Maecenas fringilla, eros eu volutpat sagittis, dui neque sollicitudin nisl, sed
    laoreet justo quam id justo. Curabitur bibendum tortor id ipsum venenatis, vitae tempor ante ultrices. Vivamus
    suscipit ex eu ante pulvinar rutrum. Fusce id felis libero.
  </Portal>
);

export default storiesOf('components/Portal', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Portal', () => {
    const props = {
      rootId: text('rootId', 'abc')
    };

    return <PortalStory {...props} />;
  });
