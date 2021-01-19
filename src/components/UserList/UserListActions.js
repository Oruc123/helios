import { Link } from 'components/Link';
import { ListDefaultProps } from 'components/List';
import { object, shape, string } from 'prop-types';
import React from 'react';
import { generatePath } from 'react-router';
import bem from 'utils/bem';
import './UserListActions.scss';

export const UserListActionsPropTypes = {
  paths: shape({ delete: string.isRequired, edit: string.isRequired }).isRequired,
  user: object.isRequired
};

export const UserListActionsDefaultProps = {
  ...ListDefaultProps
};

export class UserListActions extends React.PureComponent {
  static className = 'UserListActions';

  static propTypes = {
    ...UserListActionsPropTypes
  };

  static defaultProps = {
    ...UserListActionsDefaultProps
  };

  render() {
    const { paths, user } = this.props;
    const { id: userId } = user;

    return (
      <div className={bem.block(this)}>
        <Link
          to={generatePath(paths.edit, { userId })}
          face={Link.FACE_DEFAULT}
          className={bem.element(this, 'action', 'edit')}
        >
          EDIT
        </Link>
      </div>
    );
  }
}
