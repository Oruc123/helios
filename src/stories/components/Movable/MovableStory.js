import { Checkbox } from 'components/CheckBox';
import React, { createRef, PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import { Markdown } from 'components/Markdown';
import { Movable, MoveHandle } from 'components/Movable';
import bem from 'utils/bem';
import { Story } from 'stories/Story';

import story from './MovableStory.md';
import 'antd/es/checkbox/style/index.less';
import './MovableStory.scss';

const { BOTH, HORIZONTAL, VERTICAL, CONSTRAINT_WITHIN, isHorizontal, isVertical } = MoveHandle;

// noinspection RequiredAttributes, HtmlUnknownAttribute
class MovableStory extends PureComponent {
  static className = 'MovableStory';

  state = { handle: new MoveHandle({ constraint: CONSTRAINT_WITHIN, direction: BOTH }) };

  handleRef = createRef();

  onCheckChange = (event, direction) => {
    this.setState(({ handle: { props: { direction: handleDirection } } }) => {
      const nextDirection = event.target.checked ? handleDirection | direction : handleDirection ^ direction;

      return { handle: new MoveHandle({ constraint: CONSTRAINT_WITHIN, direction: nextDirection }) };
    });
  };

  onHorizontalChange = event => {
    this.onCheckChange(event, HORIZONTAL);
  };

  onVerticalChange = event => {
    this.onCheckChange(event, VERTICAL);
  };

  render() {
    const { handleRef } = this;
    const { handle } = this.state;
    const { direction } = handle.props;

    return (
      <Story className={bem.block(this)}>
        <Markdown source={story} />

        <div className={bem.element(this, 'toolbar')}>
          <span>Direction:</span>
          <Checkbox
            checked={isHorizontal(direction)}
            className={bem.element(this, 'check')}
            onChange={this.onHorizontalChange}
          >
            Horizontal
          </Checkbox>
          <Checkbox
            checked={isVertical(direction)}
            className={bem.element(this, 'check')}
            onChange={this.onVerticalChange}
          >
            Vertical
          </Checkbox>
        </div>
        <div className={bem.element(this, 'moveArea')}>
          <Movable handle={handle} handleRef={handleRef}>
            <div className={bem.element(this, 'movable')}>
              <div ref={handleRef} className={bem.element(this, 'movableHeader')}>
                Drag this
              </div>
              <div className={bem.element(this, 'movableContent')}>content</div>
            </div>
          </Movable>
        </div>
      </Story>
    );
  }
}

export default storiesOf('components', module).add('Movable', MovableStory);
