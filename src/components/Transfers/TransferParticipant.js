import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { FormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixed, unprefixed } from 'utils/props';

import { TransferParticipantModel } from './TransferParticipantModel';
import './TransferParticipant.scss';

// eslint-disable-next-line import/prefer-default-export
export const [TransferParticipant, TransferParticipantPropTypes, TransferParticipantDefaultProps] = withForm(
  class TransferParticipant extends PureComponent {
    static className = 'TransferParticipant';

    static propTypes = {
      ...ElementPropTypes,
      ...FormPropTypes,
      value: instanceOf(TransferParticipantModel).isRequired
    };

    renderName() {
      const { Field, format, ...props } = this.props;
      const nameProps = prefixed(props, 'name');

      return (
        <Field
          name="name"
          input={Select}
          {...nameProps}
          className={bem.element(this, 'name', null, bem.element(this, 'field'), nameProps.className)}
        />
      );
    }

    renderLicense() {
      const { Field, format, ...props } = this.props;
      const licenseProps = prefixed(props, 'license');

      return (
        <Field
          name="license"
          input={Select}
          label="License"
          {...licenseProps}
          className={bem.element(this, 'license', null, bem.element(this, 'field'), licenseProps.className)}
        />
      );
    }

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <div {...filter(unprefixed(props, 'name', 'license'), ElementPropTypes)} className={bem.block(this)}>
          {this.renderName()}
          {this.renderLicense()}
        </div>
      );
    }
  }
);
