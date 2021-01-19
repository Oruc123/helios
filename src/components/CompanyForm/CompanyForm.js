import { DatePicker } from 'components/DatePicker';
import { Select } from 'components/Select';
import { Button } from 'components/Button';
import { FormButtons, FormPropTypes, withForm } from 'components/Form';
import { InputText } from 'components/Input';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import { dataSource } from 'components/Relationships/data';
import './CompanyForm.scss';
import { CompanyFormModel } from './CompanyFormModel';

// eslint-disable-next-line import/prefer-default-export
export const [CompanyForm, CompanyFormPropTypes, CompanyFormDefaultProps] = withForm(
  class CompanyForm extends PureComponent {
    static className = 'CompanyForm';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(CompanyFormModel).isRequired
    };

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

    handleContinueClick = () => {
      const { onContinue } = this.props;

      if (typeof onContinue === 'function') {
        onContinue();
      }
    };

    renderLeftColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', 'left')}>
          <Field
            name="name"
            label="Company name"
            input={InputText}
            className={bem.element(this, 'field', 'companyName')}
          />
          <Field
            name="business_type"
            label="Business Type"
            input={Select}
            input-type="email"
            input-dataSource={dataSource.businessTypes.filter(obg => obg.label !== 'All')}
            className={bem.element(this, 'field', 'businessType')}
          />
          <Field
            name="state"
            label="State of Incorporation"
            input={Select}
            input-dataSource={dataSource.stateOfIncorporation}
            className={bem.element(this, 'field', 'stateOfIncorporation')}
          />
        </div>
      );
    }

    renderRightColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', 'right')}>
          <Field
            name="entity_type"
            label="Entity Type"
            input={Select}
            input-dataSource={dataSource.entityTypes.filter(obg => obg.label !== 'All')}
            className={bem.element(this, 'field', 'entityType')}
          />
          <Field
            name="date"
            label="Primary Account Opening Date"
            input={DatePicker}
            className={bem.element(this, 'field', 'openingDate')}
          />
        </div>
      );
    }

    renderFooter() {
      const { value } = this.props;
      const isPending = value.isPending();

      return (
        <div className={bem.element(this, 'footer')}>
          <FormButtons
            cancel-className={bem.element(this, 'cancel')}
            cancel-disabled={isPending}
            cancel-onClick={this.handleCancelClick}
            submit-pending={value.isPending()}
            submit-disabled={isPending || value.hasError()}
            submit-className={bem.element(this, 'submit')}
            submit-children="Save and Complite"
            submit-face={Button.FACE_DEFAULT}
            submit-onClick={this.handleSubmitClick}
            // continue-pending={value.isPending()}
            continue-isHidden={false}
            continue-disabled={isPending || value.hasError()}
            continue-className={bem.element(this, 'continue')}
            continue-children="Save and Continue"
            continue-onClick={this.handleContinueClick}
          />
        </div>
      );
    }

    render() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Field, value, ...props } = this.props;
      return (
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
          <div className={bem.element(this, 'columns')}>
            {this.renderLeftColumn()}
            {this.renderRightColumn()}
          </div>
          {this.renderFooter()}
        </div>
      );
    }
  }
);
