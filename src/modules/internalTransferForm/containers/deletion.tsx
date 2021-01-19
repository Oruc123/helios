import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { DeleteInternalTransfer } from '../components/DeleteInternalTransfer';
import { internalTransferDeleteActions } from '../actions';
import { internalTransferDeletionSelector, internalTransferFormSelector } from '../selectors';

interface Properties {
  onClose: () => any;
}

const container = (properties: Properties & RouteComponentProps) => {
  const dispatch = useDispatch();
  const managedTransfer = useSelector(internalTransferFormSelector.getEntity);

  React.useEffect(
    () => {
      dispatch(internalTransferDeleteActions.value.set(managedTransfer));
    },
    [managedTransfer]);

  const value = useSelector(internalTransferDeletionSelector.getEntity);

  const onDelete = React.useCallback(
    () => dispatch(internalTransferDeleteActions.delete.call(value)),
    [value]);

  return (<DeleteInternalTransfer
    value={value}
    onDelete={onDelete}
    onClose={properties.onClose}
  />);
};

export {
  container as InternalTransferDeletionContainer,
};
