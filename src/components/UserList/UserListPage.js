import { Link } from 'components/Link';
import { ListPage, ListPageDefaultProps, ListPagePropTypes } from 'components/List';
import createUserListColumns from 'components/UserList/createUserListColumns';
import { UserListActions } from 'components/UserList/UserListActions';
import { shape, string } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';
import { UnrequiredType } from 'utils/prop-types';
import { filter, prefixed } from 'utils/props';
import { FormModel } from 'utils/form';

import './UserListPage.scss';

const EmptyModel = FormModel.Factory({});

export const UserListPagePropTypes = {
  ...ListPagePropTypes,
  columns: UnrequiredType(ListPagePropTypes.columns),
  paths: shape({ add: string.isRequired, delete: string.isRequired, edit: string.isRequired }).isRequired
};

export const UserListPageDefaultProps = {
  ...ListPageDefaultProps,
  columns: undefined,
  title: 'All Users'
};

export class UserListPage extends React.PureComponent {
  static className = 'UserListPage';

  static propTypes = {
    ...UserListPagePropTypes
  };

  static defaultProps = {
    ...UserListPageDefaultProps
  };

  componentDidMount() {
    const { onRead } = this.props;
    onRead(new EmptyModel());
  }

  defaultColumns = createUserListColumns(this);

  renderRowActions = user => {
    const { paths } = this.props;

    return <UserListActions paths={paths} user={user} />;
  };

  renderActions() {
    const { paths, ...props } = this.props;
    const addProps = prefixed(props, 'add');

    return (
      <Link
        {...addProps}
        to={paths.add}
        button
        rounded
        face={Link.FACE_DEFAULT}
        className={bem.element(this, 'action', 'add', addProps.className)}
      >
        Add New
      </Link>
    );
  }

  render() {
    const { columns, children, value, ...props } = this.props;

    return (
      <ListPage
        {...filter(props, ListPagePropTypes)}
        actions={this.renderActions()}
        columns={columns || this.defaultColumns}
        value={value}
        className={bem.block(this)}
      >
        {value.isPending() ? null : children}
      </ListPage>
    );
  }
}
