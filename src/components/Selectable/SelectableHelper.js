import memoize from 'memoize-one';
import {
  KEY_CTRL,
  KEY_DOWN,
  KEY_END,
  KEY_HOME,
  KEY_LEFT,
  KEY_PAGE_DOWN,
  KEY_PAGE_UP,
  KEY_RIGHT,
  KEY_SPACE,
  KEY_UP
} from 'utils/constants';

const { isArray } = Array;
const { sign } = Math;

/**
 * @param { object } item
 * @return { boolean }
 */
export const canSelect = item => item != null && !item.disabled;

/**
 * @type {function(Selectable, boolean, object[], number | number[], boolean): Set<number>}
 */
const getSelectedMemo = memoize((selection, disabled, items, value, multiple) => {
  let indexes = [];

  if (isArray(items) && value != null && !disabled) {
    if (isArray(value)) {
      indexes = multiple ? value : value.slice(0, 1);
    } else {
      indexes = [value];
    }

    indexes = indexes.filter(index => canSelect(items[index]));
  }

  return new Set(indexes);
});

/**
 * @param { Selectable } selection
 * @return { number }
 */
export function getParentHeight(selection) {
  const firstNode = selection.getItemDOMNode(0);

  return (firstNode && firstNode.offsetParent && firstNode.offsetParent.clientHeight) || 0;
}

/**
 * @param { Selectable } selection
 * @param { number } startIndex
 * @param { number } inc
 * @returns { ?number }
 */
export function findNextIndex(selection, startIndex, inc) {
  const { items, disabled } = selection.props;
  const { length } = items;

  if (!disabled && length !== 0) {
    let index = startIndex;

    do {
      index += inc;

      if (canSelect(items[index])) {
        return index;
      }
    } while (index < length && index >= 0 && index !== startIndex);
  }

  return null;
}

/**
 * @property { boolean } multiple
 * @property { number } cols
 */
class SelectableHelper {
  /**
   * @param { Selectable } selection
   * @param { number } index
   * @return { boolean }
   */
  static canSelect(selection, index) {
    const { disabled, items } = selection.props;

    return !disabled && isArray(items) && canSelect(selection, items[index]);
  }

  /**
   * @param { Selectable } selection
   * @return { Map<number> }
   */
  static getSelected(selection) {
    const { props } = selection;

    return getSelectedMemo(selection, props.disabled, props.items, props.value, props.multiple);
  }

