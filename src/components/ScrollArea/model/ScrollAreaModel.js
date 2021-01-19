import ScrollBarModel from 'components/ScrollArea/model/ScrollBarModel';

class ScrollAreaModel {
  static from(props) {
    return new this(props);
  }

  constructor(props) {
    const { horizontal, vertical } = {
      horizontal: null,
      vertical: null,
      ...props
    };

    Object.assign(this, { horizontal, vertical });
  }

  set(props) {
    const { horizontal, vertical } = { ...this, ...props };

    const nextProps = {
      horizontal: ScrollBarModel.set(this.horizontal, horizontal),
      vertical: ScrollBarModel.set(this.vertical, vertical)
    };

    return nextProps.horizontal !== this.horizontal || nextProps.vertical !== this.vertical
      ? ScrollAreaModel.from(nextProps)
      : this;
  }
}

export default ScrollAreaModel;
