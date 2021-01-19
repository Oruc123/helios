import React, { Fragment } from 'react';
import { generatePath } from 'react-router';

import { Layer } from 'components/Layer';
import { Link } from 'components/Link';
import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { Sprite } from 'components/Sprite';
import { Table } from 'components/Table';

import { CompanyFilterPanelContainer } from 'modules/companies/filters';

import bem from 'utils/bem';
import { filter, prefixed } from 'utils/props';

import { columns, dataSource } from './data';
import './RelationshipsPage.scss';

export const RelationshipsPagePropTypes = {
  ...PagePropTypes
};

export const RelationshipsPageDefaultProps = {
  ...PageDefaultProps,
  title: 'All Relationships'
};

export class RelationshipsPage extends React.PureComponent {
  static propTypes = { ...RelationshipsPagePropTypes };

  static defaultProps = { ...RelationshipsPageDefaultProps };

  static className = 'RelationshipsPage';

  active = value => (
    <div className={bem.element(this, 'row', 'active')}>
      {value && <Sprite type="check" className={bem.element(this, 'icon', 'check')} />}
    </div>
  );

  action = (_, { id }) => {
    const { paths } = this.props;
    return (
      <div className={bem.element(this, 'row', 'action')}>
        <Link
          to={generatePath(paths.edit, { id })}
          face={Link.FACE_DEFAULT}
          className={bem.element(this, 'rowLink', 'edit')}
        >
          EDIT
        </Link>
        <Link
          to={generatePath(paths.delete, { id })}
          face={Link.FACE_DEFAULT}
          className={bem.element(this, 'rowLink', 'delete')}
        >
          DELETE
        </Link>
      </div>
    );
  };

  renderActions() {
    const { paths, ...props } = this.props;
    const addProps = prefixed(props, 'add');
    return (
      <Fragment>
        <Search className={bem.element(this, 'search')} />
        <Link
          {...addProps}
          to={paths.add}
          button
          rounded
          face={Link.FACE_DEFAULT}
          className={bem.element(this, 'action', 'add', addProps.className)}
        >
          Add New
        </Link>
      </Fragment>
    );
  }

  render() {
    const { value, children } = this.props;
    const data = [...value.getValue().values()];
    return (
      <Page {...filter(this.props, PagePropTypes)} actions={this.renderActions()} className={bem.block(this)}>
        <Layer rounded shadowed>
          <CompanyFilterPanelContainer
            active-input-dataSource={dataSource.statuses}
            customerStatus-input-dataSource={dataSource.customerStatuses}
            entityType-input-dataSource={dataSource.entityTypes}
            businessType-input-dataSource={dataSource.businessTypes}
          />
          <Table
            loading={value.isPending()}
            locale={{ emptyText: data?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.companies({ active: this.active, action: this.action })}
            dataSource={data}
          />
        </Layer>
        {children}
      </Page>
    );
  }
}
