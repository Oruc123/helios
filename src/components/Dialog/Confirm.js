import { Button } from 'components/Button';
import { FormButtons, FormButtonsDefaultProps, FormButtonsPropTypes } from 'components/Form';
import { func, instanceOf, node } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';
import { FormModel } from 'utils/form';
import { prefixBy, prefixed } from 'utils/props';
import './Confirm.scss';

export const ConfirmPropTypes = {
  ...prefixBy('buttons', FormButtonsPropTypes),
  children: node,
  value: instanceOf(FormModel).isRequired,
  onClose: func,
  onSubmit: func
};

export const ConfirmDefaultProps = {
  ...prefixBy('buttons', FormButtonsDefaultProps),
  children: undefined,
  onClose: undefined,
  onSubmit: undefined
};

export class Confirm extends React.PureComponent {
  static className = 'Confirm';

  static propTypes = {
    ...ConfirmPropTypes
  };

  static defaultProps = {
    ...ConfirmDefaultProps
  };

  handleSubmitClick = () => {
    const { onSubmit, value } = this.props;

    if (typeof onSubmit === 'function') {
      onSubmit(value);
    }
  };

  handleCancelClick = () => {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  renderButtons() {
    const { children, ...props } = this.props;
    const buttonsProps = prefixed(props, 'buttons');

    return (
      <FormButtons
        {...buttonsProps}
        submit-face={Button.FACE_DANGER}
        submit-onClick={this.handleSubmitClick}
        cancel-onClick={this.handleCancelClick}
        className={bem.element(this, 'buttons', null, buttonsProps.className)}
      />
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={bem.block(this)}>
        <div className={bem.element(this, 'message')}>{children}</div>
        {this.renderButtons()}
      </div>
    );
  }
}
