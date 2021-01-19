/* eslint-disable jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events */
import { CheckGroup, CheckGroupDefaultProps, CheckGroupPropTypes } from 'components/CheckBox';
import { Iconed } from 'components/Icon';
import { node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { SPRITE_SECURE } from 'sprites';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import './Permissions.scss';

const PERMISSION_ADMIN = { value: 'fullaccess', label: 'Admin' };
const PERMISSION_COMPLIANCE = { value: 'foo', label: 'Compliance' };
const PERMISSION_OPERATIONS = { value: 'foo', label: 'Operations' };
const PERMISSION_RELATIONSHIP_MANAGER = { value: 'foo', label: 'Relationship Manager' };
const PERMISSION_AUDITOR = { value: 'bar', label: 'Auditor' };
const PERMISSION_EXAMINER = { value: 'bar', label: 'Examiner' };

const PERMISSIONS = [
  PERMISSION_AUDITOR,
  PERMISSION_COMPLIANCE,
  PERMISSION_EXAMINER,
  PERMISSION_OPERATIONS,
  PERMISSION_RELATIONSHIP_MANAGER
];

export const PermissionsPropTypes = {
  ...CheckGroupPropTypes,
  adminValue: string,
  adminLabel: node
};

export const PermissionsDefaultProps = {
  ...CheckGroupDefaultProps,
  adminValue: PERMISSION_ADMIN.value,
  adminLabel: PERMISSION_ADMIN.label,
  items: PERMISSIONS
};

export class Permissions extends PureComponent {
  static className = 'Permissions';

  static propTypes = {
    ...PermissionsPropTypes
  };

  static defaultProps = {
    ...PermissionsDefaultProps
  };

  handleChange = value => {
    const { onChange, adminValue } = this.props;

    if (typeof onChange === 'function') {
      onChange(value.includes(adminValue) ? [adminValue] : value.filter(v => v !== adminValue));
    }
  };

  handleCustomChange = value => {
    this.handleChange(value);
  };

  handleAdminClick = () => {
    const { adminValue } = this.props;

    this.handleChange([adminValue]);
  };

  isAdmin() {
    const { value, adminValue } = this.props;

    return value.includes(adminValue);
  }

  renderAdminItem() {
    const { adminLabel } = this.props;

    return (
      <Iconed
        icon={SPRITE_SECURE}
        icon-face={this.isAdmin() ? Iconed.FACE_ACTIVE : Iconed.FACE_DEFAULT}
        icon-className={bem.element(this, 'adminIcon')}
      >
        <div role="button" className={bem.element(this, 'admin')} onClick={this.handleAdminClick}>
          {adminLabel}
        </div>
      </Iconed>
    );
  }

  render() {
    const { value, ...props } = this.props;

    return (
      <div className={bem.block(this)}>
        {this.renderAdminItem()}
        <CheckGroup
          {...filter(props, CheckGroupPropTypes)}
          value={this.isAdmin() ? [] : value}
          classNames={bem.element(this, 'custom')}
          onChange={this.handleCustomChange}
        />
      </div>
    );
  }
}

Permissions.PERMISSION_ADMIN = PERMISSION_ADMIN;
Permissions.PERMISSION_AUDITOR = PERMISSION_AUDITOR;
Permissions.PERMISSION_COMPLIANCE = PERMISSION_COMPLIANCE;
Permissions.PERMISSION_EXAMINER = PERMISSION_EXAMINER;
Permissions.PERMISSION_OPERATIONS = PERMISSION_OPERATIONS;
Permissions.PERMISSION_RELATIONSHIP_MANAGER = PERMISSION_RELATIONSHIP_MANAGER;
Permissions.PERMISSIONS = PERMISSIONS;
