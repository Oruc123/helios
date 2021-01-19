import { Icon } from 'components/Icon';
import { Link, LinkDefaultProps, LinkPropTypes } from 'components/Link';
import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import './MainBar.scss';
import { MainBarButton, MainBarButtonDefaultProps, MainBarButtonPropTypes } from './MainBarButton';
import { MainBarLogo, MainBarLogoDefaultProps, MainBarLogoPropTypes } from './MainBarLogo';

export const MainBarPropTypes = {
  ...ElementPropTypes,
  ...prefixBy('header', ElementPropTypes),
  ...prefixBy('button', MainBarButtonPropTypes),
  ...prefixBy('logo', MainBarLogoPropTypes),
  ...prefixBy('help', LinkPropTypes),
  ...prefixBy('content', ElementPropTypes),

  minimized: bool,
  onToggle: func
};

export const MainBarDefaultProps = {
  ...prefixBy('button', MainBarButtonDefaultProps),
  ...prefixBy('logo', MainBarLogoDefaultProps),
  ...prefixBy('help', LinkDefaultProps),
  minimized: false,
  onToggle: null
};

export class MainBar extends PureComponent {
  static propTypes = MainBarPropTypes;

  static defaultProps = MainBarDefaultProps;

  static className = 'MainBar';

  handleButtonClick = () => {
    const { onToggle } = this.props;

    if (typeof onToggle === 'function') {
      onToggle();
    }
  };

  renderButton() {
    const { minimized, ...props } = this.props;
    const { classNames: buttonClassName, ...buttonProps } = prefixed(props, 'button');

    // noinspection RequiredAttributes
    return (
      <MainBarButton
        {...filter(buttonProps, MainBarButtonPropTypes)}
        minimized={minimized}
        className={bem.element(this, 'button', null, buttonClassName)}
        onClick={this.handleButtonClick}
      />
    );
  }

  renderLogo() {
    const { minimized, ...props } = this.props;
    const { classNames: logoClassName, ...logoProps } = prefixed(props, 'logo');

    return (
      <MainBarLogo
        {...filter(logoProps, MainBarLogoPropTypes)}
        className={bem.element(this, 'logo', { minimized }, logoClassName)}
      />
    );
  }

  renderHeader() {
    const { minimized, ...props } = this.props;
    const { classNames: headerClassName, ...headerProps } = prefixed(props, 'header');

    return (
      <div
        {...filter(headerProps, ElementPropTypes)}
        className={bem.element(this, 'header', { minimized }, headerClassName)}
      >
        {this.renderButton()}
        {this.renderLogo()}
      </div>
    );
  }

  renderContent() {
    const { children, minimized, ...props } = this.props;
    const { classNames: contentClassName, ...contentProps } = prefixed(props, 'content');

    return (
      <div
        {...filter(contentProps, ElementPropTypes)}
        className={bem.element(this, 'content', { minimized }, contentClassName)}
      >
        {children}
      </div>
    );
  }

  handleHelpClick = event => {
    const { minimized } = this.props;

    event.preventDefault();

    if (window.zE) {
      window.zE.activate();
      const zEForm = document.getElementById('webWidget');
      zEForm.style.left = `${minimized ? 50 : 225}px`;
    }
  };

  renderHelp() {
    const { minimized, ...props } = this.props;
    const { classNames: helpClassName } = prefixed(props, 'help');

    return (
      <Link
        to="help"
        icon="help"
        icon-face={Icon.FACE_ACTIVE}
        icon-className={bem.element(this, 'helpIcon')}
        className={bem.element(this, 'help', { minimized }, helpClassName)}
        onClick={this.handleHelpClick}
      >
        <span className={bem.element(this, 'helpLabel', { minimized })}>Need help?</span>
      </Link>
    );
  }

  render() {
    const { children, minimized, ...props } = this.props;

    // noinspection RequiredAttributes
    return (
      <div
        {...filter(unprefixed(props, 'header', 'button', 'logo'), ElementPropTypes)}
        className={bem.block(this, { minimized })}
      >
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderHelp()}
      </div>
    );
  }
}
