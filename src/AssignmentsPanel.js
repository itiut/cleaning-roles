import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { CelledPanelHeader, CelledPanelSegment, CelledPanelTable } from './CelledPanel';

function AssignmentsListItem (props) {
  return (
    <Table.Row>
      <Table.Cell>
        {props.user} さん
      </Table.Cell>
      <Table.Cell>
        {props.role}
      </Table.Cell>
    </Table.Row>
  );
}

function AssignmentsList (props) {
  if (props.items.length === 0) {
    return null;
  }

  const listItems = props.items.map((item, index) => (
    <AssignmentsListItem key={item.id} user={item.user} role={item.role} />
  ));
  return (
    <CelledPanelTable attached='bottom' celled>
      {listItems}
    </CelledPanelTable>
  );
}

function AssignmentsPanel (props) {
  return (
    <React.Fragment>
      <CelledPanelHeader content='割り当て' icon='shuffle' />
      <CelledPanelSegment attached={(props.assignments.length === 0) ? 'bottom' : undefined }>
        <Button primary size='large' disabled={!props.canAssign} onClick={props.assignRoles}>実行</Button>
      </CelledPanelSegment>
      <AssignmentsList items={props.assignments} />
    </React.Fragment>
  );
}

export default AssignmentsPanel;
