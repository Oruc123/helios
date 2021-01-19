import { arrayOf, element, oneOfType, string } from 'prop-types';
import React, { Children, cloneElement, createRef, Fragment, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { isElement } from 'react-is';

import bem from 'utils/bem';
import { AnimationFrame } from 'utils/html';
import { Bounds, Size } from 'utils/rect';
import { ElementPropTypes } from 'utils/prop-types';
import './Overlay.scss';

const { isArray } = Array;

/**
 * @param { { current: * } } ref
 *
 * @return { ?HTMLElement }
 */
// eslint-disable-next-line react/no-find-dom-node
const findDOMNodeByRef = ref => findDOMNode(ref.current);

/**
 * @param { Bounds } bounds
 * @param { string[] } aligns
 *
 * @return { ?{ align: string, style: Object } }
 */
const MaxSquareStrategy = () => {};

/**
 * @param { HTMLElement } element
 * @param { Size[] } sizes
 *
 * @return { ?number }
 */
const MinOverflowStrategy = (element, sizes) => {
  const { length } = sizes;
  const scrollSize = new Size(element.scrollWidth, element.scrollHeight);
  let index;

  for (let i = 0; i < length; i += 1) {
    const size = sizes[i];

    if (index == null || size.sub(scrollSize).square > sizes[index].sub(scrollSize).square) {
      index = i;
    }
  }

  return index;
};

export const OverlayPropTypes = {
  ...ElementPropTypes,
  align: oneOfType([string, arrayOf(string)]).isRequired,
  children: element.isRequired,
  overlay: element.isRequired
};

export const OverlayDefaultProps = {};

export class Overlay extends PureComponent {
  static className = 'Overlay';

  static propTypes = OverlayPropTypes;

  static defaultProps = OverlayDefaultProps;

  static get MaxSquareStrategy() {
    return MaxSquareStrategy;
  }

  static get MinOverflowStrategy() {
    return MinOverflowStrategy;
  }

  state = {
    /**
     * Child bounds
     * @type { ?Bounds }
     */
    bounds: null,

    /**
     * Wrapper size
     * @type { ?Size }
     */
    size: null,

    /**
     * Align string
     * @type { ?string[] }
     */
    mods: null,

    /**
     * Wrapper Style
     * @type { ?Object }
     */
    style: null
  };

  componentDidMount() {
    this.setOverlayState();
    this.frame.request();
  }

  componentDidUpdate(prevProps, prevState) {
    const { align, overlay, children } = this.props;

    if (children !== prevProps.children || overlay !== prevProps.overlay || align !== prevProps.align) {
      this.setOverlayState();
    } else {
      const { mods, style } = prevState;

      if (mods == null || style == null) {
        this.setAlignState();
      }
    }
  }

  componentWillUnmount() {
    const { frame } = this;

    if (frame) {
      delete this.frame;
      frame.cancel();
    }
  }

  childRef = createRef();

  wrapperRef = createRef();

  getChildBounds = state => {
    const { bounds: currBounds } = state;
    const child = findDOMNodeByRef(this.childRef);
    let bounds = null;

    if (child) {
      bounds = currBounds ? currBounds.updateFromElement(child) : Bounds.fromElement(child);
    }

    return bounds;
  };

  getWrapperSize = state => {
    const { size: currSize } = state;
    const { current: wrapper } = this.wrapperRef;
    let size = null;

    if (wrapper) {
      size = currSize ? currSize.updateFromElement(wrapper) : Size.fromElement(wrapper);
    }

    return size;
  };

  setOverlayState = () => {
    this.setState(state => ({
      bounds: this.getChildBounds(state),
      size: this.getWrapperSize(state),
      mods: null,
      style: null
    }));
  };

  setAlignState = () => {
    this.setState((state, props) => {
      const { bounds, size } = state;
      const { align, alignStrategy } = props;

      if (bounds && size && align && typeof alignStrategy === 'function') {
        return alignStrategy(bounds, size, isArray(align) ? align : [align]);
      }

      return null;
    });
  };

  handleFrame = () => {
    this.setchildState();
    this.frame.request();
  };

  frame = new AnimationFrame(this.handleFrame);

  renderOverlay() {
    const { overlay } = this.props;
    const overlayElement = Children.only(overlay);

    if (isElement(overlayElement)) {
      const { mods, style } = this.state;

      return (
        <div
          ref={this.wrapperRef}
          className={bem.element(this, 'wrapper', mods ? ['aligned', ...mods] : null)}
          style={style}
        >
          {cloneElement(overlayElement, {
            className: bem.block(this, mods, overlayElement.props.className)
          })}
        </div>
      );
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const child = Children.only(children);

    if (!isElement(child)) {
      return null;
    }

    return (
      <Fragment>
        {cloneElement(child, { ref: this.childRef })}
        {this.renderOverlay()}
      </Fragment>
    );
  }
}
