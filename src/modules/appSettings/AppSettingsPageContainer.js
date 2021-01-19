import { AppSettingsPage } from 'components/AppSettings';
import { companyListSelectors } from 'modules/companies/list';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { appSettingsActions, appSettingsSelectors } from './appSettings';
import { appSettingsListActions } from './appSettingsList';

const mapStateToProps = state => ({
  value: appSettingsSelectors.getEntity(state),
  companyList: companyListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onChange: appSettingsActions.value.set,
  onRead: appSettingsListActions.read.call,
  onReadAbort: appSettingsListActions.read.abort,
  onSubmit: appSettingsActions.write.call
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsPage);
