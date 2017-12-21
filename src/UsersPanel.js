import React from 'react';
import { Header, Icon, Segment, Statistic } from 'semantic-ui-react';
import TogglableList from './TogglableList';

function UsersPanel (props) {
  return (
    <React.Fragment>
      <Header as='h2' attached='top'>
        <Icon name='user' />
        <Header.Content>
          掃除する人
        </Header.Content>
      </Header>
      <Segment attached textAlign='right'>
        <Statistic horizontal>
          <Statistic.Value>{props.nCheckedUsers}</Statistic.Value>
          <Statistic.Label>人</Statistic.Label>
        </Statistic>
      </Segment>
      <TogglableList items={props.users} handleItemChange={(index, newElem) => props.handleItemChange('users', props.users, index, newElem)} />
    </React.Fragment>
  );
}

export default UsersPanel;
