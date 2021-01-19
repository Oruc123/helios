class ScrollBarModel {
  static from(props) {
    return new this(props);
  }

  static update(value, props) {
    if (props == null) {
      return null;
    }

    return value == null ? this.from(props) : value.update(props);
  }

  get relativePos() {
    const { scrollSize, scrollPos } = this;

    return scrollSize === 0 ? 0 : scrollPos / scrollSize;
  }

  get relativeSize() {
    const { clientSize, scrollSize } = this;

    return scrollSize === 0 ? 0 : clientSize / scrollSize;
  }

  constructor(props) {
    const { clientSize, scrollSize, scrollPos } = {
      clientSize: 0,
      scrollSize: 0,
      scrollPos: 0,
      ...props
    };

    Object.assign(this, { clientSize, scrollSize, scrollPos });
  }

  set(props) {
    const { clientSize, scrollSize, scrollPos } = { ...this, ...props };

    return this.clientSize !== clientSize || this.scrollSize !== scrollSize || this.scrollPos !== scrollPos
      ? ScrollBarModel.from({ clientSize, scrollSize, scrollPos })
      : this;
  }
}

export default ScrollBarModel;
