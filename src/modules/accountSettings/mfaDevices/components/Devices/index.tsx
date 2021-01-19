import * as React from 'react';
import { generatePath } from 'react-router';
import { Layer } from 'components/Layer';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { Table } from 'components/Table';
import { CheckBox } from 'components/CheckBox';
import { ListModel } from 'utils/list';
import { mfaDevicesColumns } from './columns';
import { mfaDevicesPaths } from '../../constants';

import * as styles from './styles.module.css';

interface DevicesProps {
  devices: ListModel;
  paths: { [key: string]: string; };
  onSetAsDefault: (id: number) => any;
}

const devices = ({ devices, paths, onSetAsDefault }: DevicesProps) => {
  const items = devices.getValue();

  const cellActions = (_, { id }) => (<Link
    className={styles.deleteLink}
    to={generatePath(paths.delete, { id })}
    face={Link.FACE_DEFAULT}
  >
    DELETE
  </Link>);

  const defaultActions = (_, item) => (<div className={styles.defaultCell}>
    <CheckBox
      rounded
      value={item.default}
      size={CheckBox.SIZE_SMALL}
      face={CheckBox.FACE_ACTIVE}
      onChange={item.default ? () => {} : () => onSetAsDefault(item.id)}
    />
  </div>);

  return (<>
    <div className={styles.header}>
      <h2 className={styles.headerTitle}>MFA devices</h2>
      <Link className={styles.addLink} to={mfaDevicesPaths.add}>
        <Button rounded className={styles.addButton}>ADD NEW</Button>
      </Link>
    </div>
    <Layer rounded shadowed>
      <Table
        loading={devices.isPending()}
        locale={{ emptyText: devices?.length === 0 ? 'No data' : 'No results found' }}
        customColumns={mfaDevicesColumns({ defaultActions, actions: cellActions })}
        dataSource={Array.isArray(items) ? items : []}
      />
    </Layer>
  </>);
};

export {
  devices as Devices,
};
