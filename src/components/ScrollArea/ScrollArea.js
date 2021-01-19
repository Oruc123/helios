import { oneOf } from 'prop-types';
import React, { createRef, PureComponent } from 'react';

import bem from 'utils/bem';
import { addEventListener, AnimationFrame } from 'utils/html';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, unprefixed } from 'utils/props';

import ScrollAreaModel from 'components/ScrollArea/model/ScrollAreaModel';
import { ScrollBar } from './ScrollBar';
import { getScrollState, hasScroll, OVERFLOW_AUTO, OVERFLOW_SCROLL, OVERFLOWS } from './utils';

const MAX_SCROLL_SIZE = 20;
let SCROLL_SIZE;

export const ScrollAreaPropTypes = {
  ...ElementPropTypes,

  overflowX: oneOf(OVERFLOWS),
  overflowY: oneOf(OVERFLOWS)
};

export const ScrollAreaDefaultProps = {
  overflowX: OVERFLOW_AUTO,
  overflowY: OVERFLOW_AUTO
};

export class ScrollArea extends PureComponent {
  static propTypes = ScrollAreaPropTypes;

  static defaultProps = ScrollAreaDefaultProps;

  static className = 'ScrollArea';

  state = {
    scroll: new ScrollAreaModel(),
    scrollSize: SCROLL_SIZE
  };

  componentDidMount() {
    this.setScrollState();
    this.removeWindowResizeListener = addEventListener(window, 'resize', this.handleWindowResize);
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate() {
    this.setScrollState();
  }

  componentWillUnmount() {
    this.frame.cancel();

    if (this.removeWindowResizeListener) {
      this.removeWindowResizeListener();
    }
  }

  areaRef = createRef();

  frame = new AnimationFrame(() => this.setScrollState());

  handleBarScroll = (orientation, scrollPos) => {
    this.setScroll(orientation, scrollPos);
  };

  handleMouseEnter = () => {
    this.frame.request();
  };

  handleScroll = () => {
    this.frame.request();
  };

  handleWindowResize = () => {
    this.frame.request();
  };

  setScroll(orientation, scrollPos) {
    this.container[`scroll${orientation === 'horizontal' ? 'Left' : 'Top'}`] = scrollPos;
  }

  getScrollState() {
    const { container } = this;
    const { overflowX, overflowY } = this.props;

    return {
      horizontal: hasScroll(overflowX) ? getScrollState(container, true) : null,
      vertical: hasScroll(overflowY) ? getScrollState(container) : null
    };
  }

  setScrollState() {
    const { current: area } = this.areaRef;
    const { scroll, scrollSize } = this.state;

    const nextScroll = scroll.update(this.getScrollState());

    if (SCROLL_SIZE == null) {
      SCROLL_SIZE = area.offsetWidth - area.clientWidth;
    }

    if (SCROLL_SIZE !== scrollSize || scroll !== nextScroll) {
      this.setState({ scrollSize: SCROLL_SIZE, scroll: nextScroll });
    }
  }

  renderScrollBar(horizontal) {
    const orientation = horizontal ? 'horizontal' : 'vertical';
    const { [`overflow${horizontal ? 'X' : 'Y'}`]: overflow } = this.props;
    const { [orientation]: scroll } = this.state;

    const shouldRender = hasScroll(overflow) && (overflow === OVERFLOW_SCROLL || scroll);
    let bar;

    if (shouldRender) {
      bar = (
        <ScrollBar
          {...unprefixed(this.props, 'bar')}
          {...unprefixed(this.props, `${orientation}-bar`)}
          orientation={orientation}
          scroll={scroll}
          className={bem.element(this, 'bar', orientation)}
          onScroll={this.handleBarScroll}
        />
      );
    }

    return bar;
  }

  renderContent() {
    const { children } = this.props;
    const { scrollSize } = this.state;

    const style =
      scrollSize == null
        ? { visibility: 'hidden' }
        : {
            marginRight: MAX_SCROLL_SIZE - scrollSize,
            marginBottom: MAX_SCROLL_SIZE - scrollSize
          };

    return (
      <div {...unprefixed(this.props, 'content')} className={bem.element(this, 'content')} style={style}>
        {children}
      </div>
    );
  }

  renderArea() {
    return (
      <div
        {...unprefixed(this.props, 'area')}
        ref={this.areaRef}
        className={bem.element(this, 'area')}
        onScroll={this.handleScroll}
      >
        {this.renderContent()}
      </div>
    );
  }

  render() {
    const { overflowX, overflowY } = this.props;
    const { scroll } = this.state;

    const className = bem.block(this, {
      overflowX,
      overflowY,
      horizontal: scroll.horizontal != null,
      vertical: scroll.vertical != null
    });

    return (
      <div {...filter(this.props, ElementPropTypes)} className={className} onMouseEnter={this.handleMouseEnter}>
        {this.renderArea()}
        {this.renderScrollBar(overflowY)}
        {this.renderScrollBar(overflowX, true)}
      </div>
    );
  }
}