  /**
   * @param { Selectable } selection
   * @param { Map<number> } indexes
   */
  static setSelected(selection, indexes) {
    const { props } = selection;
    const value = [...indexes];

    props.onChange(props.multiple ? value : value.slice(0, 1));
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   * @return { boolean }
   */
  static isSelected(selection, index) {
    return this.getSelected(selection).has(index);
  }

  /**
   * @param { Selectable } selection
   * @param { number } startIndex
   * @param { bool } forward
   * @return { ?number }
   */
  static findNextIndex(selection, startIndex, forward) {
    return findNextIndex(selection, startIndex, forward ? 1 : -1);
  }

  /**
   * @param { Selectable } selection
   * @param { number } startIndex
   * @param { boolean } forward
   *
   * @returns { ?number }
   */
  static findNextRowIndex(selection, startIndex, forward) {
    const { cols } = selection.props;

    return findNextIndex(selection, startIndex, forward ? cols : -cols);
  }

  /**
   * @param { Selectable } selection
   * @param { number } startIndex
   * @param { boolean } forward
   *
   * @return { ?number }
   */
  static findNextPageIndex(selection, startIndex, forward) {
    let index = this.findNextRowIndex(selection, startIndex, forward);
    let nextIndex;

    if (index != null) {
      let parentHeight = getParentHeight(selection);

      while (index != null && parentHeight > 0) {
        const node = selection.getItemDOMNode(index);

        if (node) {
          parentHeight -= node.offsetHeight;
        }

        nextIndex = index;
        index = this.findNextRowIndex(selection, index, forward);
      }
    }

    return nextIndex;
  }

  /**
   * @param { Selectable } selection
   * @return { ?number }
   */
  static getFirstIndex(selection) {
    return this.findNextIndex(selection, -1, true);
  }

  /**
   * @param { Selectable } selection
   * @return { ?number }
   */
  static getLastIndex(selection) {
    const { items } = selection.props;

    return this.findNextIndex(selection, items.length, false);
  }

  /**
   * @param { Selectable } selection
   * @return { ?number }
   */
  static getAnchorIndex(selection) {
    const { anchorIndex } = selection.props;

    return this.canSelect(selection, anchorIndex) ? anchorIndex : null;
  }

  /**
   * @param { Selectable } selection
   * @param { number } anchorIndex
   */
  static setAnchorIndex(selection, anchorIndex) {
    const { onAnchorIndexChange } = selection.props;

    onAnchorIndexChange(this.canSelect(selection, anchorIndex) ? anchorIndex : null);
  }

  /**
   * @param { Selectable } selection
   * @return { ?number }
   */
  static getLeadIndex(selection) {
    const { leadIndex } = selection.props;

    return this.canSelect(selection, leadIndex) ? leadIndex : this.getFirstIndex(selection);
  }

  /**
   * @param { Selectable } selection
   * @param { number } leadIndex
   */
  static setLeadIndex(selection, leadIndex) {
    const { onLeadIndexChange } = selection.props;
    const nextLeadIndex = this.canSelect(selection, leadIndex) ? leadIndex : null;

    onLeadIndexChange(nextLeadIndex);

    if (nextLeadIndex != null) {
      selection.scrollToIndex(nextLeadIndex);
    }
  }

  /**
   * @param { Selectable } selection
   * @return { number[] }
   */
  static getAllIndexes(selection) {
    const { items, disabled } = this.props;
    const indexes = [];

    if (!disabled && isArray(items) && items.length !== 0) {
      for (let index = items.length; index >= 0; index -= 1) {
        if (canSelect(selection, items[index])) {
          indexes.unshift(index);
        }
      }
    }

    return indexes;
  }

  /**
   * @param { Selectable } selection
   * @param { number } startIndex
   * @param { number } endIndex
   * @return { number[] }
   */
  static getRangeIndexes(selection, startIndex, endIndex) {
    const { disabled, items } = selection.props;
    const { length } = items;
    const indexes = [];

    if ((disabled && !isArray(items)) || length === 0) {
      return indexes;
    }

    const inc = sign(endIndex - startIndex);
    let index = startIndex;

    do {
      if (canSelect(selection, index)) {
        indexes.push(index);
      }

      if (index === endIndex) {
        break;
      }

      index += inc;
    } while (index < length && index >= 0);

    return indexes;
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   *
   * @return { ?number }
   */
  static getLeftIndex(selection, index) {
    return this.findNextIndex(selection, index, false);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   *
   * @return { ?number }
   */
  static getRightIndex(selection, index) {
    return this.findNextIndex(selection, index, true);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   *
   * @return { ?number }
   */
  static getUpIndex(selection, index) {
    return this.findNextRowIndex(selection, index, false);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   * @return { ?number }
   */
  static getDownIndex(selection, index) {
    return this.findNextRowIndex(selection, index, true);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   * @return { ?number }
   */
  static getPageUpIndex(selection, index) {
    return this.findNextPageIndex(selection, index, false);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   * @return { ?number }
   */
  static getPageDownIndex(selection, index) {
    return this.findNextPageIndex(selection, index, true);
  }

  /**
   * @param { Selectable } selection
   * @return { ?number }
   */
  static getHomeIndex(selection) {
    return this.getFirstIndex(selection);
  }

  /**
   * @param { Selectable } selection
   * @return { ?number }
   */
  static getEndIndex(selection) {
    return this.getLastIndex(selection);
  }

  /**
   * @param { Selectable } selection
   * @param { number } keyCode
   *
   * @return { ?number }
   */
  static getIndexFromKeyCode(selection, keyCode) {
    const leadIndex = this.getLeadIndex(selection);

    switch (keyCode) {
      case KEY_HOME:
        return this.getHomeIndex(selection);
      case KEY_END:
        return this.getEndIndex(selection);
      case KEY_LEFT:
        return this.getLeftIndex(selection, leadIndex);
      case KEY_RIGHT:
        return this.getRightIndex(selection, leadIndex);
      case KEY_UP:
        return this.getUpIndex(selection, leadIndex);
      case KEY_DOWN:
        return this.getDownIndex(selection, leadIndex);
      case KEY_PAGE_UP:
        return this.getPageUpIndex(selection, leadIndex);
      case KEY_PAGE_DOWN:
        return this.getPageDownIndex(selection, leadIndex);
      default:
        return null;
    }
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   */
  static toggleIndex(selection, index) {
    const indexes = this.getSelected(selection);

    if (indexes.has(index)) {
      indexes.delete(index);
    } else {
      indexes.add(index);
    }

    this.setAnchorIndex(selection, index);
    this.setSelected(selection, indexes);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   */
  static selectIndex(selection, index) {
    const indexes = this.getSelected(selection);

    indexes.clear();
    indexes.add(index);

    this.setAnchorIndex(selection, index);
    this.setSelected(selection, indexes);
  }

  /**
   * @param { Selectable } selection
   * @param { number } index
   */
  static selectToIndex(selection, index) {
    let anchorIndex = this.getAnchorIndex(selection);

    if (anchorIndex == null) {
      anchorIndex = index;
      this.setAnchorIndex(selection, anchorIndex);
    }

    this.setSelected(selection, this.getRangeIndexes(selection, anchorIndex, index));
  }

  /**
   * @param { Selectable } selection
   */
  static selectAll(selection) {
    this.setAnchorIndex(selection, this.getFirstIndex(selection));
    this.setLeadIndex(selection, this.getLastIndex(selection));
    this.setSelected(selection, this.getAllIndexes(selection));
  }

  /**
   * @param { Selectable } selection
   * @param { KeyboardEvent } event
   */
  static selectFromKeyboardEvent(selection, event) {
    const { multiple } = selection.props;
    const { altKey, keyCode, ctrlKey, shiftKey } = event;

    event.preventDefault();

    if (altKey || keyCode === KEY_CTRL) {
      return;
    }

    if (multiple && ctrlKey && keyCode === 65) {
      this.selectAll(selection);
      return;
    }

    if (multiple && keyCode === KEY_SPACE) {
      this.toggleIndex(selection, this.getLeadIndex(selection));
      return;
    }

    const index = this.getIndexFromKeyCode(selection, keyCode);

    if (index != null) {
      this.setLeadIndex(selection, index);

      if (multiple && shiftKey) {
        this.selectToIndex(selection, index);
      } else if (!multiple || !ctrlKey) {
        this.selectIndex(selection, index);
      }
    }
  }

  /**
   * @param { Selectable } selection
   * @param { MouseEvent } event
   * @param { number } index
   */
  static selectFromMouseEvent(selection, event, index) {
    const { multiple } = selection.props;
    const { button, ctrlKey, shiftKey } = event;

    if (button !== 0) {
      return;
    }

    event.preventDefault();

    this.setLeadIndex(selection, index);

    if (multiple && shiftKey) {
      this.selectToIndex(selection, index);
      return;
    }

    this.setAnchorIndex(selection, index);

    if (multiple && ctrlKey) {
      this.toggleIndex(selection, index);
      return;
    }

    this.selectIndex(selection, index);
  }
}

export default SelectableHelper;
