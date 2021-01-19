import * as React from 'react';
import { Page } from 'components/Page';
import { CheckMark } from 'components/CheckBox';
import { Icon } from 'components/Icon';
import { ListModel } from 'utils/list';
import { Layer } from 'components/Layer';
import { Table } from 'components/Table';
import { Filter } from './components/Filter';
import { Actions } from './components/Actions';

import * as styles from './styles.module.css';

interface Properties {
  isFilterClear: boolean;
  onFilterClear: () => any;
  isFilterExpanded: boolean;
  onFilterToggle: () => any;
  onFilterChange: (value: any) => any;
  companies: ListModel;
  licenses: ListModel;
  filterValue: any;
}

export const columns = () => [
  {
    title: 'Document Name',
    dataIndex: 'document_name',
    key: 'document_name',
  },
  {
    align: 'center',
    title: 'Internal',
    dataIndex: 'internal',
    key: 'internal ',
    render: internal => (internal ?
      <CheckMark checked rounded size={CheckMark.SIZE_SMALL}/> :
      null),
  },
  {
    align: 'center',
    title: 'Relationship',
    dataIndex: 'company_id',
    key: 'company_id',
  },
  {
    align: 'center',
    title: 'License',
    dataIndex: 'license_id',
    key: 'license_id',
  },
  {
    align: 'center',
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
  },
  {
    align: 'center',
    title: 'Expiration Date',
    dataIndex: 'expiration_date',
    key: 'expiration_date',
  },
  {
    align: 'center',
    title: 'Almost Due',
    dataIndex: 'almost_due',
    key: 'almost_due',
    render: value => (+value ?
      <div className={styles.due}><Icon type="exclamation"/> {value}</div> :
      null),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const DocumentsList = React.memo((properties: Properties) => {
  const {
    isFilterClear,
    isFilterExpanded,
    onFilterClear,
    onFilterChange,
    onFilterToggle,
    companies,
    licenses,
    filterValue,
  } = properties;

  const data = [
    {
      document_name: 'Statement Of Good Standing',
      internal: true,
      company_id: 'Good Meds',
      license_id: 'License Name',
      frequency: 'Annual',
      expiration_date: 'January 1, 2019',
      almost_due: 2,
    },
  ];

  return (<Page title="Documents" actions={<Actions/>}>
    <Layer rounded shadowed>
      <Filter
        isClear={isFilterClear}
        isExpanded={isFilterExpanded}
        onClear={onFilterClear}
        onToggle={onFilterToggle}
        onChange={onFilterChange}
        companies={companies}
        licenses={licenses}
        value={filterValue}
      />
      <Table
        loading={false}
        locale={{ emptyText: data?.length === 0 ? 'No data' : 'No results found' }}
        customColumns={columns}
        dataSource={data}
      />
    </Layer>
  </Page>);
});

export { DocumentsList };
