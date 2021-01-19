import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { Page } from 'components/Page';

export const PageStory = props => (
  <div className={bem.block(PageStory)}>
    <Page {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae arcu nec justo ultricies commodo et sed
        ligula. Nam ullamcorper purus a metus pellentesque, quis semper diam fringilla. Integer lacinia aliquam enim, at
        tempus dui sodales sit amet. Donec at vestibulum turpis. Quisque eget porttitor magna. Morbi sapien orci,
        molestie a blandit eu, sagittis et sapien. Maecenas fringilla, eros eu volutpat sagittis, dui neque sollicitudin
        nisl, sed laoreet justo quam id justo. Curabitur bibendum tortor id ipsum venenatis, vitae tempor ante ultrices.
        Vivamus suscipit ex eu ante pulvinar rutrum. Fusce id felis libero.
      </p>
    </Page>
  </div>
);

PageStory.className = 'PageStory';

export default storiesOf('components/Page', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Page', () => {
    const props = {
      title: text('title', 'Page title'),
      actions: text('actions', '')
    };

    return <PageStory {...props} />;
  });
