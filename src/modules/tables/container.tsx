import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'utils/props';
import { Table, TablePropTypes, TableDefaultProps } from 'components/Table';
import { Layer, LayerPropTypes, LayerDefaultProps } from 'components/Layer';
import { PageSection, PageSectionPropTypes, PageSectionDefaultProps } from 'components/Page';
import { getTableData } from './actions';
import { getTableDataSelector } from './selectors';

interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  sorter?: (a, b) => number;
  sortOrder?: string;
  render?: (value: any, record: any) => React.ReactNode;
}

interface DataSource {
  url: string;
  payload: any;
}

interface Properties {
  columns: (data: any) => TableColumn[];
  storePath: string;
  dataSources: {
    [key: string]: DataSource;
  };
  dataSourceSelector: (data: any) => any[];
  sectionProperties?: ReturnType<PageSectionPropTypes>;
  tableProperties?: ReturnType<TablePropTypes>;
  layerProperties?: ReturnType<LayerPropTypes>;
}

const connectedTable = React.memo((properties: Properties) => {
  const {
    columns,
    storePath,
    dataSources,
    dataSourceSelector,
    sectionProperties,
    tableProperties,
    layerProperties,
  } = properties;
  const dispatch = useDispatch();
  const tableSelector = getTableDataSelector(storePath);
  const { data } = useSelector(tableSelector);
  const composedSectionProperties = { ...PageSectionDefaultProps, ...sectionProperties };
  const composedLayerProperties = { ...LayerDefaultProps, ...layerProperties };
  const composedTableProperties = { ...TableDefaultProps, ...tableProperties };

  React.useEffect(
    () => {
      dispatch(getTableData(storePath, dataSources));
    },
    [storePath, dataSources, columns]);

  return (<PageSection {...(filter(composedSectionProperties, PageSectionPropTypes))}>
    <Layer {...(filter(composedLayerProperties, LayerPropTypes))} rounded shadowed>
      <Table
        {...(filter(composedTableProperties, TablePropTypes))}
        customColumns={columns}
        dataSource={dataSourceSelector(data)}
      />
    </Layer>
  </PageSection>);
});

export { connectedTable as ConnectedTable };
