import { appSettingsPath } from 'modules/appSettings';
import {
  MAIN_ALERTS_PATH,
  MAIN_DOCUMENTS_DUE_PATH,
  MAIN_INTERNAL_TRANSFERS_PATH,
  MAIN_RELATIONSHIPS_PATH
} from 'modules/main/main-constants';
import { userListPath } from 'modules/userList';
import { DOCUMENTS_PAGE_PATH } from 'modules/documents/list';

export default [
  {
    to: MAIN_RELATIONSHIPS_PATH,
    children: 'Relationships',
    icon: 'group'
  },
  {
    to: MAIN_ALERTS_PATH,
    children: 'Alerts',
    icon: 'bell'
  },
  {
    to: MAIN_DOCUMENTS_DUE_PATH,
    children: 'Documents Due',
    icon: 'clock'
  },
  {
    to: DOCUMENTS_PAGE_PATH,
    children: 'Documents',
    icon: 'clock'
  },
  {
    to: MAIN_INTERNAL_TRANSFERS_PATH,
    children: 'Internal Transfers',
    icon: 'exchange'
  },
  // {
  //   to: MAIN_INTERNAL_TRANSFERS_EXPORT_PATH,
  //   children: 'Internal Transfers Export',
  //   icon: 'export'
  // },
  {
    to: userListPath,
    children: 'Users',
    icon: 'users'
  },
  {
    to: appSettingsPath,
    children: 'App Settings',
    icon: 'settings'
  }
];
