import { setApiStore } from 'modules/api';
import { appSettingsListSaga, appSettingsSaga } from 'modules/appSettings';
import { accountSettingsSaga } from 'modules/accountSettings';
import { authSaga } from 'modules/auth/sagas';
import { configSaga } from 'modules/config/config-sagas';
import { taxReconcilliationFiltersSaga } from 'modules/taxReconcilliationFilters';
import { taxReconcilliationListSaga } from 'modules/taxReconcilliationList';
import { reportRetailFiltersSaga } from 'modules/reportRetailFilters';
import { reportRetailListSaga } from 'modules/reportRetailList';
import { reportWholesaleFiltersSaga } from 'modules/reportWholesaleFilters';
import { reportWholesaleListSaga } from 'modules/reportWholesaleList';
import { annualReviewFiltersSaga } from 'modules/annualReviewFilters';
import { annualReviewListSaga } from 'modules/annualReviewList';
import { documentFileFiltersSaga } from 'modules/documentFileFilters';
import { documentFileListSaga } from 'modules/documentFileList';
import { documentsDueFiltersSaga } from 'modules/documentsDueFilters';
import { documentsDueListSaga } from 'modules/documentsDueList';
import { transfersFiltersSaga } from 'modules/transfersFilters';
import { transfersListSaga } from 'modules/transfersList';
import { manageInternalTransferSaga } from 'modules/internalTransferForm';
import { internalTransferSaga } from 'modules/internalTransfer';
import { companyListSaga } from 'modules/companies/list';
import { companyFormSaga } from 'modules/companies/edit';
import { companyDeletionSaga } from 'modules/companies/delete';
import { companyDetailsSaga } from 'modules/companies/details';
import { companyInviteSaga } from 'modules/companies/invite';
import { companyFiltersSaga } from 'modules/companies/filters';
import { licenseListSaga } from 'modules/licenses/list';
import { licenseDetailsSaga } from 'modules/licenses/details';
import { manageLicenseSaga } from 'modules/licenses/edit';
import { userFormSaga } from 'modules/userForm';
import { userListSaga } from 'modules/userList';
import { tablesSaga } from 'modules/tables';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { applicationReducer } from './createReducer';

function devTools() {
  // noinspection JSUnresolvedVariable
  return window?.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
    : f => f;
}

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    enhancers.push(devTools());
  }

  const store = createStore(
    applicationReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      ...enhancers
    )
  );

  setApiStore(store);

  sagaMiddleware.run(configSaga);
  sagaMiddleware.run(authSaga);
  sagaMiddleware.run(taxReconcilliationFiltersSaga);
  sagaMiddleware.run(taxReconcilliationListSaga);
  sagaMiddleware.run(reportRetailFiltersSaga);
  sagaMiddleware.run(reportRetailListSaga);
  sagaMiddleware.run(reportWholesaleFiltersSaga);
  sagaMiddleware.run(reportWholesaleListSaga);
  sagaMiddleware.run(annualReviewFiltersSaga);
  sagaMiddleware.run(annualReviewListSaga);
  sagaMiddleware.run(documentFileFiltersSaga);
  sagaMiddleware.run(documentFileListSaga);
  sagaMiddleware.run(documentsDueFiltersSaga);
  sagaMiddleware.run(documentsDueListSaga);
  sagaMiddleware.run(transfersFiltersSaga);
  sagaMiddleware.run(transfersListSaga);
  sagaMiddleware.run(manageInternalTransferSaga);
  sagaMiddleware.run(internalTransferSaga);
  sagaMiddleware.run(companyFiltersSaga);
  sagaMiddleware.run(companyFormSaga);
  sagaMiddleware.run(companyListSaga);
  sagaMiddleware.run(companyDeletionSaga);
  sagaMiddleware.run(companyDetailsSaga);
  sagaMiddleware.run(companyInviteSaga);
  sagaMiddleware.run(licenseListSaga);
  sagaMiddleware.run(licenseDetailsSaga);
  sagaMiddleware.run(manageLicenseSaga);
  sagaMiddleware.run(userListSaga);
  sagaMiddleware.run(userFormSaga);
  sagaMiddleware.run(appSettingsListSaga);
  sagaMiddleware.run(appSettingsSaga);
  sagaMiddleware.run(accountSettingsSaga);
  sagaMiddleware.run(tablesSaga);

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./createReducer', () => store.replaceReducer(applicationReducer));
  }

  return store;
};
