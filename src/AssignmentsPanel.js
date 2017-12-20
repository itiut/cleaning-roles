import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import AssignmentsList from './AssignmentsList';

function AssignmentPanel (props) {
  return (
    <React.Fragment>
      <Header as='h2' attached='top'>
        <Icon name='shuffle' />
        <Header.Content>
          割り当て
        </Header.Content>
      </Header>
      <Segment attached textAlign='right'>
        <Button primary size='large' disabled={!props.canAssign} onClick={props.assignHandler}>実行</Button>
      </Segment>
      <AssignmentsList items={props.assignments} />
    </React.Fragment>
  );
}

export default AssignmentPanel;
