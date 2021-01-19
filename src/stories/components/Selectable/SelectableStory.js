import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React, { Component, createRef } from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { Focusable } from 'components/Focus';
import { Selectable } from 'components/Selectable';

import './SelectableStory.scss';

const items = [
  { children: '0123456789' },
  { children: '1234567890', disabled: true },
  { children: '2345678901' },
  { children: '3456789012' },
  { children: '4567890123', disabled: true },
  { children: '5678901234' },
  { children: '6789012345', disabled: true },
  { children: '7890123456' },
  { children: '8901234567' },
  { children: '9012345678' },
  { children: '0123456789' }
];

export class SelectableStory extends Component {
  state = {
    focused: false
  };

  selectableRef = createRef();

  handleFocusedChange = focused => {
    this.setState({ focused });
  };

  handleKeyDown = event => {
    const { current } = this.selectableRef;

    current.selectFromKeyboardEvent(event);
  };

  render() {
    const { focused } = this.state;

    return (
      <div className={bem.block(SelectableStory)}>
        <Focusable focused={focused} onFocusedChange={this.handleFocusedChange} onKeyDown={this.handleKeyDown}>
          <div className={bem.element(SelectableStory, 'selectable')}>
            <Selectable
              {...this.props}
              ref={this.selectableRef}
              Element="div"
              focused={focused}
              items={items}
              item-className={bem.element(SelectableStory, 'item')}
            />
          </div>
        </Focusable>
      </div>
    );
  }
}

SelectableStory.className = 'SelectableStory';

export default storiesOf('components/Selectable', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Selectable', () => {
    const props = {
      disabled: boolean('disabled', false),
      multiple: boolean('multiple', true)
    };

    return <SelectableStory {...props} />;
  });
