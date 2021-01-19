import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Select } from 'components/Select';
import { func, instanceOf } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';
import { ListModel } from 'utils/list';
import { filter } from 'utils/props';
import { AppSettings } from './AppSettings';
import { AppSettingsModel, AppSettingsFilterModel } from './AppSettingsModel';

import './AppSettingsPage.scss';

const { SECTION_ALL, SECTION_AUDIT, SECTION_DOCUMENTS, SECTION_GENERAL, SECTION_METRC, SECTION_REPORTS } = AppSettings;

const sectionsSource = [
  { label: 'All', value: SECTION_ALL },
  { label: 'General', value: SECTION_GENERAL },
  { label: 'Audit & Exam Settings', value: SECTION_AUDIT },
  { label: 'Documents Settings', value: SECTION_DOCUMENTS },
  { label: 'METRC Settings', value: SECTION_METRC },
  { label: 'Reports Settings', value: SECTION_REPORTS }
];

export const AppSettingsPagePropTypes = {
  ...PagePropTypes,
  value: instanceOf(AppSettingsModel).isRequired,
  companyList: instanceOf(ListModel).isRequired,
  onChange: func.isRequired,
  onRead: func.isRequired,
  onReadAbort: func.isRequired
};

export const AppSettingsPageDefaultProps = {
  ...PageDefaultProps,
  title: 'App Settings'
};

export class AppSettingsPage extends React.PureComponent {
  static propTypes = {
    ...AppSettingsPagePropTypes
  };

  static defaultProps = {
    ...AppSettingsPageDefaultProps
  };

  static className = 'AppSettingsPage';

  state = {
    section: SECTION_ALL
  };

  componentDidMount() {
    const { onRead } = this.props;

    if (typeof onRead === 'function') {
      onRead(new AppSettingsFilterModel());
    }
  }

  componentWillUnmount() {
    const { onReadAbort } = this.props;

    if (typeof onReadAbort === 'function') {
      onReadAbort();
    }
  }

  handleTableChange = section => {
    this.setState({ section });
  };

  renderActions() {
    const { section } = this.state;

    return (
      <Select
        dataSource={sectionsSource}
        placeholder="Select a table"
        dropdownMatchSelectWidth={false}
        value={section}
        onChange={this.handleTableChange}
        className={bem.element(this, 'section')}
      />
    );
  }

  render() {
    const { companyList, value, onChange, onSubmit } = this.props;
    const { section } = this.state;

    return (
      <Page {...filter(this.props, PagePropTypes)} actions={this.renderActions()} className={bem.block(this)}>
        <AppSettings
          companyList={companyList}
          value={value}
          section={section}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Page>
    );
  }
}
