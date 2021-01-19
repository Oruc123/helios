import React from 'react';
import { string, func } from 'prop-types';
import { Button } from 'components/Button';
import bem from 'utils/bem';
import './Header.scss';

const Header = ({ label, text, onClick, btnText }) => (
  <div className={bem.block(Header)}>
    <div className={bem.element(Header, 'wrapper')}>
      <div className={bem.element(Header, 'label')}>{label}</div>
      <div className={bem.element(Header, 'name')}>{text}</div>
    </div>
    {btnText?.length > 0 && (
      <Button face="primary" type="button" rounded onClick={onClick}>
        {btnText}
      </Button>
    )}
  </div>
);

Header.className = 'Header';
Header.propTypes = {
  label: string,
  text: string,
  onClick: func,
  btnText: string
};
Header.defaultProps = {
  label: '',
  text: '',
  onClick: () => {},
  btnText: ''
};

export default Header;
