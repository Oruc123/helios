import React from 'react';

import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Layer } from 'components/Layer';
import { Search } from 'components/Search';
import { Table } from 'components/Table';

import { DocumentsDueFilterPanelContainer } from 'modules/documentsDueFilters';

import bem from 'utils/bem';
import { filter } from 'utils/props';
import { getLicenseInfo } from 'utils/common';

import { columns, dataSource } from './data';
import './DocumentsDuePage.scss';

export const DocumentsDuePagePropTypes = {
  ...PagePropTypes
};

export const DocumentsDuePageDefaultProps = {
  ...PageDefaultProps,
  title: 'Documents Due'
};

const all = { label: 'All', value: '' };

export class DocumentsDuePage extends React.PureComponent {
  static propTypes = {
    ...DocumentsDuePagePropTypes
  };

  static defaultProps = {
    ...DocumentsDuePageDefaultProps
  };

  static className = 'DocumentsDuePage';

  render() {
    const { value, companies, licenses } = this.props;
    const data = [...value.getValue().values()];
    const companyList = [...companies.getValue().values()].map(obj => ({ label: obj.name, value: obj.id }));
    const licenseList = [...licenses.getValue().values()].map(obj => ({ label: obj.name, value: obj.id }));
    return (
      <Page {...filter(this.props, PagePropTypes)} actions={<Search />} className={bem.block(this)}>
        <Layer rounded shadowed>
          <DocumentsDueFilterPanelContainer
            customer-input-dataSource={[all, ...companyList]}
            license-input-dataSource={[all, ...licenseList]}
            internal-input-dataSource={dataSource.documentInternal}
            frequency-input-dataSource={dataSource.documentFrequency}
          />
          <Table
            rowKey={o => o.document_id}
            loading={value.isPending()}
            locale={{ emptyText: data?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.documentsDue({
              licenseInfo: getLicenseInfo({ licenses, companies })
            })}
            dataSource={data}
          />
        </Layer>
      </Page>
    );
  }
}
