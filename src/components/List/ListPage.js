import { Layer } from 'components/Layer';
import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { bool, func } from 'prop-types';
import React, { Fragment } from 'react';
import bem from 'utils/bem';
import { filter, prefixed, withControlledProps } from 'utils/props';

import { List, ListDefaultProps, ListPropTypes } from './List';
import './ListPage.scss';

// eslint-disable-next-line import/prefer-default-export
export const [ListPage, ListPagePropTypes, ListPageDefaultProps] = withControlledProps(
  class ListPage extends React.PureComponent {
    static className = 'ListPage';

    static propTypes = {
      ...PagePropTypes,
      ...ListPropTypes,
      search: bool,
      onReadAbort: func,
      onRead: func,
      onSearchValueChange: func
    };

    static defaultProps = {
      ...PageDefaultProps,
      ...ListDefaultProps,
      search: true,
      onRead: undefined,
      onReadAbort: undefined,
      onSearchValueChange: undefined
    };

    static controlledProps = {
      searchValue: true
    };

    componentDidMount() {
      const { onRead } = this.props;

      if (typeof onRead === 'function') {
        onRead();
      }
    }

    componentWillUnmount() {
      const { onReadAbort } = this.props;

      if (typeof onReadAbort === 'function') {
        onReadAbort();
      }
    }

    renderSearch() {
      const { search, searchValue, onSearchValueChange, ...props } = this.props;

      if (search) {
        const searchProps = prefixed(props, 'search');

        return (
          <Search
            {...searchProps}
            value={searchValue}
            onChange={onSearchValueChange}
            className={bem.element(this, 'action', 'search', searchProps.className)}
          />
        );
      }

      return null;
    }

    renderActions() {
      const { actions } = this.props;

      return (
        <Fragment>
          {this.renderSearch()}
          {actions}
        </Fragment>
      );
    }

    render() {
      const { children, ...props } = this.props;

      return (
        <Page {...filter(props, PagePropTypes)} className={bem.block(this)} actions={this.renderActions()}>
          <Layer rounded shadowed>
            <List {...filter(props, ListPropTypes)} />
          </Layer>
          {children}
        </Page>
      );
    }
  }
);
