import React from 'react';
import { object, string } from 'prop-types';
import { Icon } from 'components/Icon';
import bem from 'utils/bem';
import './Section.scss';

const Section = ({ label, text, text2, icon }) => (
  <div className={bem.block(Section)}>
    {label?.length > 0 && <div className={bem.element(Section, 'label')}>{label}</div>}
    {icon && <Icon {...icon} size={Icon.SIZE_MEDIUM} type="check" className={bem.element(Section, 'icon')} />}
    {text?.length > 0 && <div className={bem.element(Section, 'text')}>{text}</div>}
    {text2?.length > 0 && <div className={bem.element(Section, 'text2')}>{text2}</div>}
  </div>
);

Section.className = 'Section';
Section.propTypes = {
  label: string,
  text: string,
  text2: string,
  icon: object
};
Section.defaultProps = {
  label: '',
  text: '',
  text2: '',
  icon: undefined
};

export default Section;
