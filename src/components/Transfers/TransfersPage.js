import React from 'react';
import { Table } from 'components/Table';
import bem from 'utils/bem';
import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Layer } from 'components/Layer';
import { Search } from 'components/Search';
import { TransfersFilterPanelContainer } from 'modules/transfersFilters';
import { getLicenseInfo, addPrefix } from 'utils/common';
import { columns } from './data';

import './TransfersPage.scss';

export const TransfersPagePropTypes = {
  ...PagePropTypes
};

export const TransfersPageDefaultProps = {
  ...PageDefaultProps,
  title: 'Internal Transfers'
};

export class TransfersPage extends React.PureComponent {
  static propTypes = { ...TransfersPagePropTypes };

  static defaultProps = { ...TransfersPageDefaultProps };

  static className = 'TransfersPage';

  renderActions() {
    return <Search className={bem.element(this, 'search')} />;
  }

  render() {
    const { value, companies, licenses } = this.props;
    const data = [...value.getValue().values()];
    return (
      <Page {...this.props} actions={this.renderActions()} className={bem.block(this)}>
        <Layer rounded shadowed className={bem.element(this, 'content')}>
          <TransfersFilterPanelContainer companies={companies} licenses={licenses} />
          <Table
            loading={value.isPending()}
            locale={{ emptyText: data?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.internalTransfers({
              licenseInfo: getLicenseInfo({ licenses, companies }),
              addPrefix: addPrefix('IT')
            })}
            dataSource={data}
          />
        </Layer>
      </Page>
    );
  }
}
