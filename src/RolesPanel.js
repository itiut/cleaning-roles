import React from 'react';
import { Header, Icon, Segment, Statistic } from 'semantic-ui-react';
import TogglableList from './TogglableList';

function RolesPanel (props) {
  return (
    <React.Fragment>
      <Header as='h2' attached='top'>
        <Icon name='wrench' />
        <Header.Content>
          役割
        </Header.Content>
      </Header>
      <Segment attached textAlign='right'>
        <Statistic horizontal color={(props.nCheckedRoles > props.nCheckedUsers) ? 'red' : 'black'}>
          <Statistic.Value>{props.nCheckedRoles}</Statistic.Value>
          <Statistic.Label>コ</Statistic.Label>
        </Statistic>
      </Segment>
      <TogglableList items={props.roles} toggleHandler={index => props.toggleHandler('roles', props.roles, index)} />
    </React.Fragment>
  );
}

export default RolesPanel;
