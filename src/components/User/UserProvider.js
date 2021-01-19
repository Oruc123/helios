import { func, node, object, string } from 'prop-types';
import { PureComponent } from 'react';

export const UserProviderPropTypes = {
  accessToken: string.isRequired,
  children: node,
  user: object,
  userInfo: func.isRequired
};

export const UserProviderDefaultProps = {
  children: null,
  user: null
};

export class UserProvider extends PureComponent {
  static propTypes = UserProviderPropTypes;

  static defaultProps = UserProviderDefaultProps;

  static className = 'UserProvider';

  componentWillMount() {
    const { accessToken, user, userInfo } = this.props;

    if (!user) {
      userInfo(accessToken);
    }
  }

  render() {
    const { children, user } = this.props;

    return user ? children : null;
  }
}
