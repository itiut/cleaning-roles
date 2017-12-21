import React from 'react';
import ListPanel from './ListPanel';

function UsersPanel (props) {
  return (
    <ListPanel
      {...props}
      type='users'
      header={{
        icon: 'user',
        text: '掃除する人'
      }}
      label='さん'
      statistic={{
        label: '人'
      }}
    />
  );
}

export default UsersPanel;
