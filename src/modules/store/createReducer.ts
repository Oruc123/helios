import get from 'lodash/get';
import {
  appSettingsId,
  appSettingsListId,
  appSettingsListReducer,
  appSettingsReducer,
} from 'modules/appSettings';
import { AUTH_STATE } from 'modules/auth/constants';
import { authReducer } from 'modules/auth/reducer';
import { FORGOT_STATE } from 'modules/auth/forgot/constants';
import { NEW_PASSWORD_STATE } from 'modules/auth/newPassword/constants';
import { forgotReducer } from 'modules/auth/forgot/reducer';
import { newPasswordFormReducer } from 'modules/auth/newPassword/reducer';
import { LOGIN_STATE } from 'modules/auth/login/constants';
import { loginReducer } from 'modules/auth/login/reducer';
import { CONFIG_STATE } from 'modules/config/config-constants';
import { configReducer } from 'modules/config/config-reducers';
import { MAIN_STATE } from 'modules/main/main-constants';
import { mainReducer } from 'modules/main/main-reducers';
import { accountSettingsReducer, ACCOUNT_SETTINGS_STATE } from 'modules/accountSettings';
import {
  taxReconcilliationFiltersId,
  taxReconcilliationFiltersReducer,
} from 'modules/taxReconcilliationFilters';
import {
  taxReconcilliationListId,
  taxReconcilliationListReducer,
} from 'modules/taxReconcilliationList';
import { reportRetailFiltersId, reportRetailFiltersReducer } from 'modules/reportRetailFilters';
import { reportRetailListId, reportRetailListReducer } from 'modules/reportRetailList';
import {
  reportWholesaleFiltersId,
  reportWholesaleFiltersReducer,
} from 'modules/reportWholesaleFilters';
import { reportWholesaleListId, reportWholesaleListReducer } from 'modules/reportWholesaleList';
import { annualReviewFiltersId, annualReviewFiltersReducer } from 'modules/annualReviewFilters';
import { annualReviewListId, annualReviewListReducer } from 'modules/annualReviewList';
import { documentFileFiltersId, documentFileFiltersReducer } from 'modules/documentFileFilters';
import { documentFileListId, documentFileListReducer } from 'modules/documentFileList';
import { documentsDueFiltersId, documentsDueFiltersReducer } from 'modules/documentsDueFilters';
import { documentsDueListId, documentsDueListReducer } from 'modules/documentsDueList';
import { transfersFiltersId, transfersFiltersReducer } from 'modules/transfersFilters';
import { transfersListId, transfersListReducer } from 'modules/transfersList';
import { internalTransferActionTypeId, internalTransferReducer } from 'modules/internalTransfer';
import {
  internalTransferFormId,
  internalTransferDeletionId,
  internalTransferFormReducer,
  internalTransferDeleteReducer,
} from 'modules/internalTransferForm';
import { companyFiltersId, companyFiltersReducer } from 'modules/companies/filters';
import { companyFormId, companyFormReducer } from 'modules/companies/edit';
import { companyListId, companyListReducer } from 'modules/companies/list';
import { companyDeletionId, companyDeletionReducer } from 'modules/companies/delete';
import { COMPANY_DETAILS_ID, companyDetailsReducer } from 'modules/companies/details';
import { companyInviteId, companyInviteReducer } from 'modules/companies/invite';
import { licenseListId, licenseListReducer } from 'modules/licenses/list';
import { LICENSE_DETAILS_ID, licenseDetailsReducer } from 'modules/licenses/details';
import {
  licenseFormId,
  licenseDeletionId,
  licenseFormReducer,
  licenseDeleteReducer,
} from 'modules/licenses/edit';
import { userFormId, userFormReducer } from 'modules/userForm';
import { userListId, userListReducer } from 'modules/userList';
import { tablesReducer, TABLES_STORE_ID } from 'modules/tables';
import {
  DOCUMENTS_FILTER_ID,
  DOCUMENTS_LIST_ID,
  documentsListReducer,
  documentsFilterReducer,
} from 'modules/documents/list';

const reducersCollection = {
  [ACCOUNT_SETTINGS_STATE]: accountSettingsReducer,
  [CONFIG_STATE]: configReducer,
  [AUTH_STATE]: authReducer,
  [LOGIN_STATE]: loginReducer,
  [FORGOT_STATE]: forgotReducer,
  [NEW_PASSWORD_STATE]: newPasswordFormReducer,
  [MAIN_STATE]: mainReducer,
  [companyFormId]: companyFormReducer,
  [companyFiltersId]: companyFiltersReducer,
  [companyListId]: companyListReducer,
  [companyDeletionId]: companyDeletionReducer,
  [COMPANY_DETAILS_ID]: companyDetailsReducer,
  [companyInviteId]: companyInviteReducer,
  [LICENSE_DETAILS_ID]: licenseDetailsReducer,
  [licenseFormId]: licenseFormReducer,
  [licenseDeletionId]: licenseDeleteReducer,
  [licenseListId]: licenseListReducer,
  [MAIN_STATE]: mainReducer,
  [appSettingsListId]: appSettingsListReducer,
  [appSettingsId]: appSettingsReducer,
  [userFormId]: userFormReducer,
  [userListId]: userListReducer,
  [transfersFiltersId]: transfersFiltersReducer,
  [transfersListId]: transfersListReducer,
  [internalTransferActionTypeId]: internalTransferReducer,
  [internalTransferFormId]: internalTransferFormReducer,
  [internalTransferDeletionId]: internalTransferDeleteReducer,
  [documentsDueFiltersId]: documentsDueFiltersReducer,
  [documentsDueListId]: documentsDueListReducer,
  [documentFileFiltersId]: documentFileFiltersReducer,
  [documentFileListId]: documentFileListReducer,
  [annualReviewFiltersId]: annualReviewFiltersReducer,
  [annualReviewListId]: annualReviewListReducer,
  [reportWholesaleFiltersId]: reportWholesaleFiltersReducer,
  [reportWholesaleListId]: reportWholesaleListReducer,
  [reportRetailFiltersId]: reportRetailFiltersReducer,
  [reportRetailListId]: reportRetailListReducer,
  [taxReconcilliationFiltersId]: taxReconcilliationFiltersReducer,
  [taxReconcilliationListId]: taxReconcilliationListReducer,
  [TABLES_STORE_ID]: tablesReducer,
  [DOCUMENTS_LIST_ID]: documentsListReducer,
  [DOCUMENTS_FILTER_ID]: documentsFilterReducer,
};

export const applicationReducer = (state, action) => {
  if (!action || !action.type) {
    return state;
  }

  return Object.keys(reducersCollection).reduce(
    (accumulatedReducerShape, currentKey) => {
      const pathParts = currentKey.split('.');
      const copy = { ...accumulatedReducerShape };
      let pointer = copy;

      for (let i = 0; i < pathParts.length; i += 1) {
        if (!pointer[pathParts[i]]) {
          pointer[pathParts[i]] = i < pathParts.length - 1 ?
            {} :
            reducersCollection[currentKey](get(state, currentKey), action);
        }
        pointer = pointer[pathParts[i]];
      }

      return copy;
    },
    {});
};
