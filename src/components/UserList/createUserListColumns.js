import { CheckMark } from 'components/CheckBox';
import { DateTime } from 'components/DateTime';
import { Permissions } from 'components/Permissions';
import React from 'react';
import sorters from 'utils/sorters';

const { PERMISSIONS, PERMISSION_ADMIN } = Permissions;

const permissionsMap = new Map([...PERMISSIONS, PERMISSION_ADMIN].reverse().map(item => [item.value, item.label]));

/**
 * @param { UserList } userList
 * @return { function(*): *[] }
 */
function createUserListColumns(userList) {
  return [
    {
      title: 'First Name',
      align: 'center',
      dataIndex: 'first_name',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'first_name')
    },
    {
      title: 'Last Name',
      align: 'center',
      dataIndex: 'last_name',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'last_name')
    },
    {
      title: 'Email',
      align: 'center',
      dataIndex: 'email',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'email')
    },
    {
      title: 'Active',
      align: 'center',
      dataIndex: 'active',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'active'),
      render: active => (active ? <CheckMark checked={active} rounded size={CheckMark.SIZE_SMALL} /> : null)
    },
    {
      title: 'Created',
      align: 'center',
      dataIndex: 'created_at',
      render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />,
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'created_at')
    },
    {
      title: 'Last Login',
      align: 'center',
      dataIndex: 'last_login',
      render: lastLogin => (lastLogin ? <DateTime utc={lastLogin} dateFormat="YYYY/M/D" /> : null),
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'last_login')
    },
    {
      title: 'Permission',
      align: 'center',
      dataIndex: 'permissions',
      render: permissions => permissions?.map(value => permissionsMap.get(value)).join(', '),
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'permissions')
    },
    {
      title: 'Actions',
      align: 'center',
      key: 'actions',
      render: (actions, data) => userList.renderRowActions(data)
    }
  ];
}

export default createUserListColumns;
