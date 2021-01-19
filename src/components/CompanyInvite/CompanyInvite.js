import { Button } from 'components/Button';
import { FormButtons, FormPropTypes, withForm } from 'components/Form';
import { Info } from 'components/Info';
import { InputText } from 'components/Input';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import './CompanyInvite.scss';
import { CompanyInviteModel } from './CompanyInviteModel';

// eslint-disable-next-line import/prefer-default-export
export const [CompanyInvite, CompanyInvitePropTypes, CompanyInviteDefaultProps] = withForm(
  class CompanyInvite extends PureComponent {
    static className = 'CompanyInvite';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(CompanyInviteModel).isRequired
    };

    componentDidMount() {
      const { companyId, onChange, value } = this.props;

      onChange(value.setValue({ externalId: companyId }));
    }

    handleCancelClick = () => {
      const { onClose } = this.props;

      if (typeof onClose === 'function') {
        onClose();
      }
    };

    handleSubmitClick = () => {
      const { onSubmit } = this.props;

      if (typeof onSubmit === 'function') {
        onSubmit();
      }
    };

    renderLeftColumn() {
      const { Field, companyDetails } = this.props;

      return (
        <div className={bem.element(this, 'column', 'left')}>
          <Info label="Company">{companyDetails?.name}</Info>
          <Field name="firstName" label="First Name" input={InputText} />
        </div>
      );
    }

    renderRightColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', 'right')}>
          <Field name="email" label="Admin Email" input={InputText} input-type="email" />
          <Field name="lastName" label="Last Name" input={InputText} />
        </div>
      );
    }

    renderFooter() {
      const { value } = this.props;
      const isPending = value.isPending();

      return (
        <div className={bem.element(this, 'footer')}>
          <FormButtons
            cancel-disabled={isPending}
            cancel-onClick={this.handleCancelClick}
            submit-pending={value.isPending()}
            submit-disabled={isPending || value.hasError()}
            submit-children="Send"
            submit-face={Button.FACE_PRIMARY}
            submit-onClick={this.handleSubmitClick}
          />
        </div>
      );
    }

    render() {
      const { Field, value, ...props } = this.props;
      const error = value.getError();

      return (
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
          <div className={bem.element(this, 'columns')}>
            {this.renderLeftColumn()}
            {this.renderRightColumn()}
          </div>
          <div className={bem.element(this, 'message')}>{error?.message}</div>
          {this.renderFooter()}
        </div>
      );
    }
  }
);
