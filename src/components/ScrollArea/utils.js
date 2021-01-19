export const OVERFLOW_AUTO = 'auto';
export const OVERFLOW_SCROLL = 'scroll';
export const OVERFLOW_HIDDEN = 'hidden';
export const OVERFLOW_VISIBLE = 'visible';
export const OVERFLOWS = [OVERFLOW_AUTO, OVERFLOW_SCROLL, OVERFLOW_HIDDEN, OVERFLOW_VISIBLE];

export function getClientSize(el, horizontal = false) {
  return el[`client${horizontal ? 'Width' : 'Height'}`];
}

function getScrollProps(el, horizontal) {
  return {
    orientation: horizontal ? 'horizontal' : 'vertical',
    clientSize: getClientSize(el, horizontal),
    scrollSize: el[`scroll${horizontal ? 'Width' : 'Height'}`],
    scrollPos: el[`scroll${horizontal ? 'Left' : 'Top'}`]
  };
}

export function getScrollState(el, horizontal = false) {
  const scrollProps = getScrollProps(el, horizontal);

  return scrollProps.scrollSize > scrollProps.clientSize ? scrollProps : null;
}

export function hasScroll(overflow) {
  return overflow === OVERFLOW_AUTO || overflow === OVERFLOW_SCROLL;
}
