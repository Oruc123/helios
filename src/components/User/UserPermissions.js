import { Dropdown } from 'components/Dropdown';
import { InputArrow, InputText } from 'components/Input';
import { Permissions, PermissionsDefaultProps, PermissionsPropTypes } from 'components/Permissions';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { KEY_SPACE } from 'utils/constants';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed } from 'utils/props';
import './UserPermissions.scss';

export const UserPermissionsPropTypes = {
  ...PermissionsPropTypes,
  ...prefixBy('overlay', ElementPropTypes)
};

export const UserPermissionsDefaultProps = {
  ...PermissionsDefaultProps
};

const CLICK = ['click'];

export class UserPermissions extends PureComponent {
  static propTypes = {
    ...UserPermissionsPropTypes
  };

  static defaultProps = {
    ...UserPermissionsDefaultProps
  };

  static className = 'UserPermissions';

  state = {
    visible: false
  };

  handleChange = value => {
    const { onChange } = this.props;

    // this.handleVisibleChange(false);

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleArrowClick = () => {
    const { visible } = this.state;

    this.handleVisibleChange(!visible);
  };

  handleKeyDown = event => {
    if (event.keyCode === KEY_SPACE) {
      const { visible } = this.state;

      this.handleVisibleChange(!visible);
    }
  };

  renderOverlay() {
    const overlayProps = prefixed(this.props, 'overlay');

    return (
      <div
        {...filter(overlayProps, ElementPropTypes)}
        className={bem.element(this, 'overlay', null, overlayProps.className)}
      >
        <Permissions {...filter(this.props, PermissionsPropTypes)} onChange={this.handleChange} />
      </div>
    );
  }

  isAdmin() {
    const { value, adminValue } = this.props;

    return value.includes(adminValue);
  }

  render() {
    const { disabled } = this.props;
    const { visible } = this.state;

    return (
      <Dropdown
        overlay={this.renderOverlay()}
        visible={visible && !disabled}
        placement="bottomLeft"
        disabled={disabled}
        trigger={CLICK}
        onVisibleChange={this.handleVisibleChange}
      >
        <InputText
          value={this.isAdmin() ? 'Admin' : 'Custom'}
          readOnly
          className={bem.element(this, 'input')}
          onKeyDown={this.handleKeyDown}
        >
          <InputArrow rotate={visible} className={bem.element(this, 'arrow')} onClick={this.handleArrowClick} />
        </InputText>
      </Dropdown>
    );
  }
}
