import { func, instanceOf, oneOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { MoveHandle } from 'components/Movable';
import ScrollBarModel from 'components/ScrollArea/model/ScrollBarModel';
import ScrollHandle from './ScrollHandle';
import { getClientSize } from './utils';

const { HORIZONTAL } = MoveHandle;

export const ScrollBarPropTypes = {
  orientation: oneOf(['horizontal', 'vertical']).isRequired,
  scroll: instanceOf(ScrollBarModel).isRequired,
  onScroll: func.isRequired
};

export class ScrollBar extends PureComponent {
  static propTypes = ScrollBarPropTypes;

  static className = 'ScrollBar';

  state = { handlePos: 0, handleSize: 0 };

  componentDidMount() {
    this.updateHandleState();

    this.moveHandle = new MoveHandle({
      move: this.move,
      onStartMove: this.onStartMove,
      onStopMove: this.onStopMove
    });
  }

  componentDidUpdate() {
    this.updateHandleState();
  }

  componentWillUnmount() {
    this.stopMove();
    delete this.moveHandle;
  }

  onHandleDragStart = event => {
    this.startMove(event);
  };

  onStartMove = () => {
    document.body.classList.add('scrolling');
  };

  onStopMove = () => {
    document.body.classList.remove('scrolling');
  };

  move = props => {
    const { scroll, orientation, onScroll } = this.props;

    if (scroll) {
      const pos = props[orientation === HORIZONTAL ? 'left' : 'top'];

      onScroll(orientation, (scroll.scrollSize * pos) / getClientSize(this.bar, orientation));
    } else {
      this.stopMove();
    }
  };

  startMove(event) {
    const { orientation } = this.props;

    this.moveHandle.startMove(event, { direction: orientation });
  }

  stopMove() {
    if (this.moveHandle) {
      this.moveHandle.stopMove();
    }
  }

  updateHandleState() {
    const { orientation, scroll } = this.props;

    if (scroll) {
      const { handlePos, handleSize } = this.state;
      const nextPosition = getClientSize(this.bar, orientation) * scroll.relativePos;
      const nextSize = scroll.relativeSize * 100;

      if (handlePos !== nextPosition || handleSize !== nextSize) {
        this.setState({ handlePos: nextPosition, handleSize: nextSize });
      }
    }
  }

  renderHandle() {
    const { orientation } = this.props;
    const { handlePos: pos, handleSize: size } = this.state;

    return (
      <ScrollHandle
        ref={this.ref('handle')}
        {...{ orientation, pos, size }}
        onMouseDown={this.onHandleDragStart}
        onTouchStart={this.onHandleDragStart}
      />
    );
  }

  render() {
    const { orientation, scroll } = this.props;

    return (
      <div className={this.block({ [orientation]: true, disabled: !scroll })}>
        <i className={this.element('icon', { prev: true })} />

        <div ref={this.ref('bar')} className={this.element('bar')}>
          {scroll ? this.renderHandle() : null}
        </div>

        <i className={this.element('icon', { next: true })} />
      </div>
    );
  }
}
