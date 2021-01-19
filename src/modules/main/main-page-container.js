import { DialogRoute, Dialog } from 'components/Dialog';
import { MainMenu, MainPage } from 'components/Main';
import AlertsPage from 'modules/alerts/alerts-page-container';
import { AppSettingsPageContainer, appSettingsPath } from 'modules/appSettings';
import { AccountSettingsPage, ACCOUNT_SETTINGS_PATH } from 'modules/accountSettings';
import DocumentsDuePage from 'modules/documentsDue/documentsDue-page-container';
import { InternalTransferPage } from 'modules/internalTransfer';
import {
  INTERNAL_TRANSFER_EDIT_PATH,
  InternalTransferEditPage,
  InternalTransferDeletionContainer
} from 'modules/internalTransferForm';
import TransfersPage from 'modules/internalTransfers/internalTransfers-page-container';
import { CompanyDetailsPage } from 'modules/companies/details';
import RelationshipsPage from 'modules/relationships/relationships-page-container';
import { UserMenuContainer, UserProviderContainer } from 'modules/user';
import { UserFormContainer } from 'modules/userForm';
import { UserListPageContainer, userListPath, userListPaths } from 'modules/userList';
import { companyListPath, companyListPaths } from 'modules/companies/list';
import { CompanyFormContainer } from 'modules/companies/edit';
import { CompanyDeletionContainer } from 'modules/companies/delete';
import { AddMFADeviceContainer, MFADeviceDeletionContainer, mfaDevicesPaths } from 'modules/accountSettings/mfaDevices';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LICENSE_DETAILS_PATH, CompanyLicenseDetailsPage } from 'modules/licenses/details';
import { manageLicensePath, EditLicensePage, DeleteLicenseContainer } from 'modules/licenses/edit';
import { DOCUMENTS_PAGE_PATH, DocumentsListPage } from 'modules/documents/list';
import { mainToggleBarAction } from './main-actions';
import {
  MAIN_ALERTS_PATH,
  MAIN_DOCUMENTS_DUE_PATH,
  MAIN_INTERNAL_TRANSFERS_PATH,
  MAIN_RELATIONSHIPS_PATH
} from './main-constants';
import { mainBarMinimizedSelector, mainMenuItemsArraySelector } from './main-selectors';

class MainPageContainer extends PureComponent {
  renderMenu() {
    return (
      <Switch>
        <MainMenu {...this.props} />
      </Switch>
    );
  }

  renderUserListPage = routeProps => (
    <UserListPageContainer {...routeProps}>
      <Switch>
        <DialogRoute
          path={userListPaths.add}
          component={UserFormContainer}
          closePath={userListPath}
          dialog-title="Add New User"
        />
        <DialogRoute
          path={userListPaths.edit}
          component={UserFormContainer}
          closePath={userListPath}
          dialog-title="Edit User"
        />
      </Switch>
    </UserListPageContainer>
  );

  renderCompanyListPage = routeProps => (
    <RelationshipsPage {...routeProps}>
      <Switch>
        <DialogRoute
          path={companyListPaths.add}
          component={CompanyFormContainer}
          closePath={companyListPath}
          dialog-title="Add New Company"
        />
        <DialogRoute
          path={companyListPaths.delete}
          component={CompanyDeletionContainer}
          closePath={companyListPath}
          dialog-face={Dialog.FACE_SECONDARY}
        />
      </Switch>
    </RelationshipsPage>
  );

  renderAppSettingsPage = routeProps => <AppSettingsPageContainer {...routeProps} />;

  renderAccountSettings = properties => (
    <AccountSettingsPage {...properties}>
      <Switch>
        <DialogRoute
          path={mfaDevicesPaths.delete}
          component={MFADeviceDeletionContainer}
          closePath={mfaDevicesPaths.index}
          dialog-title="Delete MFA Device"
        />
        <DialogRoute
          path={mfaDevicesPaths.add}
          component={AddMFADeviceContainer}
          closePath={mfaDevicesPaths.index}
          dialog-title="Add New MFA Device"
        />
      </Switch>
    </AccountSettingsPage>
  );

  renderInternalTransferEditPage = properties => {
    const {
      match: {
        params: { id }
      }
    } = properties;

    return (
      <InternalTransferEditPage {...properties}>
        <Switch>
          <DialogRoute
            path={`${INTERNAL_TRANSFER_EDIT_PATH}/:id/delete`}
            component={InternalTransferDeletionContainer}
            closePath={`${INTERNAL_TRANSFER_EDIT_PATH}/${id}`}
            dialog-title="Delete Internal Transfer Page"
          />
        </Switch>
      </InternalTransferEditPage>
    );
  };

  renderInternalTransfers = () => (
    <Switch>
      <Route path={`${INTERNAL_TRANSFER_EDIT_PATH}/:id`} render={this.renderInternalTransferEditPage} />
      <Route path={`${MAIN_INTERNAL_TRANSFERS_PATH}/:id`} component={InternalTransferPage} />
      <Route path={MAIN_INTERNAL_TRANSFERS_PATH} component={TransfersPage} />
    </Switch>
  );

  renderLicenseEditPage = properties => {
    const {
      match: {
        params: { id }
      }
    } = properties;

    return (
      <EditLicensePage {...properties}>
        <Switch>
          <DialogRoute
            path={`${manageLicensePath}/:id/delete`}
            component={DeleteLicenseContainer}
            closePath={`${manageLicensePath}/${id}`}
            dialog-title="Delete License Page"
          />
        </Switch>
      </EditLicensePage>
    );
  };

  render() {
    const userDropdown = <UserMenuContainer />;

    return (
      <UserProviderContainer>
        <MainPage {...this.props} header-children={userDropdown}>
          <Switch>
            <Route path={companyListPaths.detail} component={CompanyDetailsPage} />
            <Route path={companyListPath} render={this.renderCompanyListPage} />
            <Route path={LICENSE_DETAILS_PATH} component={CompanyLicenseDetailsPage} />
            <Route path={`${manageLicensePath}/:id`} component={this.renderLicenseEditPage} />
            <Route path={MAIN_ALERTS_PATH} component={AlertsPage} />
            <Route path={MAIN_DOCUMENTS_DUE_PATH} component={DocumentsDuePage} />
            <Route path={DOCUMENTS_PAGE_PATH} component={DocumentsListPage} />
            <Route path={MAIN_INTERNAL_TRANSFERS_PATH} render={this.renderInternalTransfers} />
            {/* <Route path={MAIN_INTERNAL_TRANSFERS_EXPORT_PATH} /> */}
            <Route path={userListPath} render={this.renderUserListPage} />
            <Route path={appSettingsPath} render={this.renderAppSettingsPage} />
            <Route path={ACCOUNT_SETTINGS_PATH} render={this.renderAccountSettings} />
            <Redirect to={MAIN_RELATIONSHIPS_PATH} />
          </Switch>
        </MainPage>
      </UserProviderContainer>
    );
  }
}

const mapStateToProps = state => ({
  'bar-minimized': mainBarMinimizedSelector(state),
  'menu-items': mainMenuItemsArraySelector(state)
});

const mapDispatchToProps = dispatch => ({
  'bar-onToggle': () => dispatch(mainToggleBarAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPageContainer));
