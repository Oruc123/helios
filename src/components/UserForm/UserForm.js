import { CheckBox } from 'components/CheckBox';
import { FormButtons, FormPropTypes, withForm } from 'components/Form';
import { InputText } from 'components/Input';
import { UserPermissions } from 'components/User';
import { instanceOf, string } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ListModel } from 'utils/list';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import './UserForm.scss';
import { UserFormModel } from './UserFormModel';

// eslint-disable-next-line import/prefer-default-export
export const [UserForm, UserFormPropTypes, UserFormDefaultProps] = withForm(
  class UserForm extends PureComponent {
    static className = 'UserForm';

    static propTypes = {
      ...FormPropTypes,
      userId: string,
      users: instanceOf(ListModel).isRequired,
      value: instanceOf(UserFormModel).isRequired
    };

    static defaultProps = {
      userId: undefined
    };

    componentDidMount() {
      const { userId, users, value, onChange } = this.props;
      let user;

      if (userId) {
        const userValue = users.getValue().find(o => o.id === userId);

        if (userValue) {
          user = value.setValue({ ...userValue, active: !!userValue.active });
        }
      } else {
        user = value.resetValue();
      }

      if (user) {
        onChange(user);
      } else {
        this.handleCancelClick();
      }
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
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', 'left')}>
          <Field
            name="first_name"
            label="First Name"
            input={InputText}
            className={bem.element(this, 'field', 'firstName')}
          />
          <Field
            name="email"
            label="Email"
            input={InputText}
            input-type="email"
            className={bem.element(this, 'field', 'email')}
          />
          <Field
            name="permissions"
            label="Permission"
            input={UserPermissions}
            className={bem.element(this, 'field', 'permission')}
          />
        </div>
      );
    }

    renderRightColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', 'right')}>
          <Field
            name="last_name"
            label="Last Name"
            input={InputText}
            className={bem.element(this, 'field', 'lastName')}
          />
          <Field label="Phone" input={InputText} className={bem.element(this, 'field', 'phone')} />
          <Field label="Active" name="active" input={CheckBox} className={bem.element(this, 'field', 'active')} />
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
            submit-children={value.getField('id').getValue() ? 'Save' : 'Add'}
            submit-onClick={this.handleSubmitClick}
          />
        </div>
      );
    }

    render() {
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
