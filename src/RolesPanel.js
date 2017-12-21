import React from 'react';
import ListPanel from './ListPanel';

function RolesPanel (props) {
  return (
    <ListPanel
      {...props}
      type='roles'
      header={{
        icon: 'wrench',
        text: '役割'
      }}
      statistic={{
        color: props.error ? 'red' : null,
        label: 'コ'
      }}
    />
  );
}

export default RolesPanel;
