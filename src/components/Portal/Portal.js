import { string } from 'prop-types';
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import bem from 'utils/bem';
import { filter } from 'utils/props';
import { ElementPropTypes } from 'utils/prop-types';

import './Portal.scss';

const { assign } = Object;

const $root = Symbol('root');

function getRoot(rootId) {
  return document.getElementById(rootId);
}

function createRoot(rootId, props) {
  return assign(document.body.appendChild(document.createElement('div')), { id: rootId, ...props });
}

function removeRoot(rootEl) {
  rootEl.parentNode.removeChild(rootEl);
}

export const PortalPropTypes = {
  ...ElementPropTypes,
  rootId: string.isRequired
};

export const PortalDefaultProps = {};

export class Portal extends PureComponent {
  static className = 'Portal';

  static propTypes = {
    ...PortalPropTypes
  };

  static defaultProps = {
    ...PortalDefaultProps
  };

  componentWillUnmount() {
    const { rootId } = this.props;

    if (rootId) {
      const root = getRoot(rootId);

      if (root) {
        removeRoot(root);
      }
    }
  }

  getRoot() {
    const { rootId } = this.props;
    const { [$root]: currRoot } = this;
    let root;

    if (rootId) {
      root = getRoot(rootId);

      if (!root || (currRoot && currRoot.id !== rootId)) {
        if (currRoot) {
          removeRoot(currRoot);
        }

        root = createRoot(rootId, { className: bem.element(this, 'root') });
      }
    } else if (currRoot) {
      root = removeRoot(currRoot);
    }

    return root;
  }

  render() {
    const root = this.getRoot();

    if (!root) {
      return null;
    }

    return createPortal(<div {...filter(this.props, ElementPropTypes)} className={bem.block(this)} />, root);
  }
}
