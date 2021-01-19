import * as React from 'react';
import { isEqual } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { companyListSelectors } from 'modules/companies/list';
import { licenseListSelectors } from 'modules/licenses/list';
import { documentsFilterSelectors } from './selectors';
import { documentsFilterActions } from './actions';
import { DocumentsFilterModel } from './models';
import { DocumentsList } from './components/DocumentsList';

const DocumentsListPage = React.memo(() => {
  const dispatch = useDispatch();
  const [isFilterExpanded, setExpanded] = React.useState(false);
  const companies = useSelector(companyListSelectors.getEntity);
  const licenses = useSelector(licenseListSelectors.getEntity);
  const filterValue = useSelector(documentsFilterSelectors.getEntity);

  const onFilterToggle = React.useCallback(
    () => setExpanded(!isFilterExpanded),
    [isFilterExpanded]);

  const onFilterChange = React.useCallback(
    (filter) => {
      dispatch(documentsFilterActions.value.set(filter));
    },
    []);

  const onFilterClear = React.useCallback(
    () => {
      dispatch(documentsFilterActions.value.set(new DocumentsFilterModel()));
    },
    []);

  return (<DocumentsList
    isFilterClear={isEqual(filterValue, new DocumentsFilterModel())}
    isFilterExpanded={isFilterExpanded}
    onFilterClear={onFilterClear}
    onFilterToggle={onFilterToggle}
    onFilterChange={onFilterChange}
    companies={companies}
    licenses={licenses}
    filterValue={filterValue}
  />);
});

export { DocumentsListPage };
