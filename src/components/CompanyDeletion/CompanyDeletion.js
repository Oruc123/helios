import React, { PureComponent } from 'react';
import { Confirm } from 'components/Dialog';
import { FormPropTypes } from 'components/Form';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { ListModel } from 'utils/list';
import { filter } from 'utils/props';
import { instanceOf, string } from 'prop-types';
import { CompanyFormModel } from '../CompanyForm/CompanyFormModel';

// eslint-disable-next-line import/prefer-default-export
export class CompanyDeletion extends PureComponent {
  static propTypes = {
    ...FormPropTypes,
    companyId: string,
    companies: instanceOf(ListModel).isRequired,
    value: instanceOf(CompanyFormModel).isRequired
  };

  static defaultProps = {
    companyId: undefined
  };

  static className = 'CompanyDeletion';

  componentDidMount() {
    const { companyId, value, onChange } = this.props;
    let company;

    if (companyId && this.company) {
      company = value.setValue({ ...this.company, active: !!this.company.active, id: +companyId });
    } else {
      company = value.resetValue();
    }

    if (company) {
      onChange(company);
    } else {
      this.handleCancelClick();
    }
  }

  get company() {
    const { companies, companyId } = this.props;
    return companies.getValue().find(o => o.id === +companyId);
  }

  handleCancelClick = () => {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  handleSubmitClick = value => {
    const { onSubmit } = this.props;

    if (typeof onSubmit === 'function') {
      onSubmit(value);
    }
  };

  render() {
    const { companyId, value, ...props } = this.props;
    return (
      <Confirm
        className={bem.block(this)}
        {...filter(props, ElementPropTypes)}
        value={value}
        onClose={this.handleCancelClick}
        onSubmit={this.handleSubmitClick}
        buttons-submit-children="Delete"
      >
        {`Are you sure want to delete ${value.getField('name').getValue()} profile`}
      </Confirm>
    );
  }
}
