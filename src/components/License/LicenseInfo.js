import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';

import './LicenseInfo.scss';

export const LicenseInfoPropTypes = {
  ...ElementPropTypes,
  name: string,
  license: string,
  licenseType: string
};

export const LicenseInfoDefaultProps = {
  name: undefined,
  license: undefined,
  licenseType: undefined
};

export class LicenseInfo extends PureComponent {
  static propTypes = { ...LicenseInfoPropTypes };

  static defaultProps = { ...LicenseInfoDefaultProps };

  static className = 'LicenseInfo';

  render() {
    const { name, license, licenseType } = this.props;

    return (
      <div className={bem.block(this)}>
        {name && <div className={bem.element(this, 'name')}>{name}</div>}
        {license && <div className={bem.element(this, 'label')}>{license}</div>}
        {licenseType && <div className={bem.element(this, 'label')}>{licenseType}</div>}
      </div>
    );
  }
}
