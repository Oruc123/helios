import { List, ListDefaultProps, ListPropTypes } from 'components/List';
import React from 'react';
import { filter } from 'utils/props';
import './UserList.scss';

export const UserListPropTypes = {
  ...ListPropTypes
};

export const UserListDefaultProps = {
  ...ListDefaultProps
};

export class UserList extends React.PureComponent {
  static className = 'UserList';

  static propTypes = {
    ...UserListPropTypes
  };

  static defaultProps = {
    ...UserListDefaultProps
  };

  render() {
    const { columns, ...props } = this.props;

    return <List {...filter(props, ListPropTypes)} columns={columns} />;
  }
}
