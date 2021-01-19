import upperFirst from 'lodash/upperFirst';
import { Button, ButtonDefaultProps, ButtonPropTypes } from 'components/Button';
import { Icon } from 'components/Icon';
import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { SPRITE_SPINNER } from 'sprites';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { prefixBy, prefixed } from 'utils/props';
import './FormButtons.scss';

const BUTTON_CANCEL = 'cancel';
const BUTTON_SUBMIT = 'submit';
const BUTTON_CONTINUE = 'continue';

const BtnPropTypes = { ...ButtonPropTypes, pending: bool, isHidden: bool };
const BtnDefaultProps = { ...ButtonDefaultProps, pending: false, isHidden: false };

export const FormButtonsPropTypes = {
  ...ElementPropTypes,
  ...prefixBy(BUTTON_CANCEL, BtnPropTypes),
  ...prefixBy(BUTTON_SUBMIT, BtnPropTypes),
  ...prefixBy(BUTTON_CONTINUE, BtnPropTypes)
};

export const FormButtonsDefaultProps = {
  ...prefixBy(BUTTON_CANCEL, {
    ...BtnDefaultProps,
    face: Button.FACE_SECONDARY,
    children: upperFirst(BUTTON_CANCEL)
  }),
  ...prefixBy(BUTTON_SUBMIT, {
    ...BtnDefaultProps,
    face: Button.FACE_PRIMARY,
    children: upperFirst(BUTTON_SUBMIT)
  }),
  ...prefixBy(BUTTON_CONTINUE, {
    ...BtnDefaultProps,
    face: Button.FACE_PRIMARY,
    children: upperFirst(BUTTON_CONTINUE),
    isHidden: true
  })
};

// eslint-disable-next-line import/prefer-default-export
export class FormButtons extends PureComponent {
  static propTypes = { ...FormButtonsPropTypes };

  static defaultProps = { ...FormButtonsDefaultProps };

  static className = 'FormButtons';

  static BUTTON_CANCEL = BUTTON_CANCEL;

  static BUTTON_SUBMIT = BUTTON_SUBMIT;

  static BUTTON_CONTINUE = BUTTON_CONTINUE;

  renderBtn(type) {
    const { ...props } = this.props;
    const btnProps = prefixed(props, type);
    let { children } = btnProps;

    if (btnProps.pending) {
      children = <Icon type={SPRITE_SPINNER} face={Icon.FACE_DEFAULT} light className={bem.element(this, 'spinner')} />;
    }

    return (
      !btnProps.isHidden && (
        <Button {...btnProps} className={bem.element(this, 'button', type, btnProps.className)}>
          {children}
        </Button>
      )
    );
  }

  render() {
    return (
      <div className={bem.block(this)}>
        {this.renderBtn(FormButtons.BUTTON_CONTINUE)}
        {this.renderBtn(FormButtons.BUTTON_SUBMIT)}
        {this.renderBtn(FormButtons.BUTTON_CANCEL)}
      </div>
    );
  }
}
